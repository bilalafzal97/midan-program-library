use anchor_lang::prelude::*;

#[event]
pub struct InitializeEventTeamEvent {
    pub timestamp: i64,

    pub creator_key: Pubkey,

    pub authority: Pubkey,
    
    pub event_team_index: u32,
}