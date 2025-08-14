use anchor_lang::prelude::*;

use crate::states::{
    EventDetailAccount, EventStatus, EventType, ProgramConfigAccount, ProgramStatus,
    EVENT_DETAIL_ACCOUNT_PREFIX, PROGRAM_CONFIG_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_authority, check_is_program_working, check_program_id, check_url, check_value_is_zero,
    try_get_remaining_account_info,
};

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateEventInputParams {
    creator_key: Pubkey,

    event_status: EventStatus,

    // bumps
    pub event_detail_bump: u8,
}

#[derive(Accounts)]
#[instruction(params: UpdateEventInputParams)]
pub struct UpdateEventInputAccounts<'info> {
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

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_update_event<'info>(
    ctx: Context<'_, '_, 'info, 'info, UpdateEventInputAccounts<'info>>,
    params: &UpdateEventInputParams,
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

    check_authority(
        vec![event_detail.authority],
        ctx.accounts.authority.key(),
    )?;

    // Set Values
    let event_detail: &mut Box<Account<EventDetailAccount>> = &mut ctx.accounts.event_detail;
    event_detail.last_block_timestamp = timestamp;
    event_detail.event_status = params.event_status.clone();

    Ok(())
}
