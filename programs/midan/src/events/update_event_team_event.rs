use anchor_lang::prelude::*;
use crate::states::EventTeamStatus;

#[event]
pub struct UpdateEventTeamEvent {
    pub timestamp: i64,

    pub creator_key: Pubkey,

    pub authority: Pubkey,

    pub event_team_index: u32,
    
    pub event_team_status: EventTeamStatus,
}