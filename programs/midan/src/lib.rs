use anchor_lang::prelude::*;

pub mod meta;

use instructions::*;

mod error;

mod events;
mod instructions;
mod states;

mod utils;

declare_id!("4VmPGCKEvpw4cLPrKTWAXozs5SBinUHWxmiK3cQdUaQ1");

#[program]
pub mod midan {
    use super::*;

    pub fn initialize(
        ctx: Context<InitializeInputAccounts>,
        params: InitializeInputParams,
    ) -> Result<()> {
        handle_initialize(ctx, &params)
    }

    pub fn update_program_status(
        ctx: Context<UpdateProgramStatusInputAccounts>,
        params: UpdateProgramStatusInputParams,
    ) -> Result<()> {
        handle_update_program_status(ctx, &params)
    }

    pub fn initialize_event<'info>(
        ctx: Context<'_, '_, 'info, 'info, InitializeEventInputAccounts<'info>>,
        params: InitializeEventInputParams,
    ) -> Result<()> {
        handle_initialize_event(ctx, &params)
    }

    pub fn update_event<'info>(
        ctx: Context<'_, '_, 'info, 'info, UpdateEventInputAccounts<'info>>,
        params: UpdateEventInputParams,
    ) -> Result<()> {
        handle_update_event(ctx, &params)
    }

    pub fn initialize_event_team<'info>(
        ctx: Context<'_, '_, 'info, 'info, InitializeEventTeamInputAccounts<'info>>,
        params: InitializeEventTeamInputParams,
    ) -> Result<()> {
        handle_initialize_event_team(ctx, &params)
    }

    pub fn update_event_team<'info>(
        ctx: Context<'_, '_, 'info, 'info, UpdateEventTeamInputAccounts<'info>>,
        params: UpdateEventTeamInputParams,
    ) -> Result<()> {
        handle_update_event_team(ctx, &params)
    }

    pub fn initialize_event_team_member<'info>(
        ctx: Context<'_, '_, 'info, 'info, InitializeEventTeamMemberInputAccounts<'info>>,
        params: InitializeEventTeamMemberInputParams,
    ) -> Result<()> {
        handle_initialize_event_team_member(ctx, &params)
    }

    pub fn update_event_team_member<'info>(
        ctx: Context<'_, '_, 'info, 'info, UpdateEventTeamMemberInputAccounts<'info>>,
        params: UpdateEventTeamMemberInputParams,
    ) -> Result<()> {
        handle_update_event_team_member(ctx, &params)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
