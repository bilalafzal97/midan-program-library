import {AnchorProvider, Program, Wallet} from '@coral-xyz/anchor';

import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionInstruction,
    VersionedTransaction,
} from '@solana/web3.js';

import {u32} from "@metaplex-foundation/beet";

import * as base58 from 'bs58';

import * as nacl from 'tweetnacl';

import {Midan, IDL} from './types/midan';

import {InitializeConfig} from './configs';
import {
    InitializeEventEvent,
    InitializeEventEventName,
    InitializeEventTeamEvent,
    InitializeEventTeamEventName,
    InitializeEventTeamMemberEvent,
    InitializeEventTeamMemberEventName,
    UpdateEventTeamMemberEvent,
    UpdateEventTeamMemberEventName,
    UpdateEventEvent,
    UpdateEventEventName,
    UpdateEventTeamEvent,
    UpdateEventTeamEventName
} from "./events-types";

import {
    EventStatusType,
    ProgramStatusType,
    EventTypeType,
    EventStatus,
    EventTeamStatusType,
    EventTeamMemberStatus,
    EventTeamMemberType,
    EventTeamMemberStatusType,
    EventTeamStatus,
    EventTeamType,
    EventTeamMemberTypeType,
    ProgramStatus,
    EventTeamTypeType,
    EventType
} from "./types/midan-enums";
import {keccak256} from "ethereum-cryptography/keccak";

/// Prefix
const PROGRAM_CONFIG_ACCOUNT_PREFIX: string = "CONFIG";
const EVENT_DETAIL_ACCOUNT_PREFIX: string = "EVENT";
const EVENT_TEAM_DETAIL_ACCOUNT_PREFIX: string = "TEAM";
const EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX: string = "MEMBER";

export class MidanLib {
    program: Program<Midan>;
    connection: Connection;

    constructor(programId: PublicKey, connection: Connection, wallet: Wallet) {
        this.connection = connection;
        const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
        this.program = new Program(IDL, programId, provider);
    }

    signTransaction(tx: Transaction, secretKey: string): Transaction {
        const keypair: Keypair = Keypair.fromSecretKey(base58.decode(secretKey));
        const signature = nacl.sign.detached(tx.serializeMessage(), keypair.secretKey);
        tx.addSignature(keypair.publicKey, Buffer.from(signature));

        return tx;
    }

    signVersionTransaction(tx: VersionedTransaction, secretKey: string): VersionedTransaction {
        const keypair: Keypair = Keypair.fromSecretKey(base58.decode(secretKey));
        const signature = nacl.sign.detached(tx.message.serialize(), keypair.secretKey);
        tx.addSignature(keypair.publicKey, Buffer.from(signature));

        return tx;
    }

    addSignatureInTransaction(tx: Transaction, signerAddress: PublicKey, signature: Buffer): Transaction {
        tx.addSignature(signerAddress, signature);

        return tx;
    }

    addSignatureInVersionTransaction(tx: VersionedTransaction, signerAddress: PublicKey, signature: Buffer): VersionedTransaction {
        tx.addSignature(signerAddress, signature);

        return tx;
    }

    async addFeePayerAndRecentBlockHashInTransaction(tx: Transaction, feePayer: PublicKey, units: number = 100000): Promise<Transaction> {
        tx.add(ComputeBudgetProgram.setComputeUnitLimit({units: units}));
        tx.feePayer = feePayer;
        tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;

        return tx;
    }

    async isPdaAddressInitialize(pdaAddress: PublicKey): Promise<boolean> {
        const pdaAccountInfo = await this.connection.getAccountInfo(pdaAddress);

        return pdaAccountInfo != null;
    }

    //// PDAs

    getProgramConfigAccountPdaAndBump(): [PublicKey, number] {
        return PublicKey.findProgramAddressSync([Buffer.from(PROGRAM_CONFIG_ACCOUNT_PREFIX)], this.program.programId);
    }

