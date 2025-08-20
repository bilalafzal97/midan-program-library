use crate::error::MidanError;
use crate::states::{EventStatus, EventTeamStatus, EventTeamType, EventType, ProgramStatus};
use anchor_lang::prelude::*;
use anchor_lang::solana_program::keccak;

pub fn check_main_signing_authority(
    main_signing_authority_from_account: Pubkey,
    main_signing_authority_from_input_accounts: Pubkey,
) -> Result<()> {
    if main_signing_authority_from_account != main_signing_authority_from_input_accounts {
        return Err(MidanError::InvalidMainSigningAuthority.into());
    }

    Ok(())
}

pub fn check_authority(
    authority_from_accounts: Vec<Pubkey>,
    authority_from_input_account: Pubkey,
) -> Result<()> {
    let mut have_authority = false;

    for authority_from_account in authority_from_accounts {
        if authority_from_input_account == authority_from_account {
            have_authority = true;
            break;
        };
    }

    if !have_authority {
        return Err(MidanError::InvalidAuthority.into());
    }

    Ok(())
}

pub fn check_value_is_zero(value: usize) -> Result<()> {
    if value <= 0 {
        return Err(MidanError::ValueIsZero.into());
    }

    Ok(())
}

pub fn check_is_program_working(value: ProgramStatus) -> Result<()> {
    if value.eq(&ProgramStatus::Halted) {
        return Err(MidanError::ProgramHalted.into());
    }

    Ok(())
}

pub fn check_program_id(from_account: Pubkey, from_context: Pubkey) -> Result<()> {
    if from_account != from_context {
        return Err(MidanError::InvalidProgram.into());
    }

    Ok(())
}

pub fn try_get_remaining_account_info<T>(remaining_accounts: &[T], index: usize) -> Result<&T> {
    if index < remaining_accounts.len() {
        Ok(&remaining_accounts[index])
    } else {
        Err(MidanError::MissingAccount.into())
    }
}

pub fn check_url(value: &str) -> Result<()> {
    if value.is_empty() {
        return Err(MidanError::InvalidUrl.into());
    }

    Ok(())
}

pub fn check_code(code: &str, from_account_hash: [u8; 32]) -> Result<()> {
    let code_hash = get_code_hash(code)?;

    if code_hash != from_account_hash {
        return Err(MidanError::InvalidCode.into());
    }

    Ok(())
}

pub fn check_have_code(value: &str) -> Result<()> {
    if value.is_empty() {
        return Err(MidanError::MissingCode.into());
    }

    Ok(())
}

pub fn get_code_hash(code: &str) -> Result<[u8; 32]> {
    let msg_hash = keccak::hash(code.as_bytes()).0;

    Ok(msg_hash)
}

pub fn check_is_event_halted(value: EventStatus) -> Result<()> {
    if value.eq(&EventStatus::Halted) {
        return Err(MidanError::EventHalted.into());
    }

    Ok(())
}

pub fn check_is_event_team_halted(value: EventTeamStatus) -> Result<()> {
    if value.eq(&EventTeamStatus::Halted) {
        return Err(MidanError::EventTeamHalted.into());
    }

    Ok(())
}

pub fn check_team_limit(total_teams: u32, from_account: u32) -> Result<()> {
    
    
    if total_teams > from_account {
        return Err(MidanError::ExceededTeamLimit.into());
    }

    Ok(())
}

pub fn check_member_limit(total_members: u32, from_account: u32) -> Result<()> {


    if total_members > from_account {
        return Err(MidanError::ExceededMemberLimit.into());
    }

    Ok(())
}

pub fn check_is_only_private_team(event_type: EventType, event_team_type: EventTeamType) -> Result<()> {


    if event_type.eq(&EventType::PrivateWithTeam) && event_team_type.eq(&EventTeamType::Public) {
        return Err(MidanError::OnlyPrivateTeam.into());
    }

    Ok(())
}

pub fn check_team(from_account: Pubkey, from_context: Pubkey) -> Result<()> {
    if from_account != from_context {
        return Err(MidanError::InvalidTeam.into());
    }

    Ok(())
}
