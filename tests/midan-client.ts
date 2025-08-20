import {BN, Program} from "@coral-xyz/anchor";
import {Midan} from "../target/types/midan";

import {
    Keypair,
    PublicKey,
} from "@solana/web3.js";
import {
    getEventDetailAccountPdaAndBump, getEventTeamDetailAccountPdaAndBump, getEventTeamMemberDetailAccountPdaAndBump,
    getProgramConfigAccountPdaAndBump
} from "./midan-pda-and-data";
import {
    EventStatusType, EventTeamMemberStatusType, EventTeamStatusType,
    EventTeamTypeType,
    EventTypeType,
    ProgramStatusType
} from "./midan-enum";
import {codeHash} from "./midan-helper";

export async function initializeTx(
    program: Program<Midan>,
    feePayer: PublicKey,
    mainSigningAuthority: PublicKey,
    systemProgram: PublicKey,
    rent: PublicKey,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const tx = await program.methods.initialize({})
        .accounts({
            feeAndRentPayer: feePayer,
            mainSigningAuthority: mainSigningAuthority,
            programConfig: programConfigPda,
            systemProgram: systemProgram,
            rent: rent
        })
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function updateProgramStatusTx(
    program: Program<Midan>,
    mainSigningAuthority: PublicKey,
    programStatus: ProgramStatusType,
    signers: Keypair[]) {

    const [programConfigPda, programConfigBump] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const tx = await program.methods.updateProgramStatus({
        programStatus: programStatus,
        programConfigBump: programConfigBump
    })
        .accounts({
            mainSigningAuthority: mainSigningAuthority,
            programConfig: programConfigPda,
        })
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function initializeEventTx(
    program: Program<Midan>,
    feePayer: PublicKey,
    authority: PublicKey,
    creatorKey: PublicKey,
    eventType: EventTypeType,
    eventUrl: string,
    code: string,
    teamLimit: number | null,
    memberLimit: number | null,
    systemProgram: PublicKey,
    rent: PublicKey,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const hash = codeHash(code);

    const tx = await program.methods.initializeEvent({
        url: eventUrl,
        teamLimit: teamLimit,
        memberLimit: memberLimit,
        creatorKey: creatorKey,
        eventType: eventType,
        codeHash: Array.from(hash)
    })
        .accounts({
            feeAndRentPayer: feePayer,
            authority: authority,
            eventDetail: eventDetailPda,
            systemProgram: systemProgram,
            rent: rent
        })
        .remainingAccounts([
            {
                pubkey: programConfigPda,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function updateEventTx(
    program: Program<Midan>,
    authority: PublicKey,
    creatorKey: PublicKey,
    eventStatus: EventStatusType,
    code: string,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const [eventDetailPda, eventDetailBump] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const hash = codeHash(code);

    const tx = await program.methods.updateEvent({
        creatorKey: creatorKey,
        eventStatus: eventStatus,
        eventDetailBump: eventDetailBump,
        codeHash: Array.from(hash)
    })
        .accounts({
            authority: authority,
            eventDetail: eventDetailPda,
        })
        .remainingAccounts([
            {
                pubkey: programConfigPda,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function initializeEventTeamTx(
    program: Program<Midan>,
    feePayer: PublicKey,
    authority: PublicKey,
    creatorKey: PublicKey,
    eventTeamType: EventTeamTypeType,
    eventTeamUrl: string,
    teamIndex: number,
    teamCode: string,
    memberLimit: number | null,
    eventCode: string,
    systemProgram: PublicKey,
    rent: PublicKey,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const [eventDetailPda, eventDetailBump] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const [eventTeamDetailPda] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);
    console.log("eventTeamDetailPda: ", eventTeamDetailPda.toBase58());

    const [eventTeamMemberDetailPda] = getEventTeamMemberDetailAccountPdaAndBump(program.programId, eventDetailPda, authority);
    console.log("eventTeamMemberDetailPda: ", eventTeamMemberDetailPda.toBase58());

    const hash = codeHash(teamCode);

    const tx = await program.methods.initializeEventTeam({
        url: eventTeamUrl,
        memberLimit: memberLimit,
        creatorKey: creatorKey,
        eventTeamType: eventTeamType,
        codeHash: Array.from(hash),
        eventCode: eventCode,
        eventDetailBump: eventDetailBump
    })
        .accounts({
            feeAndRentPayer: feePayer,
            authority: authority,
            eventDetail: eventDetailPda,
            eventTeamDetail: eventTeamDetailPda,
            eventTeamMemberDetail: eventTeamMemberDetailPda,
            systemProgram: systemProgram,
            rent: rent
        })
        .remainingAccounts([
            {
                pubkey: programConfigPda,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function updateEventTeamTx(
    program: Program<Midan>,
    authority: PublicKey,
    creatorKey: PublicKey,
    eventTeamStatus: EventTeamStatusType,
    teamIndex: number,
    teamCode: string,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const [eventDetailPda, eventDetailBump] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const [eventTeamDetailPda, eventTeamDetailBump] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);
    console.log("eventTeamDetailPda: ", eventTeamDetailPda.toBase58());

    const hash = codeHash(teamCode);

    const tx = await program.methods.updateEventTeam({
        creatorKey: creatorKey,
        eventTeamStatus: eventTeamStatus,
        eventTeamIndex: teamIndex,
        codeHash: Array.from(hash),
        eventDetailBump: eventDetailBump,
        eventTeamDetailBump: eventTeamDetailBump
    })
        .accounts({
            authority: authority,
            eventDetail: eventDetailPda,
            eventTeamDetail: eventTeamDetailPda,
        })
        .remainingAccounts([
            {
                pubkey: programConfigPda,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function initializeEventMemberTeamTx(
    program: Program<Midan>,
    feePayer: PublicKey,
    member: PublicKey,
    creatorKey: PublicKey,
    teamIndex: number,
    teamCode: string,
    systemProgram: PublicKey,
    rent: PublicKey,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const [eventDetailPda, eventDetailBump] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const [eventTeamDetailPda, eventTeamDetailBump] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);
    console.log("eventTeamDetailPda: ", eventTeamDetailPda.toBase58());

    const [eventTeamMemberDetailPda] = getEventTeamMemberDetailAccountPdaAndBump(program.programId, eventDetailPda, member);
    console.log("eventTeamMemberDetailPda: ", eventTeamMemberDetailPda.toBase58());

    const tx = await program.methods.initializeEventTeamMember({
        creatorKey: creatorKey,
        eventTeamIndex: teamIndex,
        teamCode: teamCode,
        eventDetailBump: eventDetailBump,
        eventTeamDetailBump: eventTeamDetailBump
    })
        .accounts({
            feeAndRentPayer: feePayer,
            member: member,
            eventDetail: eventDetailPda,
            eventTeamDetail: eventTeamDetailPda,
            eventTeamMemberDetail: eventTeamMemberDetailPda,
            systemProgram: systemProgram,
            rent: rent
        })
        .remainingAccounts([
            {
                pubkey: programConfigPda,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}

export async function updateEventMemberTeamTx(
    program: Program<Midan>,
    authority: PublicKey,
    member: PublicKey,
    creatorKey: PublicKey,
    teamIndex: number,
    eventTeamMemberStatus: EventTeamMemberStatusType,
    signers: Keypair[]) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPda: ", programConfigPda.toBase58());

    const [eventDetailPda, eventDetailBump] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const [eventTeamDetailPda, eventTeamDetailBump] = getEventTeamDetailAccountPdaAndBump(program.programId, eventDetailPda, teamIndex);
    console.log("eventTeamDetailPda: ", eventTeamDetailPda.toBase58());

    const [eventTeamMemberDetailPda, eventTeamMemberDetailBump] = getEventTeamMemberDetailAccountPdaAndBump(program.programId, eventDetailPda, member);
    console.log("eventTeamMemberDetailPda: ", eventTeamMemberDetailPda.toBase58());

    const tx = await program.methods.updateEventTeamMember({
        creatorKey: creatorKey,
        member: member,
        eventTeamIndex: teamIndex,
        eventTeamMemberStatus: eventTeamMemberStatus,
        eventDetailBump: eventDetailBump,
        eventTeamDetailBump: eventTeamDetailBump,
        eventTeamMemberDetailBump: eventTeamMemberDetailBump
    })
        .accounts({
            authority: authority,
            eventDetail: eventDetailPda,
            eventTeamDetail: eventTeamDetailPda,
            eventTeamMemberDetail: eventTeamMemberDetailPda,
        })
        .remainingAccounts([
            {
                pubkey: programConfigPda,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}
