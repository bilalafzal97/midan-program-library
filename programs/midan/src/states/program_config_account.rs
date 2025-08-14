use anchor_lang::prelude::*;
use crate::states::ProgramStatus;

pub const PROGRAM_CONFIG_ACCOUNT_PREFIX: &str = "CONFIG";

#[account]
pub struct ProgramConfigAccount {
    /// timestamp when account updated
    pub last_block_timestamp: i64,

    /// program main signing authority
    pub main_signing_authority: Pubkey,

    pub program_status: ProgramStatus,
}

impl ProgramConfigAccount {
    pub fn space() -> usize {
        8 // default
            + 8 // last_block_timestamp
            + 32 // main_signing_authority
            + 1 // program_status
    }
}
