use anchor_lang::prelude::*;

use crate::states::{ProgramStatus, ProgramConfigAccount, PROGRAM_CONFIG_ACCOUNT_PREFIX, EVENT_DETAIL_ACCOUNT_PREFIX, EventDetailAccount, EventType, EventStatus};
use crate::utils::{check_is_program_working, check_program_id, check_url, check_value_is_zero, try_get_remaining_account_info};

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitializeEventInputParams {
    url: String,
    
    team_limit: Option<u32>,
    
    member_limit: Option<u32>,

    creator_key: Pubkey,
    
    event_type: EventType,

    code_hash: [u8; 32],
}

#[derive(Accounts)]
#[instruction(params: InitializeEventInputParams)]
pub struct InitializeEventInputAccounts<'info> {
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
    
    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_initialize_event<'info>(
    ctx: Context<'_, '_, 'info, 'info, InitializeEventInputAccounts<'info>>,
    params: &InitializeEventInputParams,
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
    
    if Option::is_some(&params.team_limit) {
      check_value_is_zero( params.team_limit.unwrap() as usize)?;
    };

    if Option::is_some(&params.member_limit) {
        check_value_is_zero( params.member_limit.unwrap() as usize)?;
    };
    
    check_url(params.url.as_str())?;
    
    // Set Values
    let event_detail: &mut Box<Account<EventDetailAccount>> = &mut ctx.accounts.event_detail;
    event_detail.last_block_timestamp = timestamp;
    event_detail.authority = ctx.accounts.authority.key();
    event_detail.creator_key = params.creator_key;
    event_detail.event_type = params.event_type.clone();
    event_detail.event_status = EventStatus::Normal;
    event_detail.event_url = params.url.clone();
    event_detail.code_hash = params.code_hash.clone();
    
    event_detail.team_limit.have_it = Option::is_some(&params.team_limit);
    event_detail.team_limit.value = params.team_limit.unwrap();
    
    event_detail.member_limit.have_it = Option::is_some(&params.member_limit);
    event_detail.member_limit.value = params.member_limit.unwrap();
    
    Ok(())
}