use anchor_lang::prelude::*;
use crate::events::UpdateEventEvent;
use crate::states::{
    EventDetailAccount, EventStatus, ProgramConfigAccount, EVENT_DETAIL_ACCOUNT_PREFIX,
};
use crate::utils::{
    check_authority, check_is_program_working, check_program_id, try_get_remaining_account_info,
};

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateEventInputParams {
    pub creator_key: Pubkey,

    pub event_status: EventStatus,

    pub code_hash: [u8; 32],

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
        vec![
            event_detail.authority,
            program_config.main_signing_authority,
        ],
        ctx.accounts.authority.key(),
    )?;

    // Set Values
    let event_detail: &mut Box<Account<EventDetailAccount>> = &mut ctx.accounts.event_detail;
    event_detail.last_block_timestamp = timestamp;
    event_detail.event_status = params.event_status.clone();
    event_detail.code_hash = params.code_hash.clone();

    // Event
    let event: UpdateEventEvent = UpdateEventEvent {
        timestamp,
        creator_key: params.creator_key,
        authority: ctx.accounts.authority.key(),
        event_status: params.event_status.clone(),
    };

    emit!(event);
    
    Ok(())
}
