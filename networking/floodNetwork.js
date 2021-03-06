import { sendJson } from "./sendJson";
import { getKnownNodes } from "./getKnownNodes";
import { KnownNode } from "./KnownNode";

// No need for actual flooding, because every node is supposed to know every other node
// This allows for "private" networks to exist with node owners who trust each other
export const floodNetwork = async (data, endpoint, ignore = "") => {
  let knownNodes = await getKnownNodes();
  for (let node of knownNodes) {
    if (node.ip === ignore) {
      console.log("skipping: " + ignore);
    } else if (node.ip.slice(0, 4) === "http") {
      await sendJson(data, 3000, node.ip + "/" + endpoint);
    } else {
      await sendJson(data, 3000, "/" + endpoint, node.ip);
    }
  }
};
