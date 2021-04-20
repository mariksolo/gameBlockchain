import { Block } from "../../blockchain/Block";
import { parseBlock } from "../../blockchain/parseBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { verifyBlockchain } from "../../blockchain/verifyBlockchain";
import { parseInfoString } from "../../transactions/parseInfoString";
import { getKnownNodes } from "../getKnownNodes";
import { setKnownNodes } from "../setKnownNodes";
import { sendJson } from "../sendJson";

export const requestBlockchain = async (ignore = "") => {
  let chains = [];
  
  let knownNodes = await getKnownNodes();
  console.log("request Blockchain");
  
  for (let node of knownNodes) {
    if (node.ip === ignore) {
      console.log("skipping: " + ignore);
    } else if (node.ip.slice(0, 4) === "http") {
      chains.push((await sendJson({}, 3000, node.ip + "/blockchain")).data);
    } else {
      chains.push((await sendJson({}, 3000, "/blockchain", node.ip)).data);
    }
  }
  console.log(chains[0].blocks[0]);
  
  let longestChain = 0;
  let longestLength = 0;
  let blockString;
  let infoString;
  for (let i = 0; i < chains.length; i++) {
    for (let j = 0; j < chains[i].blocks.length; j++) {
      if (chains[i].blocks[j].transactionInfo.transactionType === "initial node") {
        infoString = "initial node";
      } else {
        infoString = chains[i].blocks[j].transactionInfo.transactionType + "," + chains[i].blocks[j].transactionInfo.parameterList.join(",");
      }
      
      console.log("info String: ");
      console.log(infoString);

      blockString = chains[i].blocks[j].prevHash + "]" + chains[i].blocks[j].timestamp + "]" + parseInfoString(infoString).createInfoString() + "]";
      chains[i].blocks[j] = parseBlock(blockString);
    }
    if (await verifyBlockchain(chains[i])) {
      console.log("Hashes are valid")
      if (chains[i].blocks.length > longestLength) {
        longestLength = chains[i].blocks.length;
        longestChain = i;
      }
    } else {
      console.log("Hashes are not valid");
    }
  }

  await setBlockchain(chains[longestChain]);
  await setKnownNodes(chains[longestChain]);
};
