import { getKeyPair } from "../../cryptography/getKeyPair";
import { TransactionInfo } from "../TransactionInfo";
import { createSignature } from "../../cryptography/createSignature";
import { readFile } from "fs";

export const createMoveInfo = async (gameID, move) => {
  const [publicKey, privateKey] = await getKeyPair();
  let ip = await new Promise((resolve, reject) => {
    readFile("IP.txt", "utf8", (err, key) => {
      if (err) throw err;
      resolve(key);
    });
  });

  let parameters = [move, ip, gameID];
  const signatureString = parameters.join(",");
  const signature = createSignature(signatureString, privateKey);
  parameters.push(signature);
  const info = new TransactionInfo("move", parameters);
  return info;
};
