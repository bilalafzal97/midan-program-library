use anchor_lang::prelude::*;

use crate::states::{ProgramStatus, ProgramConfigAccount, PROGRAM_CONFIG_ACCOUNT_PREFIX};

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitializeInputParams {}

#[derive(Accounts)]
pub struct InitializeInputAccounts<'info> {
    #[account(mut)]
    pub fee_and_rent_payer: Signer<'info>,

    pub main_signing_authority: Signer<'info>,

    #[account(
        init,
        payer = fee_and_rent_payer,
        space = ProgramConfigAccount::space(),
        seeds = [
        PROGRAM_CONFIG_ACCOUNT_PREFIX.as_ref(),
        ],
        bump,
    )]
    pub program_config: Box<Account<'info, ProgramConfigAccount>>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn handle_initialize(
    ctx: Context<InitializeInputAccounts>,
    _params: &InitializeInputParams,
) -> Result<()> {
    let timestamp = Clock::get().unwrap().unix_timestamp;

    // Set Values
    let program_config: &mut Box<Account<ProgramConfigAccount>> = &mut ctx.accounts.program_config;
    program_config.last_block_timestamp = timestamp;
    program_config.main_signing_authority = ctx.accounts.main_signing_authority.key();
    program_config.program_status = ProgramStatus::Normal;

    Ok(())
}
