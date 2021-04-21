import { parseInfoString } from "../transactions/parseInfoString";
import { TransactionInfo } from "../transactions/TransactionInfo";
import { Block } from "../blockchain/Block";

export const parseBlock = (blockStr) => {
  let prevHash = "";
  let nonce = "";
  let infoStr = "";

  let i = 0;
  for (; i < blockStr.length; i++) {
    // console.log(blockStr[i]);
    if (blockStr[i] === "]") {
      i++;
      break;
    } else {
      prevHash += blockStr[i];
    }
  }
//   console.log("prevHash done");

  for (; i < blockStr.length; i++) {
    // console.log(blockStr[i]);
    if (blockStr[i] === "]") {
      i++;
      break;
    } else {
      nonce += blockStr[i];
    }
  }

  for (; i < blockStr.length; i++) {
    if (blockStr[i] === "]") {
      i++;
      break;
    } else {
      infoStr += blockStr[i];
    }
  }

  let transactionInfo = parseInfoString(infoStr);
  let block = new Block(prevHash, nonce, transactionInfo);
  return block;
};
