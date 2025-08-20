use crate::states::{
    EventDetailAccount, EventTeamDetailAccount, EventTeamMemberDetailAccount,
    EventTeamMemberStatus, ProgramConfigAccount, EVENT_DETAIL_ACCOUNT_PREFIX,
    EVENT_TEAM_DETAIL_ACCOUNT_PREFIX, EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_authority, check_is_program_working, check_program_id, check_team,
    try_get_remaining_account_info,
};
use anchor_lang::prelude::*;
use crate::events::UpdateEventTeamMemberEvent;

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateEventTeamMemberInputParams {
    pub creator_key: Pubkey,

    pub member: Pubkey,

    pub event_team_member_status: EventTeamMemberStatus,

    pub event_team_index: u32,

    // bumps
    pub event_detail_bump: u8,

    pub event_team_detail_bump: u8,

    pub event_team_member_detail_bump: u8,
}

#[derive(Accounts)]
#[instruction(params: UpdateEventTeamMemberInputParams)]
pub struct UpdateEventTeamMemberInputAccounts<'info> {
    #[account(mut)]
    pub fee_and_rent_payer: Signer<'info>,

    pub authority: Signer<'info>,

    #[account(
        seeds = [
        EVENT_DETAIL_ACCOUNT_PREFIX.as_ref(),
        params.creator_key.as_ref(),
        ],
        bump = params.event_detail_bump,
    )]
    pub event_detail: Box<Account<'info, EventDetailAccount>>,

    #[account(
        seeds = [
        EVENT_TEAM_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        &params.event_team_index.to_le_bytes()
        ],
        bump = params.event_team_detail_bump,
    )]
    pub event_team_detail: Box<Account<'info, EventTeamDetailAccount>>,

    #[account(
        mut,
        seeds = [
        EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        params.member.as_ref(),
        ],
        bump = params.event_team_member_detail_bump,
    )]
    pub event_team_member_detail: Box<Account<'info, EventTeamMemberDetailAccount>>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_update_event_team_member<'info>(
    ctx: Context<'_, '_, 'info, 'info, UpdateEventTeamMemberInputAccounts<'info>>,
    params: &UpdateEventTeamMemberInputParams,
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
    let event_team_detail: &Box<Account<EventTeamDetailAccount>> = &ctx.accounts.event_team_detail;
    let event_team_member_detail: &Box<Account<EventTeamMemberDetailAccount>> =
        &ctx.accounts.event_team_member_detail;

    check_authority(
        vec![
            event_detail.authority,
            program_config.main_signing_authority,
            event_team_detail.authority,
        ],
        ctx.accounts.authority.key(),
    )?;

    check_team(
        event_team_member_detail.team,
        ctx.accounts.event_team_detail.key(),
    )?;

    // Set Values
    let event_team_member_detail: &mut Box<Account<EventTeamMemberDetailAccount>> =
        &mut ctx.accounts.event_team_member_detail;
    event_team_member_detail.last_block_timestamp = timestamp;
    event_team_member_detail.event_team_member_status = params.event_team_member_status.clone();

    // Event
    let event: UpdateEventTeamMemberEvent = UpdateEventTeamMemberEvent {
        timestamp,
        creator_key: params.creator_key,
        member: params.member,
        authority: ctx.accounts.authority.key(),
        event_team_index: event_detail.total_teams,
        event_team_member_status: params.event_team_member_status.clone(),
    };

    emit!(event);
    
    Ok(())
}
