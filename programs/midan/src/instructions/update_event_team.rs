use crate::events::UpdateEventTeamEvent;
use crate::states::{
    EventDetailAccount, EventTeamDetailAccount, EventTeamStatus, ProgramConfigAccount,
    EVENT_DETAIL_ACCOUNT_PREFIX, EVENT_TEAM_DETAIL_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_authority, check_is_program_working, check_program_id, try_get_remaining_account_info,
};
use anchor_lang::prelude::*;

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateEventTeamInputParams {
    pub creator_key: Pubkey,

    pub event_team_status: EventTeamStatus,

    pub code_hash: [u8; 32],

    pub event_team_index: u32,

    // bumps
    pub event_detail_bump: u8,

    pub event_team_detail_bump: u8,
}

#[derive(Accounts)]
#[instruction(params: UpdateEventTeamInputParams)]
pub struct UpdateEventTeamInputAccounts<'info> {
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
        mut,
        seeds = [
        EVENT_TEAM_DETAIL_ACCOUNT_PREFIX.as_ref(),
        event_detail.key().as_ref(),
        &params.event_team_index.to_le_bytes()
        ],
        bump = params.event_team_detail_bump,
    )]
    pub event_team_detail: Box<Account<'info, EventTeamDetailAccount>>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_update_event_team<'info>(
    ctx: Context<'_, '_, 'info, 'info, UpdateEventTeamInputAccounts<'info>>,
    params: &UpdateEventTeamInputParams,
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

    check_authority(
        vec![
            event_detail.authority,
            program_config.main_signing_authority,
            event_team_detail.authority,
        ],
        ctx.accounts.authority.key(),
    )?;

    // Set Values
    let event_team_detail: &mut Box<Account<EventTeamDetailAccount>> =
        &mut ctx.accounts.event_team_detail;
    event_team_detail.last_block_timestamp = timestamp;
    event_team_detail.event_team_status = params.event_team_status.clone();
    event_team_detail.code_hash = params.code_hash.clone();

    // Event
    let event: UpdateEventTeamEvent = UpdateEventTeamEvent {
        timestamp,
        creator_key: params.creator_key,
        authority: ctx.accounts.authority.key(),
        event_team_index: params.event_team_index,
        event_team_status: params.event_team_status.clone(),
    };

    emit!(event);

    Ok(())
}
