use crate::states::{EventTeamStatus, EventTeamType, HaveLimitValue};
use anchor_lang::prelude::*;

pub const EVENT_TEAM_DETAIL_ACCOUNT_PREFIX: &str = "TEAM";

#[account]
pub struct EventTeamDetailAccount {
    /// timestamp when account updated
    pub last_block_timestamp: i64,

    pub authority: Pubkey,

    pub creator_key: Pubkey,

    pub index: u32,

    pub event_team_type: EventTeamType,

    pub event_team_status: EventTeamStatus,

    pub member_limit: HaveLimitValue,

    pub total_members: u32,

    pub team_url: String,

    pub code_hash: [u8; 32],
}

impl EventTeamDetailAccount {
    pub fn space(team_url_len: usize) -> usize {
        8 // default
            + 8 // last_block_timestamp
            + 32 // authority
            + 32 // creator_key
            + 4 // index
            + 1 // event_team_type
            + 1 // event_team_status
            + HaveLimitValue::space() // member_limit
            + 4 // total_members
            + (4 + team_url_len) // team_url
            + 32 // code_hash
    }
}
