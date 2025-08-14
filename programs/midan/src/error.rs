use anchor_lang::prelude::*;

#[error_code]
pub enum MidanError {
    #[msg("Invalid main signing authority")]
    InvalidMainSigningAuthority,
    
    #[msg("Invalid authority")]
    InvalidAuthority,

    #[msg("Value is zero")]
    ValueIsZero,

    #[msg("Program halted")]
    ProgramHalted,

    #[msg("Invalid program")]
    InvalidProgram,

    #[msg("Missing account")]
    MissingAccount,
    
    #[msg("Invalid url")]
    InvalidUrl,

    #[msg("Invalid code")]
    InvalidCode,

    #[msg("missing code")]
    MissingCode,

    #[msg("Event halted")]
    EventHalted,

    #[msg("Event team halted")]
    EventTeamHalted,

    #[msg("Exceed team limit")]
    ExceededTeamLimit,

    #[msg("Exceed member limit")]
    ExceededMemberLimit,

    #[msg("Only private team")]
    OnlyPrivateTeam,
}
