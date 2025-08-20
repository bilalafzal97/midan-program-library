import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {EventTeamStatusType} from "../types/midan-enums";

export const UpdateEventTeamEventName = "UpdateEventTeamEvent";

export interface UpdateEventTeamEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    eventTeamIndex: number,

    eventTeamStatus: EventTeamStatusType
}