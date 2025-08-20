use crate::states::{EventTeamMemberStatus, EventTeamMemberType};
use anchor_lang::prelude::*;

pub const EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX: &str = "MEMBER";

#[account]
pub struct EventTeamMemberDetailAccount {
    /// timestamp when account updated
    pub last_block_timestamp: i64,

    pub creator_key: Pubkey,

    pub team: Pubkey,

    pub member: Pubkey,

    pub index: u32,

    pub event_team_member_type: EventTeamMemberType,

    pub event_team_member_status: EventTeamMemberStatus,
}

impl EventTeamMemberDetailAccount {
    pub fn space() -> usize {
        8 // default
            + 8 // last_block_timestamp
            + 32 // creator_key
            + 32 // team
            + 32 // member
            + 4 // index
            + 1 // event_team_member_type
            + 1 // event_team_member_status
    }
}
