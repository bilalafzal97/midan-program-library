import {assert} from "chai";

import {BN, Program} from "@coral-xyz/anchor";

import {Midan} from "../target/types/midan";

import {
    PublicKey,
    Connection,
} from "@solana/web3.js";

import {
    getEventDetailAccountData, getEventDetailAccountPdaAndBump,
    getProgramConfigAccountData,
    getProgramConfigAccountPdaAndBump,
} from "./midan-pda-and-data";

import {EventStatusType, EventTypeType, ProgramStatusType} from "./midan-enum";

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