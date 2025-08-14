import * as anchor from "@coral-xyz/anchor";
import {Program} from "@coral-xyz/anchor";
import {
    Keypair,
    LAMPORTS_PER_SOL,
    SYSVAR_RENT_PUBKEY,
    SystemProgram,
    Connection,
} from "@solana/web3.js";
import base58 from "bs58";
import {delay, requestToken} from "./midan-helper";

import {Midan} from "../target/types/midan";
import {initializeEventTx, initializeTx, updateEventTx, updateProgramStatusTx} from "./midan-client";
import {EventStatus, EventType, ProgramStatus, ProgramStatusType} from "./midan-enum";
import {assertEventDetailAccount, assertProgramConfigAccount} from "./midan-assert";

describe("midan", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.Midan as Program<Midan>;

    const programId = program.programId;

    const delayTimeCount = 1000;

    let connection: Connection = anchor.AnchorProvider.env().connection as any;

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

    // Testing Values

    const eventTeamCode = "team";

    const eventTeamMemberCode = "member";

    const eventUrl = "https://www.midan.com/event";

    const teamUrl = "https://www.midan.com/event/team";

    it("Setup Accounts", async () => {
        await requestToken(connection, feeAndRentPayerKeypair.publicKey, 20 * LAMPORTS_PER_SOL);
    });

    it("Initialize Program", async () => {
        await initializeTx(
            program,
            feeAndRentPayerKeypair.publicKey,
            mainSigningAuthorityKeypair.publicKey,
            SystemProgram.programId,
            SYSVAR_RENT_PUBKEY,
            [
                feeAndRentPayerKeypair,
                mainSigningAuthorityKeypair
            ]
        );

        await delay(delayTimeCount);

        await assertProgramConfigAccount(
            program,
            mainSigningAuthorityKeypair.publicKey,
            ProgramStatus.Normal
        );
    });

    it("Update Program Status", async () => {
        await updateProgramStatusTx(
            program,
            mainSigningAuthorityKeypair.publicKey,
            ProgramStatus.Normal,
            [
                mainSigningAuthorityKeypair
            ]
        );

        await delay(delayTimeCount);

        await assertProgramConfigAccount(
            program,
            mainSigningAuthorityKeypair.publicKey,
            ProgramStatus.Normal
        );
    });

    it("Initialize Event", async () => {
        await initializeEventTx(
            program,
            feeAndRentPayerKeypair.publicKey,
            eventAuthorityKeypair.publicKey,
            creatorKeypair.publicKey,
            EventType.PrivateWithTeam,
            eventUrl,
            eventTeamCode,
            2,
            3,
            SystemProgram.programId,
            SYSVAR_RENT_PUBKEY,
            [
                feeAndRentPayerKeypair,
                eventAuthorityKeypair
            ]
        );

        await delay(delayTimeCount);

        await assertEventDetailAccount(
            program,
            creatorKeypair.publicKey,
            eventAuthorityKeypair.publicKey,
            EventType.PrivateWithTeam,
            EventStatus.Normal,
            eventUrl,
            eventTeamCode,
            true,
            2,
            true,
            3,
            0,
            0
        );
    });

    it("Update Event", async () => {
        await updateEventTx(
            program,
            eventAuthorityKeypair.publicKey,
            creatorKeypair.publicKey,
            EventStatus.Normal,
            [
                eventAuthorityKeypair
            ]
        );

        await delay(delayTimeCount);

        await assertEventDetailAccount(
            program,
            creatorKeypair.publicKey,
            eventAuthorityKeypair.publicKey,
            EventType.PrivateWithTeam,
            EventStatus.Normal,
            eventUrl,
            eventTeamCode,
            true,
            2,
            true,
            3,
            0,
            0
        );
    });
});

