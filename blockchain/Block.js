import { TransactionInfo } from "../transactions/TransactionInfo";

export class Block {
  constructor(prevHash, nonce, transactionInfo) {
    this.prevHash = prevHash;
    this.nonce = nonce;
    this.transactionInfo = transactionInfo;
  }

  createBlockString() {
    return this.prevHash + "]" + this.nonce + "]" + this.transactionInfo.createInfoString() + "]";
  }
}
