import * as anchor from "@coral-xyz/anchor";
import * as base58 from 'bs58';
import {BN, Wallet} from "@coral-xyz/anchor";
import {
    Commitment,
    ComputeBudgetProgram,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    SYSVAR_INSTRUCTIONS_PUBKEY,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionInstruction,
    VersionedTransaction,
    AddressLookupTableProgram,
    sendAndConfirmTransaction, TransactionMessage
} from '@solana/web3.js';

import {
    MidanLib,
    InitializeEventEvent,
    InitializeEventEventName,
    InitializeEventTeamEvent,
    InitializeEventTeamEventName,
    InitializeEventTeamMemberEvent,
    InitializeEventTeamMemberEventName,
    UpdateEventEvent,
    UpdateEventEventName,
    UpdateEventTeamEvent,
    UpdateEventTeamEventName,
    UpdateEventTeamMemberEvent,
    UpdateEventTeamMemberEventName,
    ProgramStatusType,
    ProgramStatus
} from "@mirrorworld/sonic.midan";
import {
    EventStatusType,
    EventTeamMemberStatusType,
    EventTeamStatusType,
    EventTeamTypeType,
    EventTypeType,
    EventType,
    EventTeamType,
    EventTeamMemberTypeType,
    EventTeamMemberType,
    EventTeamStatus,
    EventTeamMemberStatus,
    EventStatus,

} from "../sdks/packages/midan/src";

const feeAndRentPayerKeypair: Keypair = Keypair.fromSecretKey(base58.decode("58HRnwnjXbmrgesdzNC9UzXJR1AjdG1UFWG4gaH2ZJQmJj3d75afPtDZy5ToEB3Zv5cgbw9kFcbQPioFScMKAG1c"));
console.log("feeAndRentPayer: ", feeAndRentPayerKeypair.publicKey.toBase58());

const mainSigningAuthorityKeypair: Keypair = Keypair.fromSecretKey(base58.decode("3Ah6DRfNNVGMi2sU1D4mCsgxxpo5DHZErXCAu2R67ZsPyvA9KYn3NfkYCzrGtwojh9u83uCKbcMtfeu5Kf5gF57T"));
console.log("mainSigningAuthority: ", mainSigningAuthorityKeypair.publicKey.toBase58());

const eventAuthorityKeypair: Keypair = Keypair.fromSecretKey(base58.decode("3CPoCbWwVfbgKmpnegLHjRNRKFfp7CSY53QFHZVa2PXpNXhSUr5tiVRwbNmQLvV4Xcpi4pzMtKmgi3niGa6EWoBa"));
console.log("eventAuthorityKeypair: ", eventAuthorityKeypair.publicKey.toBase58());

const creatorKeypair: Keypair = Keypair.fromSecretKey(base58.decode("5Ex2QmXxEpssjpfmnoqeqCVAiH9PiVWM6PWw45yhUoUJxuqqpZ6ncqVV1F2VHjdJ4UYVqrafEShmPbwTzBZyLg51"));
console.log("creatorKeypair: ", creatorKeypair.publicKey.toBase58());

const team1AuthorityKeypair: Keypair = Keypair.fromSecretKey(base58.decode("4759xuGrdh82d8GbGcK6wgRHCYBT72QRuP83pLritHY4iSsQSLCK3NzNyXRj3hjSNuQ5263Us36GtKjHZbMc9c4J"));
console.log("team1AuthorityKeypair: ", team1AuthorityKeypair.publicKey.toBase58());

const team2AuthorityKeypair: Keypair = Keypair.fromSecretKey(base58.decode("4zth3mtRyDFXj8n6uyxQKbz5Wc6GLF8UWPcarpNHafawEQKe4yzngY7nDcQLK8mk3Sdsde6byJBmn5ur5BpgVJRm"));
console.log("team2AuthorityKeypair: ", team2AuthorityKeypair.publicKey.toBase58());

const teamMember1Keypair: Keypair = Keypair.fromSecretKey(base58.decode("45A4QxZ2VBuFNwZUF9GnKkano4fYn9MYW8msy2asVy3YT3JDaAHu3yThoUaazLe6TVMBqJkiDHJHxZLJtSYjQkhs"));
console.log("teamMember1Keypair: ", teamMember1Keypair.publicKey.toBase58());

const teamMember2Keypair: Keypair = Keypair.fromSecretKey(base58.decode("9tL4uU5o999gMkkJvxK9bWSRz1SQbCQn7Kf8nTUauPwCpQ8A4A1CfyKJjy6tCPiu6TLrXtoaM3BNGWqYnCqnHCK"));
console.log("teamMember2Keypair: ", teamMember2Keypair.publicKey.toBase58());

