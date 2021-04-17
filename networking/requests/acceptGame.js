import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createAcceptGameInfo } from "../../transactions/infoCreators/createAcceptGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";
import { floodNetwork } from "../floodNetwork";
import { getInitNodeIP } from "../getInitNodeIP";
import { requestBlockchain } from "./requestBlockchain";

export const acceptGame = async (gameID) => {
  await requestBlockchain();

  const acceptGameInfo = await createAcceptGameInfo(gameID);
  const block = await createBlock(acceptGameInfo);

  await floodNetwork(
    { block: block.createBlockString() },
    "blocks",
    "127.0.0.1"
  );

  await requestBlockchain();
};
