import { readFile } from "fs";
import { TransactionInfo } from "../TransactionInfo";

export const createCreateAccountInfo = async () => {
  let publicKey = await new Promise((resolve, reject) => {
    readFile("publicKey.txt", "utf8", (err, key) => {
      if (err) throw err;
      resolve(key);
    });
  });
  console.log("createCreateAccountInfo");
  console.log(publicKey);

  let ip = await new Promise((resolve, reject) => {
    readFile("IP.txt", "utf8", (err, key) => {
      if (err) throw err;
      resolve(key);
    });
  });

  // console.log(publicKey);
  // console.log(ip);
  let info = new TransactionInfo("create_account", [ip, publicKey]);
 
  return info;
};
