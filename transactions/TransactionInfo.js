export class TransactionInfo {
  constructor(transactionType, parameterList) {
    this.transactionType = transactionType;
    this.parameterList = parameterList;
    this.infoString = this.createInfoString();
  }

  createInfoString() {
    let infoString = "";
    infoString += this.transactionType;
    for (let i = 0; i < this.parameterList.length; i++) {
      if (infoString != "") {
        infoString += ",";
      }
      infoString += this.parameterList[i];
    }

    return infoString;
  }
}
