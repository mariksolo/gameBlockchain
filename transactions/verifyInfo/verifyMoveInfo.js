import { getBlockchain } from "../../blockchain/getBlockchain";
import { verifySignature } from "../../cryptography/verifySignature";
import { getKnownNodes } from "../../networking/getKnownNodes";
import { TransactionInfo } from "../TransactionInfo";
import { evaluateMove } from "../../games/ticTacToe/evaluateMove";
import { getBoardState } from "../../games/ticTacToe/getBoardState";

export const verifyMoveInfo = async (info) => {
  const blockchain = await getBlockchain();
  let gameFound = false;
  let gameAccepted = false;
  let signature = info.parameterList[3];
  let opponentPublicKey;

  for (let block of blockchain.blocks) {
    if (
      (block.transactionInfo.transactionType === "create_game") &
      (block.transactionInfo.parameterList[6] === info.parameterList[2])
    ) {
      gameFound = true;
      opponentPublicKey = block.transactionInfo.parameterList[4];
      // break;
    }
    if (
      (block.transactionInfo.transactionType === "accept_game") &
      (block.transactionInfo.parameterList[0] === info.parameterList[2])
    ) {
      if (
        !verifySignature(
          block.transactionInfo.parameterList[0],
          opponentPublicKey
        )
      ) {
        return false;
      }
      gameAccepted = true;
    }
  }

  if (!gameFound) {
    return false;
  }

  if (!gameAccepted) {
    return false;
  }

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

  const signatureString = info.parameterList
    .slice(0, info.parameterList.length - 1)
    .join(",");

  if (!verifySignature(signatureString, publicKey, signature)) return false;
  const boardState = await getBoardState(info.parameterList[2]);

  return await evaluateMove(
    info.parameterList[1],
    info.parameterList[0],
    boardState
  );
};
