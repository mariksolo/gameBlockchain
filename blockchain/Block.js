import { TransactionInfo } from "../transactions/TransactionInfo";

export class Block {
  constructor(prevHash, timestamp, transactionInfo) {
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.transactionInfo = transactionInfo;
  }

  createBlockString() {
    return this.prevHash + "]" + this.timestamp + "]" + this.transactionInfo.createInfoString() + "]";
  }
}
