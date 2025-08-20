import {assert} from "chai";

import {BN, Program} from "@coral-xyz/anchor";

import {Midan} from "../target/types/midan";

import {
    PublicKey,
    Connection,
} from "@solana/web3.js";

import {
    getEventDetailAccountData,
    getEventDetailAccountPdaAndBump,
    getEventTeamDetailAccountData,
    getEventTeamDetailAccountPdaAndBump, getEventTeamMemberDetailAccountData, getEventTeamMemberDetailAccountPdaAndBump,
    getProgramConfigAccountData,
    getProgramConfigAccountPdaAndBump,
} from "./midan-pda-and-data";

import {
    EventStatusType, EventTeamMemberStatusType,
    EventTeamMemberTypeType,
    EventTeamStatusType,
    EventTeamTypeType,
    EventTypeType,
    ProgramStatusType
} from "./midan-enum";

import {getAssociatedTokenAddress} from "@solana/spl-token";
import {codeHash} from "./midan-helper";

export interface ElectionCandidate {
    url: string,

    totalTokenVote: BN,

    totalVoters: number,

    totalVotes: number,
}

export interface ElectionUserCandidate {
    totalTokenVote: BN,

    totalVotes: number,
}

export async function assertTokenBalance(
    connection: Connection,
    mintAccount: PublicKey,
    owner: PublicKey,
    balance: number,
    message: string,
    tokenProgram: PublicKey,
    associatedToken: PublicKey) {

    const ata = await getAssociatedTokenAddress(
        mintAccount,
        owner,
        true,
        tokenProgram,
        associatedToken
    );

    console.log("ata: ", ata.toBase58());

    const ataBalance = await connection.getTokenAccountBalance(ata);

    console.log(message);
    console.log(ataBalance);

    assert(Number(ataBalance.value.amount) === balance, message);
}


export async function assertProgramConfigAccount(
    program: Program<Midan>,
    mainSigningAuthority: PublicKey,
    programStatus: ProgramStatusType,
) {
    const [programConfigPad] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPad: ", programConfigPad.toBase58());

    const data = await getProgramConfigAccountData(program);

    console.log("Program config account: >>>>>>>> ", data);

    assert(data.lastBlockTimestamp.toNumber() !== 0, "Program config -> lastBlockTimestamp");
    assert(data.mainSigningAuthority.toBase58() === mainSigningAuthority.toBase58(), "Program config -> mainSigningAuthority");
    assert(JSON.stringify(data.programStatus) === JSON.stringify(programStatus), "Program config -> programStatus");
}

export async function assertEventDetailAccount(
    program: Program<Midan>,
    creatorKey: PublicKey,
    authority: PublicKey,
    eventType: EventTypeType,
    eventStatus: EventStatusType,
    eventUrl: string,
    code: string,
    haveTeamLimit: boolean,
    teamLimit: number,
    haveMemberLimit: boolean,
    memberLimit: number,
    totalTeams: number,
    totalMembers: number,
) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const data = await getEventDetailAccountData(program, creatorKey);

    console.log("Event detail account: >>>>>>>> ", data);

    assert(data.lastBlockTimestamp.toNumber() !== 0, "Event detail -> lastBlockTimestamp");
    assert(data.authority.toBase58() === authority.toBase58(), "Event detail -> authority");
    assert(data.creatorKey.toBase58() === creatorKey.toBase58(), "Event detail -> creatorKey");
    assert(JSON.stringify(data.eventType) === JSON.stringify(eventType), "Event detail -> eventType");
    assert(JSON.stringify(data.eventStatus) === JSON.stringify(eventStatus), "Event detail -> eventStatus");
    assert(data.eventUrl === eventUrl, "Event detail -> eventUrl");

    const hash = (Buffer.from(codeHash(code))).toString("hex");
    assert((Buffer.from(new Uint8Array(data.codeHash))).toString("hex") === hash, "Event detail -> codeHash");

    assert(data.teamLimit.haveIt === haveTeamLimit, "Event detail -> haveTeamLimit");
    assert(data.teamLimit.value === teamLimit, "Event detail -> teamLimit");

    assert(data.memberLimit.haveIt === haveMemberLimit, "Event detail -> haveMemberLimit");
    assert(data.memberLimit.value === memberLimit, "Event detail -> memberLimit");

    assert(data.totalTeams === totalTeams, "Event detail -> totalTeams");
    assert(data.totalMembers === totalMembers, "Event detail -> totalMembers");
}

