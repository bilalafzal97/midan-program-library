import {PublicKey} from "@solana/web3.js";

import {Program} from "@coral-xyz/anchor";
import {Midan} from "../target/types/midan";
import {toU32Bytes} from "./midan-helper";

const PROGRAM_CONFIG_ACCOUNT_PREFIX: string = "CONFIG";
const EVENT_DETAIL_ACCOUNT_PREFIX: string = "EVENT";
const EVENT_TEAM_DETAIL_ACCOUNT_PREFIX: string = "TEAM";
const EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX: string = "MEMBER";

export function getProgramConfigAccountPdaAndBump(programAddress: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [Buffer.from(PROGRAM_CONFIG_ACCOUNT_PREFIX)],
        programAddress
    )
}

export function getEventDetailAccountPdaAndBump(programAddress: PublicKey, creatorKey: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from(EVENT_DETAIL_ACCOUNT_PREFIX),
            creatorKey.toBuffer()
        ],
        programAddress
    )
}

export function getEventTeamDetailAccountPdaAndBump(programAddress: PublicKey, eventDetail: PublicKey, teamIndex: number): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from(EVENT_TEAM_DETAIL_ACCOUNT_PREFIX),
            eventDetail.toBuffer(),
            toU32Bytes(teamIndex)
        ],
        programAddress
    )
}

export function getEventTeamMemberDetailAccountPdaAndBump(programAddress: PublicKey, eventDetail: PublicKey, member: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from(EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX),
            eventDetail.toBuffer(),
            member.toBuffer()
        ],
        programAddress
    )
}

export async function getProgramConfigAccountData(program: Program<Midan>,) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);

    return await program.account.programConfigAccount.fetch(programConfigPda);
}

export async function getEventDetailAccountData(program: Program<Midan>, creatorKey: PublicKey) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);

    return await program.account.eventDetailAccount.fetch(eventDetailPda);
}

export async function getEventTeamDetailAccountData(program: Program<Midan>, creatorKey: PublicKey, teamIndex: number) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);

    const [eventTeamDetailPda] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);

    return await program.account.eventTeamDetailAccount.fetch(eventTeamDetailPda);
}

export async function getEventTeamMemberDetailAccountData(program: Program<Midan>, creatorKey: PublicKey, member: PublicKey) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);

    const [eventTeamMemberDetailPda] = getEventTeamMemberDetailAccountPdaAndBump(program.programId, eventDetailPda, member);

    return await program.account.eventTeamMemberDetailAccount.fetch(eventTeamMemberDetailPda);
}




