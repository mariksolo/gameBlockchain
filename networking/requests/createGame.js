import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createStartGameInfo } from "../../transactions/infoCreators/createStartGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";
import { floodNetwork } from "../floodNetwork";
import { getInitNodeIP } from "../getInitNodeIP";
import { requestBlockchain } from "./requestBlockchain";

export const createGame = async (opponentIP, startingTeam) => {
  await requestBlockchain();

  const startGameInfo = await createStartGameInfo(opponentIP, startingTeam);
  const block = await createBlock(startGameInfo);

  await floodNetwork({ block: block.createBlockString() }, "blocks", "127.0.0.1");

  await requestBlockchain();
  
};
