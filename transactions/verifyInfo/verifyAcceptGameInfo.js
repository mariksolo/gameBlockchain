import { getBlockchain } from "../../blockchain/getBlockchain";
import { verifySignature } from "../../cryptography/verifySignature";
import { TransactionInfo } from "../TransactionInfo";

export const verifyAcceptGameInfo = async (info) => {
  const blockchain = await getBlockchain();
  let gameFound = false;
  let signature = info.parameterList[1];

  let opponentPublicKey;
  for (let block of blockchain.blocks) {
    if (
      (block.transactionInfo.transactionType === "create_game") &
      (block.transactionInfo.parameterList[6] === info.parameterList[0])
    ) {
      gameFound = true;
      opponentPublicKey = block.transactionInfo.parameterList[4];
      console.log(block.transactionInfo.parameterList);
      break;
    }
  }

  if (!gameFound) {
    return false;
  }

  return verifySignature(info.parameterList[0], opponentPublicKey, signature);
};