    getEventDetailAccountPdaAndBump(creatorKey: PublicKey): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [
                Buffer.from(EVENT_DETAIL_ACCOUNT_PREFIX),
                creatorKey.toBuffer()
            ],
            this.program.programId
        )
    }

    getEventTeamDetailAccountPdaAndBump(eventDetail: PublicKey, teamIndex: number): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [
                Buffer.from(EVENT_TEAM_DETAIL_ACCOUNT_PREFIX),
                eventDetail.toBuffer(),
                this.toU32Bytes(teamIndex)
            ],
            this.program.programId
        )
    }

    getEventTeamMemberDetailAccountPdaAndBump(eventDetail: PublicKey, member: PublicKey): [PublicKey, number] {
        return PublicKey.findProgramAddressSync(
            [
                Buffer.from(EVENT_TEAM_MEMBER_DETAIL_ACCOUNT_PREFIX),
                eventDetail.toBuffer(),
                member.toBuffer()
            ],
            this.program.programId
        )
    }

    //// Get Account Data

    async getProgramConfigAccountData() {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        return await this.program.account.programConfigAccount.fetch(programConfigPda);
    }

    async getEventDetailAccountData(creatorKey: PublicKey) {
        const [eventDetailPda] = this.getEventDetailAccountPdaAndBump(creatorKey);

        return await this.program.account.eventDetailAccount.fetch(eventDetailPda);
    }

    async getEventTeamDetailAccountData(creatorKey: PublicKey, teamIndex: number) {
        const [eventDetailPda] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const [eventTeamDetailPda] = this.getEventTeamDetailAccountPdaAndBump(eventDetailPda, teamIndex);

        return await this.program.account.eventTeamDetailAccount.fetch(eventTeamDetailPda);
    }

    async getEventTeamMemberDetailAccountData(creatorKey: PublicKey, member: PublicKey) {
        const [eventDetailPda] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const [eventTeamMemberDetailPda] = this.getEventTeamMemberDetailAccountPdaAndBump(eventDetailPda, member);

        return await this.program.account.eventTeamMemberDetailAccount.fetch(eventTeamMemberDetailPda);
    }

    // Transactions

    async createInitializeTransaction(
        feeAndRentPayer: PublicKey,
        mainSigningAuthority: PublicKey,
        config: InitializeConfig = {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        }
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const tx: Transaction = new Transaction();

        const initializeIx: TransactionInstruction = await this.program.methods
            .initialize({})
            .accounts({
                feeAndRentPayer: feeAndRentPayer,
                mainSigningAuthority: mainSigningAuthority,
                programConfig: programConfigPda,
                systemProgram: config.systemProgram,
                rent: config.rent,
            })
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    async createUpdateProgramStatusTransaction(mainSigningAuthority: PublicKey, programStatus: ProgramStatusType): Promise<Transaction> {
        const [programConfigPda, programConfigBump] = this.getProgramConfigAccountPdaAndBump();

        const tx: Transaction = new Transaction();

        const updateProgramStatusIx: TransactionInstruction = await this.program.methods
            .updateProgramStatus({
                programStatus: programStatus,
                programConfigBump: programConfigBump,
            })
            .accounts({
                mainSigningAuthority: mainSigningAuthority,
                programConfig: programConfigPda,
            })
            .instruction();

        tx.add(updateProgramStatusIx);

        return tx;
    }

    async createInitializeEventTransaction(
        feeAndRentPayer: PublicKey,
        authority: PublicKey,
        creatorKey: PublicKey,
        eventType: EventTypeType,
        eventUrl: string,
        code: string,
        teamLimit: number | null,
        memberLimit: number | null,
        config: InitializeConfig = {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        }
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const [eventDetailPda] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const tx: Transaction = new Transaction();

        const hash = this.codeHash(code);

        const initializeIx: TransactionInstruction = await this.program.methods
            .initializeEvent({
                url: eventUrl,
                teamLimit: teamLimit,
                memberLimit: memberLimit,
                creatorKey: creatorKey,
                eventType: eventType,
                codeHash: Array.from(hash)
            })
            .accounts({
                feeAndRentPayer: feeAndRentPayer,
                authority: authority,
                eventDetail: eventDetailPda,
                systemProgram: config.systemProgram,
                rent: config.rent
            })
            .remainingAccounts([
                {
                    pubkey: programConfigPda,
                    isSigner: false,
                    isWritable: false
                }
            ])
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    async createUpdateEventTransaction(
        authority: PublicKey,
        creatorKey: PublicKey,
        code: string,
        eventStatus: EventStatusType
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const [eventDetailPda, eventDetailBump] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const tx: Transaction = new Transaction();

        const hash = this.codeHash(code);

        const initializeIx: TransactionInstruction = await this.program.methods
            .updateEvent({
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
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    async createInitializeEventTeamTransaction(
        feeAndRentPayer: PublicKey,
        authority: PublicKey,
        creatorKey: PublicKey,
        eventTeamType: EventTeamTypeType,
        eventTeamUrl: string,
        teamIndex: number,
        teamCode: string,
        memberLimit: number | null,
        eventCode: string,
        config: InitializeConfig = {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        }
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const [eventDetailPda, eventDetailBump] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const [eventTeamDetailPda] = this.getEventTeamDetailAccountPdaAndBump(eventDetailPda, teamIndex);

        const [eventTeamMemberDetailPda] = this.getEventTeamMemberDetailAccountPdaAndBump(eventDetailPda, authority);

        const tx: Transaction = new Transaction();

        const hash = this.codeHash(teamCode);

        const initializeIx: TransactionInstruction = await this.program.methods
            .initializeEventTeam({
                url: eventTeamUrl,
                memberLimit: memberLimit,
                creatorKey: creatorKey,
                eventTeamType: eventTeamType,
                codeHash: Array.from(hash),
                eventCode: eventCode,
                eventDetailBump: eventDetailBump
            })
            .accounts({
                feeAndRentPayer: feeAndRentPayer,
                authority: authority,
                eventDetail: eventDetailPda,
                eventTeamDetail: eventTeamDetailPda,
                eventTeamMemberDetail: eventTeamMemberDetailPda,
                systemProgram: config.systemProgram,
                rent: config.rent
            })
            .remainingAccounts([
                {
                    pubkey: programConfigPda,
                    isSigner: false,
                    isWritable: false
                }
            ])
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    async createUpdateEventTeamTransaction(
        authority: PublicKey,
        creatorKey: PublicKey,
        teamIndex: number,
        teamCode: string,
        eventTeamStatus: EventTeamStatusType
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const [eventDetailPda, eventDetailBump] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const [eventTeamDetailPda, eventTeamDetailBump] = this.getEventTeamDetailAccountPdaAndBump(eventDetailPda, teamIndex);

        const tx: Transaction = new Transaction();

        const hash = this.codeHash(teamCode);

        const initializeIx: TransactionInstruction = await this.program.methods
            .updateEventTeam({
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
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    async createInitializeEventTeamMemberTransaction(
        feeAndRentPayer: PublicKey,
        member: PublicKey,
        creatorKey: PublicKey,
        teamIndex: number,
        teamCode: string,
        config: InitializeConfig = {
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        }
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const [eventDetailPda, eventDetailBump] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const [eventTeamDetailPda, eventTeamDetailBump] = this.getEventTeamDetailAccountPdaAndBump(eventDetailPda, teamIndex);

        const [eventTeamMemberDetailPda] = this.getEventTeamMemberDetailAccountPdaAndBump(eventDetailPda, member);

        const tx: Transaction = new Transaction();

        const initializeIx: TransactionInstruction = await this.program.methods
            .initializeEventTeamMember({
                creatorKey: creatorKey,
                eventTeamIndex: teamIndex,
                teamCode: teamCode,
                eventDetailBump: eventDetailBump,
                eventTeamDetailBump: eventTeamDetailBump
            })
            .accounts({
                feeAndRentPayer: feeAndRentPayer,
                member: member,
                eventDetail: eventDetailPda,
                eventTeamDetail: eventTeamDetailPda,
                eventTeamMemberDetail: eventTeamMemberDetailPda,
                systemProgram: config.systemProgram,
                rent: config.rent
            })
            .remainingAccounts([
                {
                    pubkey: programConfigPda,
                    isSigner: false,
                    isWritable: false
                }
            ])
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    async createUpdateEventTeamMemberTransaction(
        authority: PublicKey,
        member: PublicKey,
        creatorKey: PublicKey,
        teamIndex: number,
        eventTeamMemberStatus: EventTeamMemberStatusType
    ): Promise<Transaction> {
        const [programConfigPda] = this.getProgramConfigAccountPdaAndBump();

        const [eventDetailPda, eventDetailBump] = this.getEventDetailAccountPdaAndBump(creatorKey);

        const [eventTeamDetailPda, eventTeamDetailBump] = this.getEventTeamDetailAccountPdaAndBump(eventDetailPda, teamIndex);

        const [eventTeamMemberDetailPda, eventTeamMemberDetailBump] = this.getEventTeamMemberDetailAccountPdaAndBump(eventDetailPda, member);

        const tx: Transaction = new Transaction();

        const initializeIx: TransactionInstruction = await this.program.methods
            .updateEventTeamMember({
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
            .instruction();

        tx.add(initializeIx);

        return tx;
    }

    // Events
    async removeEventListener(eventId: number) {
        await this.program.removeEventListener(eventId);
    }

    addInitializeEventEventListener(callback: (event: InitializeEventEvent) => void): number {
        return this.program.addEventListener(InitializeEventEventName, callback);
    }

    addUpdateEventEventListener(callback: (event: UpdateEventEvent) => void): number {
        return this.program.addEventListener(UpdateEventEventName, callback);
    }

    addInitializeEventTeamEventListener(callback: (event: InitializeEventTeamEvent) => void): number {
        return this.program.addEventListener(InitializeEventTeamEventName, callback);
    }

    addUpdateEventTeamEventListener(callback: (event: UpdateEventTeamEvent) => void): number {
        return this.program.addEventListener(UpdateEventTeamEventName, callback);
    }

    addInitializeEventTeamMemberEventListener(callback: (event: InitializeEventTeamMemberEvent) => void): number {
        return this.program.addEventListener(InitializeEventTeamMemberEventName, callback);
    }

    addUpdateEventTeamMemberEventListener(callback: (event: UpdateEventTeamMemberEvent) => void): number {
        return this.program.addEventListener(UpdateEventTeamMemberEventName, callback);
    }

    toU32Bytes(num: number): Uint8Array {
        const bytes = Buffer.alloc(4);
        u32.write(bytes, 0, num);
        return bytes;
    }

    codeHash(code: string) {
        return keccak256(Buffer.from(code));
    }
}
