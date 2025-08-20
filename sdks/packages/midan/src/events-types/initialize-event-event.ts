import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

export const InitializeEventEventName = "InitializeEventEvent";

export interface InitializeEventEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,
}