const teamMember3Keypair: Keypair = Keypair.fromSecretKey(base58.decode("5W85WuP6Uk6MnnUgUycysVuCctoppNuD8bFjcrswCzggurNvAUDioc9cpru8NMLBYggXU8rMT8k3ScribRLTLRGW"));
console.log("teamMember3Keypair: ", teamMember3Keypair.publicKey.toBase58());

const commitment: Commitment = 'confirmed';

const connection = new Connection('https://api.testnet.sonic.game', {
    commitment,
    wsEndpoint: 'wss://api.testnet.sonic.game'
});

const midanLib: MidanLib = new MidanLib(new PublicKey("4VmPGCKEvpw4cLPrKTWAXozs5SBinUHWxmiK3cQdUaQ1"),
    connection, new Wallet(anchor.web3.Keypair.generate()));

const timeDelay = 3000;

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


// Setup Events
const initializeEventEventListener = midanLib.addInitializeEventEventListener(handleInitializeEventEvent);
const updateEventEventListener = midanLib.addUpdateEventEventListener(handleUpdateEventEvent);
const initializeEventTeamEventListener = midanLib.addInitializeEventTeamEventListener(handleInitializeEventTeamEvent)
const updateEventTeamEventListener = midanLib.addUpdateEventTeamEventListener(handleUpdateEventTeamEvent);
const initializeEventTeamMemberEventListener = midanLib.addInitializeEventTeamMemberEventListener(handleInitializeEventTeamMemberEvent);
const updateEventTeamMemberEventListener = midanLib.addUpdateEventTeamMemberEventListener(handleUpdateEventTeamMemberEvent);

// Testing Values

const eventCode = "event";

const eventTeamCode = "team";

const eventUrl = "https://www.midan.com/event";

const teamUrl = "https://www.midan.com/event/team";

const creatorKey = new PublicKey("FpHTKievbczGPvKiPaNyfZSHf9ewa1h98FiTcPrYWsgY");

(async () => {
    // Main Function

    // await initialize(
    //     feeAndRentPayerKeypair.publicKey,
    //     mainSigningAuthorityKeypair.publicKey,
    //     [
    //         feeAndRentPayerKeypair,
    //         mainSigningAuthorityKeypair,
    //     ]
    // );

    // await updateProgramStatus(
    //     feeAndRentPayerKeypair.publicKey,
    //     mainSigningAuthorityKeypair.publicKey,
    //     ProgramStatus.Normal,
    //     [
    //         feeAndRentPayerKeypair,
    //         mainSigningAuthorityKeypair,
    //     ]
    // );

    // await initializeEvent(
    //     feeAndRentPayerKeypair.publicKey,
    //     eventAuthorityKeypair.publicKey,
    //     EventType.PrivateWithTeam,
    //     eventUrl,
    //     eventCode,
    //     2,
    //     4,
    //     [
    //         feeAndRentPayerKeypair,
    //         eventAuthorityKeypair
    //     ]
    // );

    // await updateEvent(
    //     feeAndRentPayerKeypair.publicKey,
    //     eventAuthorityKeypair.publicKey,
    //     creatorKey,
    //     eventCode,
    //     EventStatus.Normal,
    //     [
    //         feeAndRentPayerKeypair,
    //         eventAuthorityKeypair
    //     ]
    // );

    // new Team Index

    const eventData = await midanLib.getEventDetailAccountData(creatorKey);

    const eventTeamIndex = eventData.totalTeams + 1;

    console.log("eventTeamIndex: ", eventTeamIndex);

    // await initializeEventTeam(
    //     feeAndRentPayerKeypair.publicKey,
    //     team2AuthorityKeypair.publicKey,
    //     creatorKey,
    //     EventTeamType.Private,
    //     teamUrl,
    //     eventTeamIndex,
    //     eventTeamCode,
    //     2,
    //     eventCode,
    //     [
    //         feeAndRentPayerKeypair,
    //         team2AuthorityKeypair
    //     ]
    // );

    // await updateEventTeam(
    //     feeAndRentPayerKeypair.publicKey,
    //     team1AuthorityKeypair.publicKey,
    //     creatorKey,
    //     1,
    //     eventTeamCode,
    //     EventStatus.Normal,
    //     [
    //         feeAndRentPayerKeypair,
    //         team1AuthorityKeypair
    //     ]
    // );

    // await initializeEventTeamMember(
    //     feeAndRentPayerKeypair.publicKey,
    //     teamMember2Keypair.publicKey,
    //     creatorKey,
    //     2,
    //     eventTeamCode,
    //     [
    //         feeAndRentPayerKeypair,
    //         teamMember2Keypair
    //     ]
    // );

    // await updateEventTeamMember(
    //     feeAndRentPayerKeypair.publicKey,
    //     team2AuthorityKeypair.publicKey,
    //     teamMember1Keypair.publicKey,
    //     creatorKey,
    //     2,
    //     EventTeamMemberStatus.Normal,
    //     [
    //         feeAndRentPayerKeypair,
    //         team2AuthorityKeypair
    //     ]
    // );

    await delay(timeDelay);

    // remove events
    await midanLib.removeEventListener(initializeEventEventListener);
    await midanLib.removeEventListener(updateEventEventListener);
    await midanLib.removeEventListener(initializeEventTeamEventListener);
    await midanLib.removeEventListener(updateEventTeamEventListener);
    await midanLib.removeEventListener(initializeEventTeamMemberEventListener);
    await midanLib.removeEventListener(updateEventTeamMemberEventListener);

})();

