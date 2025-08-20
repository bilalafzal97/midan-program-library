use crate::events::InitializeEventTeamMemberEvent;
use crate::states::{
    EventDetailAccount, EventTeamDetailAccount, EventTeamMemberDetailAccount,
    EventTeamMemberStatus, EventTeamMemberType, EventTeamType, ProgramConfigAccount,
    EVENT_DETAIL_ACCOUNT_PREFIX, EVENT_TEAM_DETAIL_ACCOUNT_PREFIX,
    EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_code, check_have_code, check_is_event_halted, check_is_event_team_halted,
    check_is_program_working, check_member_limit, check_program_id, try_get_remaining_account_info,
};
use anchor_lang::prelude::*;

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitializeEventTeamMemberInputParams {
    pub creator_key: Pubkey,

    pub event_team_index: u32,

    pub team_code: String,

    // bumps
    pub event_detail_bump: u8,

    pub event_team_detail_bump: u8,
}

#[derive(Accounts)]
#[instruction(params: InitializeEventTeamMemberInputParams)]
pub struct InitializeEventTeamMemberInputAccounts<'info> {
    #[account(mut)]
    pub fee_and_rent_payer: Signer<'info>,

    pub member: Signer<'info>,

    #[account(
        mut,
        seeds = [
        EVENT_DETAIL_ACCOUNT_PREFIX.as_ref(),
        params.creator_key.as_ref(),
        ],
        bump = params.event_detail_bump,
    )]
    pub event_detail: Box<Account<'info, EventDetailAccount>>,

    #[account(
        mut,
        seeds = [
        EVENT_TEAM_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        &params.event_team_index.to_le_bytes()
        ],
        bump = params.event_team_detail_bump,
    )]
    pub event_team_detail: Box<Account<'info, EventTeamDetailAccount>>,

    #[account(
        init,
        payer = fee_and_rent_payer,
        space = EventTeamMemberDetailAccount::space(),
        seeds = [
        EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        member.key().as_ref(),
        ],
        bump,
    )]
    pub event_team_member_detail: Box<Account<'info, EventTeamMemberDetailAccount>>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_initialize_event_team_member<'info>(
    ctx: Context<'_, '_, 'info, 'info, InitializeEventTeamMemberInputAccounts<'info>>,
    params: &InitializeEventTeamMemberInputParams,
) -> Result<()> {
    let timestamp = Clock::get().unwrap().unix_timestamp;

    let program_config_config_account_info: &AccountInfo =
        try_get_remaining_account_info(ctx.remaining_accounts, 0)?;

    let program_config: Account<ProgramConfigAccount> =
        Account::try_from(program_config_config_account_info)?;

    // Checks
    check_program_id(
        program_config_config_account_info.owner.key(),
        ctx.program_id.key(),
    )?;

    check_is_program_working(program_config.program_status.clone())?;

    let event_detail: &Box<Account<EventDetailAccount>> = &ctx.accounts.event_detail;

    check_is_event_halted(event_detail.event_status.clone())?;

    if event_detail.member_limit.have_it {
        check_member_limit(
            event_detail.total_members.checked_add(1).unwrap(),
            event_detail.member_limit.value,
        )?;
    };

    let event_team_detail: &Box<Account<EventTeamDetailAccount>> = &ctx.accounts.event_team_detail;

    check_is_event_team_halted(event_team_detail.event_team_status.clone())?;

    if event_team_detail.member_limit.have_it {
        check_member_limit(
            event_team_detail.total_members.checked_add(1).unwrap(),
            event_team_detail.member_limit.value,
        )?;
    };

    if !event_team_detail.event_team_type.eq(&EventTeamType::Public) {
        check_have_code(params.team_code.as_str())?;
        check_code(params.team_code.as_str(), event_team_detail.code_hash)?;
    };

    // Set Values
    let event_detail: &mut Box<Account<EventDetailAccount>> = &mut ctx.accounts.event_detail;
    event_detail.last_block_timestamp = timestamp;
    event_detail.total_members = event_detail.total_members.checked_add(1).unwrap();

    let event_team_detail: &mut Box<Account<EventTeamDetailAccount>> =
        &mut ctx.accounts.event_team_detail;
    event_team_detail.last_block_timestamp = timestamp;
    event_team_detail.total_members = event_team_detail.total_members.checked_add(1).unwrap();

    let event_team_member_detail: &mut Box<Account<EventTeamMemberDetailAccount>> =
        &mut ctx.accounts.event_team_member_detail;
    event_team_member_detail.last_block_timestamp = timestamp;
    event_team_member_detail.creator_key = params.creator_key;
    event_team_member_detail.member = ctx.accounts.member.key();
    event_team_member_detail.team = ctx.accounts.event_team_detail.key();
    event_team_member_detail.index = event_detail.total_members;
    event_team_member_detail.event_team_member_type = EventTeamMemberType::Normal;
    event_team_member_detail.event_team_member_status = EventTeamMemberStatus::Normal;

    // Event
    let event: InitializeEventTeamMemberEvent = InitializeEventTeamMemberEvent {
        timestamp,
        creator_key: params.creator_key,
        member: ctx.accounts.member.key(),
        event_team_index: event_detail.total_teams,
    };

    emit!(event);

    Ok(())
}
