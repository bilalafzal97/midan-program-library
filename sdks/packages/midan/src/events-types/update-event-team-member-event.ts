import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {EventTeamMemberStatusType} from "../types/midan-enums";

export const UpdateEventTeamMemberEventName = "UpdateEventTeamMemberEvent";

export interface UpdateEventTeamMemberEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    member: PublicKey,

    eventTeamIndex: number,

    eventTeamMemberStatus: EventTeamMemberStatusType
}