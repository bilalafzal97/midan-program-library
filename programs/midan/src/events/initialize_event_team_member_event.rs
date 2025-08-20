use anchor_lang::prelude::*;

#[event]
pub struct InitializeEventTeamMemberEvent {
    pub timestamp: i64,

    pub creator_key: Pubkey,

    pub member: Pubkey,

    pub event_team_index: u32,
}