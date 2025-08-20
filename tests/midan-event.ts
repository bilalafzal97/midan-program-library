import {PublicKey} from "@solana/web3.js";
import {BN} from "@coral-xyz/anchor";
import {EventStatusType, EventTeamMemberStatusType, EventTeamStatusType} from "./midan-enum";

export const InitializeEventEventName = "InitializeEventEvent";

export interface InitializeEventEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,
}

export const UpdateEventEventName = "UpdateEventEvent";

export interface UpdateEventEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    eventStatus: EventStatusType
}

export const InitializeEventTeamEventName = "InitializeEventTeamEvent";

export interface InitializeEventTeamEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    eventTeamIndex: number,
}

export const UpdateEventTeamEventName = "UpdateEventTeamEvent";

export interface UpdateEventTeamEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    eventTeamIndex: number,

    eventTeamStatus: EventTeamStatusType
}

export const InitializeEventTeamMemberEventName = "InitializeEventTeamMemberEvent";

export interface InitializeEventTeamMemberEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    member: PublicKey,

    eventTeamIndex: number,
}

export const UpdateEventTeamMemberEventName = "UpdateEventTeamMemberEvent";

export interface UpdateEventTeamMemberEvent {
    timestamp: BN,

    creatorKey: PublicKey,

    authority: PublicKey,

    member: PublicKey,

    eventTeamIndex: number,

    eventTeamMemberStatus: EventTeamMemberStatusType
}

export const handleInitializeEventEvent = (ev: InitializeEventEvent) =>
    console.log(`${InitializeEventEventName} ==> `, ev);

export const handleUpdateEventEvent = (ev: UpdateEventEvent) =>
    console.log(`${UpdateEventEventName} ==> `, ev);

export const handleInitializeEventTeamEvent = (ev: InitializeEventTeamEvent) =>
    console.log(`${InitializeEventTeamEventName} ==> `, ev);

export const handleUpdateEventTeamEvent = (ev: UpdateEventTeamEvent) =>
    console.log(`${UpdateEventTeamEventName} ==> `, ev);

export const handleInitializeEventTeamMemberEvent = (ev: InitializeEventTeamMemberEvent) =>
    console.log(`${InitializeEventTeamMemberEventName} ==> `, ev);

export const handleUpdateEventTeamMemberEvent = (ev: UpdateEventTeamMemberEvent) =>
    console.log(`${UpdateEventTeamMemberEventName} ==> `, ev);
