use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum EventTeamStatus {
    Normal,
    Halted,
}
