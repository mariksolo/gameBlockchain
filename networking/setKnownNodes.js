import { addKnownNode } from "./addKnownNode";
import { KnownNode } from "./KnownNode";
import { getKnownNodes } from "./getKnownNodes";

export const setKnownNodes = async (blockchain) => {
  const knownNodes = await getKnownNodes();

  for (let block of blockchain.blocks) {
    if (block.transactionInfo.transactionType === "create_account") {
      if (
        !knownNodes.some((knownNode) => {
          return knownNode.ip === block.transactionInfo.parameterList[0];
        })
      ) {
        addKnownNode(
          block.transactionInfo.parameterList[0],
          block.transactionInfo.parameterList[1]
        );
      }
    }
  }
};
