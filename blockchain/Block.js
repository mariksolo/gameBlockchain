export class Block {
  constructor(prevHash, timestamp, transactionInfo) {
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.transactionInfo = transactionInfo;
  }
}
