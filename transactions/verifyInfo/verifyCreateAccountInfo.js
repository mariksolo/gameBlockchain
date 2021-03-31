import { getKnownNodes } from "../../networking/getKnownNodes";
import { KnownNode } from "../../networking/getKnownNodes";
import { getBlockchain } from "../../blockchain/getBlockchain";

export const verifyCreateAccountInfo = async (info) => {
  console.log("verify 1");
  if (info.transactionType !== "create_account") {
    return false;
  }

  if (info.parameterList.length !== 2) {
    return false;
  }
  // const knownNodes = await getKnownNodes();
  // for (let i = 0; i < knownNodes.length; i++) {
  //   if (knownNodes[i].key === info.parameterList[1]) {
  //     return false;
  //   }
  // }

  console.log("verify 2");
  let blockchain = await getBlockchain();
  for (let i = 0; i < blockchain.blocks.length; i++) {
    // console.log(blockchain.blocks[i]);
    if (
      blockchain.blocks[i].transactionInfo.parameterList[1] ===
      info.parameterList[1]
    ) {
      console.log("verify 3");
      console.log(blockchain.blocks[i].transactionInf);
      console.log(info.parameterList[1]);
      return false;
    }
  }

  return true;
};
