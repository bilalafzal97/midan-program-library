use anchor_lang::prelude::*;
use crate::events::InitializeEventTeamEvent;
use crate::states::{
    EventDetailAccount, EventTeamDetailAccount, EventTeamMemberDetailAccount,
    EventTeamMemberStatus, EventTeamMemberType, EventTeamStatus, EventTeamType, EventType,
    ProgramConfigAccount, EVENT_DETAIL_ACCOUNT_PREFIX, EVENT_TEAM_DETAIL_ACCOUNT_PREFIX,
    EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_code, check_have_code, check_is_event_halted, check_is_only_private_team,
    check_is_program_working, check_member_limit, check_program_id, check_team_limit, check_url,
    check_value_is_zero, try_get_remaining_account_info,
};

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitializeEventTeamInputParams {
    pub url: String,

    pub member_limit: Option<u32>,

    pub creator_key: Pubkey,

    pub event_team_type: EventTeamType,

    pub code_hash: [u8; 32],

    pub event_code: String,

    // bumps
    pub event_detail_bump: u8,
}

#[derive(Accounts)]
#[instruction(params: InitializeEventTeamInputParams)]
pub struct InitializeEventTeamInputAccounts<'info> {
    #[account(mut)]
    pub fee_and_rent_payer: Signer<'info>,

    pub authority: Signer<'info>,

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
        init,
        payer = fee_and_rent_payer,
        space = EventTeamDetailAccount::space(params.url.len()),
        seeds = [
        EVENT_TEAM_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        &event_detail.total_teams.checked_add(1).unwrap().to_le_bytes()
        ],
        bump,
    )]
    pub event_team_detail: Box<Account<'info, EventTeamDetailAccount>>,

    #[account(
        init,
        payer = fee_and_rent_payer,
        space = EventTeamMemberDetailAccount::space(),
        seeds = [
        EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        authority.key().as_ref(),
        ],
        bump,
    )]
    pub event_team_member_detail: Box<Account<'info, EventTeamMemberDetailAccount>>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_initialize_event_team<'info>(
    ctx: Context<'_, '_, 'info, 'info, InitializeEventTeamInputAccounts<'info>>,
    params: &InitializeEventTeamInputParams,
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

    if Option::is_some(&params.member_limit) {
        check_value_is_zero(params.member_limit.unwrap() as usize)?;
    };

    check_url(params.url.as_str())?;

    let event_detail: &Box<Account<EventDetailAccount>> = &ctx.accounts.event_detail;

    check_is_event_halted(event_detail.event_status.clone())?;

    if event_detail.team_limit.have_it {
        check_team_limit(
            event_detail.total_teams.checked_add(1).unwrap(),
            event_detail.team_limit.value,
        )?;
    };

    if event_detail.member_limit.have_it {
        check_member_limit(
            event_detail.total_members.checked_add(1).unwrap(),
            event_detail.member_limit.value,
        )?;
    };

    check_is_only_private_team(
        event_detail.event_type.clone(),
        params.event_team_type.clone(),
    )?;

    if !event_detail.event_type.eq(&EventType::Public) {
        check_have_code(params.event_code.as_str())?;
        check_code(params.event_code.as_str(), event_detail.code_hash)?;
    };

    // Set Values
    let event_detail: &mut Box<Account<EventDetailAccount>> = &mut ctx.accounts.event_detail;
    event_detail.last_block_timestamp = timestamp;
    event_detail.total_teams = event_detail.total_teams.checked_add(1).unwrap();
    event_detail.total_members = event_detail.total_members.checked_add(1).unwrap();

    let event_team_detail: &mut Box<Account<EventTeamDetailAccount>> =
        &mut ctx.accounts.event_team_detail;
    event_team_detail.last_block_timestamp = timestamp;
    event_team_detail.authority = ctx.accounts.authority.key();
    event_team_detail.creator_key = params.creator_key;
    event_team_detail.index = event_detail.total_teams;
    event_team_detail.team_url = params.url.clone();
    event_team_detail.event_team_type = params.event_team_type.clone();
    event_team_detail.event_team_status = EventTeamStatus::Normal;
    event_team_detail.total_members = 1;
    event_team_detail.code_hash = params.code_hash.clone();

    event_team_detail.member_limit.have_it = Option::is_some(&params.member_limit);

    if event_team_detail.member_limit.have_it {
        event_team_detail.member_limit.value = params.member_limit.unwrap();
    };

    let event_team_member_detail: &mut Box<Account<EventTeamMemberDetailAccount>> =
        &mut ctx.accounts.event_team_member_detail;
    event_team_member_detail.last_block_timestamp = timestamp;
    event_team_member_detail.creator_key = params.creator_key;
    event_team_member_detail.member = ctx.accounts.authority.key();
    event_team_member_detail.team = ctx.accounts.event_team_detail.key();
    event_team_member_detail.index = event_detail.total_members;
    event_team_member_detail.event_team_member_type = EventTeamMemberType::Admin;
    event_team_member_detail.event_team_member_status = EventTeamMemberStatus::Normal;

    // Event
    let event: InitializeEventTeamEvent = InitializeEventTeamEvent {
        timestamp,
        creator_key: params.creator_key,
        authority: ctx.accounts.authority.key(),
        event_team_index: event_detail.total_teams
    };

    emit!(event);
    
    Ok(())
}
