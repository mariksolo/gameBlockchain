import { getKeyPair } from "../../cryptography/getKeyPair";
import { readFile } from "fs";
import { TransactionInfo } from "../TransactionInfo";
import { getKnownNodes } from "../../networking/getKnownNodes";
import { v4 as uuidv4 } from 'uuid';
import { createSignature } from "../../cryptography/createSignature";

export const createStartGameInfo = async (proposedOpponentIP, startingTeam) => {
  const [publicKey, privateKey] = await getKeyPair();
  const ip = await new Promise((resolve, reject) => {
    readFile("IP.txt", "utf8", (err, key) => {
      if (err) throw err;
      resolve(key);
    });
  });
  const knownNodes = await getKnownNodes();
  let proposedOpponentKey;
  for (let knownNode of knownNodes) {
    if (knownNode.ip === proposedOpponentIP) {
      proposedOpponentKey = knownNode.key;
      break;
    }
  }

  const uuid = uuidv4();

  // The signature also functions as the unique ID of the game
  // It must include the name of the info type, although it will be
  // removed from the parameters later

  let infoParameters = ["create_game", "tic_tac_toe", startingTeam, publicKey, ip, proposedOpponentKey, proposedOpponentIP, uuid];
  const parameterSignatureString = infoParameters.join(",");
  const signature = createSignature(parameterSignatureString, privateKey);
  infoParameters.shift();
  infoParameters.push(signature);
  const info = new TransactionInfo("create_game", infoParameters);
  return info;
};
