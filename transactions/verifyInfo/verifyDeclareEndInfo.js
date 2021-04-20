import { getBlockchain } from "../../blockchain/getBlockchain";
import { getBoardState } from "../../games/ticTacToe/getBoardState";
import { identifyEnd } from "../../games/ticTacToe/identifyEnd";

export const verifyDeclareEndInfo = async (info) => {

  if (info.transactionType !== "declare_end") {
    return false;
  }

  if (info.parameterList.length !== 2) {
    return false;
  }

  const boardState = await getBoardState(info.parameterList[0]);
  if (boardState === []) return false;

  const board = boardState[1];
  const nextTurn = boardState[0];
  const winner = await identifyEnd(board);
  if (winner === null) {
    return false;
  }

  return true;




  // const blockchain = await getBlockchain();
  // let gameFound = false;
  // let starterIP;
  // let opponentIP;
  // for (let block of blockchain.blocks) {
  //   if (block.transactionInfo.parameterList[6] === info.parameterList[0]) {
  //     starterIP = block.transactionInfo.parameterList[3];
  //     opponentIP = block.transactionInfo.parameterList[5];
  //     gameFound = true;
  //     break;
  //   }
  // }

  // if (!gameFound) {
  //   return false;
  // }

  // if (
  //   starterIP === info.parameterList[1] ||
  //   opponentIP === info.parameterList[1]
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }
};
