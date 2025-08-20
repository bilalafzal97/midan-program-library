use anchor_lang::prelude::*;

#[event]
pub struct InitializeEventEvent {
    pub timestamp: i64,

    pub creator_key: Pubkey,

    pub authority: Pubkey,
}