export async function assertEventTeamDetailAccount(
    program: Program<Midan>,
    creatorKey: PublicKey,
    authority: PublicKey,
    teamIndex: number,
    eventTeamType: EventTeamTypeType,
    eventTeamStatus: EventTeamStatusType,
    teamUrl: string,
    code: string,
    haveMemberLimit: boolean,
    memberLimit: number,
    totalMembers: number,
) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const [eventTeamDetailPda] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);
    console.log("eventTeamDetailPda: ", eventTeamDetailPda.toBase58());

    const data = await getEventTeamDetailAccountData(program, creatorKey, teamIndex);

    console.log("Event Team detail account: >>>>>>>> ", data);

    assert(data.lastBlockTimestamp.toNumber() !== 0, "Event Team detail -> lastBlockTimestamp");
    assert(data.authority.toBase58() === authority.toBase58(), "Event Team detail -> authority");
    assert(data.index === teamIndex, "Event Team detail -> index");
    assert(JSON.stringify(data.eventTeamType) === JSON.stringify(eventTeamType), "Event Team detail -> eventTeamType");
    assert(JSON.stringify(data.eventTeamStatus) === JSON.stringify(eventTeamStatus), "Event Team detail -> eventTeamStatus");
    assert(data.teamUrl === teamUrl, "Event Team detail -> teamUrl");

    const hash = (Buffer.from(codeHash(code))).toString("hex");
    assert((Buffer.from(new Uint8Array(data.codeHash))).toString("hex") === hash, "Event Team detail -> codeHash");

    assert(data.memberLimit.haveIt === haveMemberLimit, "Event Team detail -> haveMemberLimit");
    assert(data.memberLimit.value === memberLimit, "Event Team detail -> memberLimit");

    assert(data.totalMembers === totalMembers, "Event Team detail -> totalMembers");
}

export async function assertEventTeamMemberDetailAccount(
    program: Program<Midan>,
    creatorKey: PublicKey,
    teamIndex: number,
    member: PublicKey,
    memberIndex: number,
    eventTeamMemberType: EventTeamMemberTypeType,
    eventTeamMemberStatus: EventTeamMemberStatusType,
) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const [eventTeamDetailPda] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);
    console.log("eventTeamDetailPda: ", eventTeamDetailPda.toBase58());

    const [eventTeamMemberDetailPda] = getEventTeamMemberDetailAccountPdaAndBump(program.programId, eventDetailPda, member);
    console.log("eventTeamMemberDetailPda: ", eventTeamMemberDetailPda.toBase58());

    const data = await getEventTeamMemberDetailAccountData(program, creatorKey, member);

    console.log("Event Team Member detail account: >>>>>>>> ", data);

    assert(data.lastBlockTimestamp.toNumber() !== 0, "Event Team Member detail -> lastBlockTimestamp");
    assert(data.creatorKey.toBase58() === creatorKey.toBase58(), "Event Team Member detail -> creatorKey");
    assert(data.team.toBase58() === eventTeamDetailPda.toBase58(), "Event Team Member detail -> team");
    assert(data.member.toBase58() === member.toBase58(), "Event Team Member detail -> member");
    assert(data.index === memberIndex, "Event Team Member detail -> index");
    assert(JSON.stringify(data.eventTeamMemberType) === JSON.stringify(eventTeamMemberType), "Event Team Member detail -> eventTeamMemberType");
    assert(JSON.stringify(data.eventTeamMemberStatus) === JSON.stringify(eventTeamMemberStatus), "Event Team Member detail -> eventTeamMemberStatus");
}