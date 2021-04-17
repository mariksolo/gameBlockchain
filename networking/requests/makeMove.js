import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createMoveInfo } from "../../transactions/infoCreators/createMoveInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";
import { floodNetwork } from "../floodNetwork";
import { getInitNodeIP } from "../getInitNodeIP";
import { requestBlockchain } from "./requestBlockchain";

export const makeMove = async (gameID, move) => {
  const moveInfo = await createMoveInfo(gameID, move);
  const block = await createBlock(moveInfo);
 
  await floodNetwork({ block: block.createBlockString() }, "blocks", "127.0.0.1");
 
  await requestBlockchain();
};
