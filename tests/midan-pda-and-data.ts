import {PublicKey} from "@solana/web3.js";

import {Program} from "@coral-xyz/anchor";
import {Midan} from "../target/types/midan";

const PROGRAM_CONFIG_ACCOUNT_PREFIX: string = "CONFIG";
const EVENT_DETAIL_ACCOUNT_PREFIX: string = "EVENT";

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

export async function getProgramConfigAccountData(program: Program<Midan>,) {
    const [programConfigPda] = getProgramConfigAccountPdaAndBump(program.programId);

    return await program.account.programConfigAccount.fetch(programConfigPda);
}

export async function getEventDetailAccountData(program: Program<Midan>, creatorKey: PublicKey) {
    const [eventDetailPda] = getEventDetailAccountPdaAndBump(program.programId, creatorKey);

    return await program.account.eventDetailAccount.fetch(eventDetailPda);
}




