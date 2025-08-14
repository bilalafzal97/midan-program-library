use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum EventType {
    Public,
    Private,
    PrivateWithTeam
}
