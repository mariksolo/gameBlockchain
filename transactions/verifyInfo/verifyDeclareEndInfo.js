import { getBlockchain } from "../../blockchain/getBlockchain";

export const verifyDeclareEndInfo = async (info) => {
  // TODO add check for actual rules of game

  if (info.transactionType !== "declare_end") {
    return false;
  }

  if (info.parameterList.length !== 2) {
    return false;
  }

  const blockchain = await getBlockchain();
  let gameFound = false;
  let starterIP;
  let opponentIP;
  for (let block of blockchain.blocks) {
    if (block.transactionInfo.parameterList[6] === info.parameterList[0]) {
      starterIP = block.transactionInfo.parameterList[3];
      opponentIP = block.transactionInfo.parameterList[5];
      gameFound = true;
      break;
    }
  }

  if (!gameFound) {
    return false;
  }

  if (
    starterIP === info.parameterList[1] ||
    opponentIP === info.parameterList[1]
  ) {
    return true;
  } else {
    return false;
  }
};
