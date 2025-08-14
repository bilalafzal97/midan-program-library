import {BN, Program} from "@coral-xyz/anchor";
import {Midan} from "../target/types/midan";

import {
    Keypair,
    PublicKey,
} from "@solana/web3.js";
import {
    getEventDetailAccountPdaAndBump,
    getProgramConfigAccountPdaAndBump
} from "./midan-pda-and-data";
import {EventStatus, EventStatusType, EventType, EventTypeType, ProgramStatusType} from "./midan-enum";
import {createAssociatedTokenAccount, getAssociatedTokenAddress} from "@solana/spl-token";
import {codeHash} from "./midan-helper";

export async function initializeTx(
    program: Program<Midan>,
    feePayer: PublicKey,
    mainSigningAuthority: PublicKey,
    systemProgram: PublicKey,
    rent: PublicKey,
    signers: Keypair[]) {
    const [programConfigPad] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPad: ", programConfigPad.toBase58());

    const tx = await program.methods.initialize({})
        .accounts({
            feeAndRentPayer: feePayer,
            mainSigningAuthority: mainSigningAuthority,
            programConfig: programConfigPad,
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

    const [programConfigPad, programConfigBump] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPad: ", programConfigPad.toBase58());

    const tx = await program.methods.updateProgramStatus({
        programStatus: programStatus,
        programConfigBump: programConfigBump
    })
        .accounts({
            mainSigningAuthority: mainSigningAuthority,
            programConfig: programConfigPad,
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
    teamLimit: number,
    memberLimit: number,
    systemProgram: PublicKey,
    rent: PublicKey,
    signers: Keypair[]) {
    const [programConfigPad] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPad: ", programConfigPad.toBase58());

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
                pubkey: programConfigPad,
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
    signers: Keypair[]) {
    const [programConfigPad] = getProgramConfigAccountPdaAndBump(program.programId);
    console.log("programConfigPad: ", programConfigPad.toBase58());

    const [eventDetailPda, eventDetailBump] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);
    console.log("eventDetailPda: ", eventDetailPda.toBase58());

    const tx = await program.methods.updateEvent({
        creatorKey: creatorKey,
        eventStatus: eventStatus,
        eventDetailBump: eventDetailBump
    })
        .accounts({
            authority: authority,
            eventDetail: eventDetailPda,
        })
        .remainingAccounts([
            {
                pubkey: programConfigPad,
                isSigner: false,
                isWritable: false
            }
        ])
        .signers(signers)
        .rpc();

    console.log("Your transaction signature", tx);
}
