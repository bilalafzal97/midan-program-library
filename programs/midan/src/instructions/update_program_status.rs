use anchor_lang::prelude::*;

use crate::states::{ProgramStatus, ProgramConfigAccount, PROGRAM_CONFIG_ACCOUNT_PREFIX};
use crate::utils::check_main_signing_authority;

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateProgramStatusInputParams {
    pub program_status: ProgramStatus,

    // Bump
    pub program_config_bump: u8,
}

#[derive(Accounts)]
#[instruction(params: UpdateProgramStatusInputParams)]
pub struct UpdateProgramStatusInputAccounts<'info> {
    pub main_signing_authority: Signer<'info>,

    #[account(
        mut,
        seeds = [
        PROGRAM_CONFIG_ACCOUNT_PREFIX.as_ref(),
        ],
        bump = params.program_config_bump,
    )]
    pub program_config: Box<Account<'info, ProgramConfigAccount>>,
}

pub fn handle_update_program_status(
    ctx: Context<UpdateProgramStatusInputAccounts>,
    params: &UpdateProgramStatusInputParams,
) -> Result<()> {
    let timestamp = Clock::get().unwrap().unix_timestamp;

    let program_config: &Box<Account<ProgramConfigAccount>> = &ctx.accounts.program_config;

    // Checks
    check_main_signing_authority(
        program_config.main_signing_authority,
        ctx.accounts.main_signing_authority.key(),
    )?;

    // Set Values
    let program_config: &mut Box<Account<ProgramConfigAccount>> = &mut ctx.accounts.program_config;
    program_config.last_block_timestamp = timestamp;
    program_config.program_status = params.program_status.clone();

    Ok(())
}
