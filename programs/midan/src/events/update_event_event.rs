use anchor_lang::prelude::*;
use crate::states::EventStatus;

#[event]
pub struct UpdateEventEvent {
    pub timestamp: i64,

    pub creator_key: Pubkey,

    pub authority: Pubkey,

    pub event_status: EventStatus,
}