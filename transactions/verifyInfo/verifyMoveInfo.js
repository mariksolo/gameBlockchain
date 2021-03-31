import { getBlockchain } from "../../blockchain/getBlockchain";
import { verifySignature } from "../../cryptography/verifySignature";
import { getKnownNodes } from "../../networking/getKnownNodes";
import { TransactionInfo } from "../TransactionInfo";

export const verifyMoveInfo = async (info) => {
  // TODO add verification for actual rules of game
  const blockchain = await getBlockchain();
  let gameFound = false;
  let signature = info.parameterList[3];

  for (let block of blockchain.blocks) {
    if (
      (block.transactionInfo.transactionType === "create_game") &
      (block.transactionInfo.parameterList[6] === info.parameterList[2])
    ) {
      gameFound = true;
      break;
    }
  }

  if (!gameFound) {
    return false;
  }
  console.log("here");

  const knownNodes = await getKnownNodes();
//   console.log(knownNodes);
  let publicKey;
  let ipFound = false;
  for (let knownNode of knownNodes) {
    if (knownNode.ip === info.parameterList[1]) {
      ipFound = true;
      publicKey = knownNode.key;
    }
  }

  if (!ipFound) {
    return false;
  }
  
  const signatureString = info.parameterList.slice(0, info.parameterList.length - 1).join(",");

  return verifySignature(signatureString, publicKey, signature);
};