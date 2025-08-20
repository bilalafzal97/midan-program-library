import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

export const InitializeEventTeamMemberEventName = "InitializeEventTeamMemberEvent";

export interface InitializeEventTeamMemberEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    member: PublicKey,

    eventTeamIndex: number,
}