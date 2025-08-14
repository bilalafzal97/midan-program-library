use anchor_lang::prelude::*;
use crate::states::{EventType, EventStatus, HaveLimitValue};

pub const EVENT_DETAIL_ACCOUNT_PREFIX: &str = "EVENT";

#[account]
pub struct EventDetailAccount {
    /// timestamp when account updated
    pub last_block_timestamp: i64,

    pub authority: Pubkey,
    
    pub creator_key: Pubkey,
    
    pub event_type: EventType,
    
    pub event_status: EventStatus,
    
    pub team_limit: HaveLimitValue,
    
    pub member_limit: HaveLimitValue,
    
    pub total_teams: u32,
    
    pub total_members: u32,
    
    pub event_url: String,

    pub code_hash: [u8; 32]
}

impl EventDetailAccount {
    pub fn space(event_url_len: usize) -> usize {
        8 // default
            + 8 // last_block_timestamp
            + 32 // authority
            + 32 // creator_key
            + 1 // event_type
            + 1 // event_status
            + HaveLimitValue::space() // team_limit
            + HaveLimitValue::space() // member_limit
            + 4 // total_teams
            + 4 // total_members
            + (4 + event_url_len) // event_url
            + 32 // code_hash
    }
}
