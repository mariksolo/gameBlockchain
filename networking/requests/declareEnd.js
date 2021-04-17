import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createDeclareEndInfo } from "../../transactions/infoCreators/createDeclareEndInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";
import { floodNetwork } from "../floodNetwork";
import { getInitNodeIP } from "../getInitNodeIP";
import { requestBlockchain } from "./requestBlockchain";

export const declareEnd = async (gameID, winner) => {
  await requestBlockchain();

  const declareEndInfo = await createDeclareEndInfo(gameID, winner);
  const block = await createBlock(declareEndInfo);
 
  await floodNetwork({ block: block.createBlockString() }, "blocks", "127.0.0.1");

  await requestBlockchain();
};
