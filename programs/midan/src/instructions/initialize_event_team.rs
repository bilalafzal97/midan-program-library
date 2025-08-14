use anchor_lang::prelude::*;

use crate::states::{
    EventDetailAccount, EventStatus, EventTeamDetailAccount, EventTeamMemberDetailAccount,
    EventTeamType, EventType, ProgramConfigAccount, ProgramStatus, EVENT_DETAIL_ACCOUNT_PREFIX,
    EVENT_TEAM_DETAIL_ACCOUNT_PREFIX, EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX,
    PROGRAM_CONFIG_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_code, check_have_code, check_is_event_halted, check_is_program_working,
    check_member_limit, check_program_id, check_team_limit, check_url, check_value_is_zero,
    try_get_remaining_account_info,
};

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitializeEventTeamInputParams {
    url: String,

    member_limit: Option<u32>,

    creator_key: Pubkey,

    event_team_type: EventTeamType,

    code_hash: [u8; 32],

    event_code: String,

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
        init,
        payer = fee_and_rent_payer,
        space = EventDetailAccount::space(params.url.len()),
        seeds = [
        EVENT_DETAIL_ACCOUNT_PREFIX.as_ref(),
        params.creator_key.as_ref(),
        ],
        bump,
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

    Ok(())
}
