export class TransactionInfo {
  constructor(transactionType, parameterList) {
    this.transactionType = transactionType;
    this.parameterList = parameterList;
    this.createInfoString();
  }

  createInfoString() {
    let infoString = "";
    for (let i = 0; i < this.parameterList.length; i++) {
      if (infoString != "") {
        infoString += ",";
      }
      infoString += this.parameterList[i];
    }

    this.infoString = infoString;
  }
}
