import { addKnownNode } from "./addKnownNode";
import { KnownNode } from "./KnownNode";

// TODO add getIP and make it skip the create_account for itself
export const setKnownNodes = async (blockchain) => {
  for (let block of blockchain.blocks) {
    if (block.transactionInfo.transactionType === "create_account") {
        console.log(block.transactionInfo);
        console.log(block.transactionInfo.parameterList);
      addKnownNode(
        block.transactionInfo.parameterList[0],
        block.transactionInfo.parameterList[1]
      );
    }
  }
};
