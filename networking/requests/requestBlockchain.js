import { setBlockchain } from "../../blockchain/setBlockchain";
import { verifyBlockchain } from "../../blockchain/verifyBlockchain";
import { getKnownNodes } from "../getKnownNodes";

export const requestBlockchain = async (ignore = "") => {
  let chains = [];
  
  let knownNodes = await getKnownNodes();
  for (let node of knownNodes) {
    if (node.ip === ignore) {
      console.log("skipping: " + ignore);
    } else if (node.ip.slice(0, 4) === "http") {
      chains.push(await sendJson({}, 3000, node.ip + "/blockchain"));
    } else {
      chains.push(await sendJson({}, 3000, "/blockchain", node.ip));
    }
  }

  let longestChain;
  let longestLength = 0;
  for (let i = 0; i < chains.length; i++) {
    if (await verifyBlockchain(chains[i])) {
      if (chains[i].blocks.length > longestLength) {
        longestLength = chains[i].blocks.length;
        longestChain = i;
      }
    }
  }

  await setBlockchain(chains[longestChain]);
};
