import {PublicKey} from '@solana/web3.js';
import {BN} from '@coral-xyz/anchor';

export const InitializeEventTeamEventName = "InitializeEventTeamEvent";

export interface InitializeEventTeamEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    eventTeamIndex: number,
}