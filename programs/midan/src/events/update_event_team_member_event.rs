use anchor_lang::prelude::*;
use crate::states::EventTeamMemberStatus;

#[event]
pub struct UpdateEventTeamMemberEvent {
    pub timestamp: i64,

    pub creator_key: Pubkey,

    pub authority: Pubkey,
    
    pub member: Pubkey,

    pub event_team_index: u32,
    
    pub event_team_member_status: EventTeamMemberStatus,
}