async function initialize(
    feeAndRentPayer: PublicKey,
    mainSigningAuthority: PublicKey,
    signers: Keypair[]
) {
    console.log("Started initialize");

    let tx = await midanLib.createInitializeTransaction(
        feeAndRentPayer,
        mainSigningAuthority,
        {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        }
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

async function updateProgramStatus(
    feeAndRentPayer: PublicKey,
    mainSigningAuthority: PublicKey,
    programStatus: ProgramStatusType,
    signers: Keypair[]
) {
    console.log("Started updateProgramStatus");

    let tx = await midanLib.createUpdateProgramStatusTransaction(
        mainSigningAuthority,
        programStatus
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

async function initializeEvent(
    feeAndRentPayer: PublicKey,
    authority: PublicKey,
    eventType: EventTypeType,
    eventUrl: string,
    code: string,
    teamLimit: number | null,
    memberLimit: number | null,
    signers: Keypair[]
) {
    console.log("Started initializeEvent");

    const creatorKey = Keypair.generate().publicKey;
    console.log("new creatorKey: ", creatorKey.toBase58());

    let tx = await midanLib.createInitializeEventTransaction(
        feeAndRentPayer,
        authority,
        creatorKey,
        eventType,
        eventUrl,
        code,
        teamLimit,
        memberLimit,
        {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        }
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

async function updateEvent(
    feeAndRentPayer: PublicKey,
    authority: PublicKey,
    creatorKey: PublicKey,
    code: string,
    eventStatus: EventStatusType,
    signers: Keypair[]
) {
    console.log("Started initializeEvent");

    let tx = await midanLib.createUpdateEventTransaction(
        authority,
        creatorKey,
        code,
        eventStatus
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

async function initializeEventTeam(
    feeAndRentPayer: PublicKey,
    authority: PublicKey,
    creatorKey: PublicKey,
    eventTeamType: EventTeamTypeType,
    eventTeamUrl: string,
    teamIndex: number,
    teamCode: string,
    memberLimit: number | null,
    eventCode: string,
    signers: Keypair[]
) {
    console.log("Started initializeEventTeam");

    let tx = await midanLib.createInitializeEventTeamTransaction(
        feeAndRentPayer,
        authority,
        creatorKey,
        eventTeamType,
        eventTeamUrl,
        teamIndex,
        teamCode,
        memberLimit,
        eventCode,
        {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        }
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

async function updateEventTeam(
    feeAndRentPayer: PublicKey,
    authority: PublicKey,
    creatorKey: PublicKey,
    teamIndex: number,
    teamCode: string,
    eventTeamStatus: EventTeamStatusType,
    signers: Keypair[]
) {
    console.log("Started updateEventTeam");

    let tx = await midanLib.createUpdateEventTeamTransaction(
        authority,
        creatorKey,
        teamIndex,
        teamCode,
        eventTeamStatus
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function initializeEventTeamMember(
    feeAndRentPayer: PublicKey,
    member: PublicKey,
    creatorKey: PublicKey,
    teamIndex: number,
    teamCode: string,
    signers: Keypair[]
) {
    console.log("Started initializeEventTeamMember");

    let tx = await midanLib.createInitializeEventTeamMemberTransaction(
        feeAndRentPayer,
        member,
        creatorKey,
        teamIndex,
        teamCode,
        {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        }
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}

async function updateEventTeamMember(
    feeAndRentPayer: PublicKey,
    authority: PublicKey,
    member: PublicKey,
    creatorKey: PublicKey,
    teamIndex: number,
    eventTeamMemberStatus: EventTeamMemberStatusType,
    signers: Keypair[]
) {
    console.log("Started updateEventTeamMember");

    let tx = await midanLib.createUpdateEventTeamMemberTransaction(
        authority,
        member,
        creatorKey,
        teamIndex,
        eventTeamMemberStatus
    );

    await midanLib.addFeePayerAndRecentBlockHashInTransaction(tx, feeAndRentPayer);

    for (let i = 0; i < signers.length; i++) {
        midanLib.signTransaction(tx, base58.encode(signers[i].secretKey));
    }

    let txHash = await connection.sendRawTransaction(tx.serialize());
    console.log("Tx Hash: ", txHash);

    await delay(timeDelay);
}