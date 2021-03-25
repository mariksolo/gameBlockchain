import { TransactionInfo } from "./TransactionInfo";

export const parseInfoString = (infoString) => {
//   console.log("parse Info String");
  let params = [];
  let str = "";
  // console.log(infoString);
  for (let i = 0; i < infoString.length; i++) {
    if (infoString[i] === ",") {
      params.push(str);
      str = "";
    } else {
      str += infoString[i];
    }
  }
  params.push(str);
  let info = new TransactionInfo(params[0], params.slice(1));
//   console.log(info);
//   console.log("end parse Info String");
  return info;
};
