import { sendJson } from "./sendJson";
import { getKnownNodes } from "./getKnownNodes";
import { KnownNode } from "./KnownNode";

export const floodNetwork = async (data, endpoint, ignore = "") => {
  let knownNodes = await getKnownNodes();
  for (let node of knownNodes) {
    if (node.ip === ignore) {
      console.log("skipping: " + ignore);
    } else if (node.ip.slice(0, 4) === "http") {
      sendJson(data, 80, node.ip + "/" + endpoint);
    } else {
      sendJson(data, 80, "/" + endpoint, node.ip);
    }
  }
};
