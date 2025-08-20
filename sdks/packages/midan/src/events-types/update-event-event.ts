import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {EventStatusType} from "../types/midan-enums";

export const UpdateEventEventName = "UpdateEventEvent";

export interface UpdateEventEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    eventStatus: EventStatusType
}