import { Commitment, PublicKey } from '@solana/web3.js';

export interface InitializeConfig {
  systemProgram: PublicKey;

  rent: PublicKey;

  commitment?: Commitment;
}
