import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createStartGameInfo } from "../../transactions/infoCreators/createStartGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";

export const createGame = async (opponentIP, startingTeam) => {
  const startGameInfo = await createStartGameInfo(opponentIP, startingTeam);
  const block = await createBlock(startGameInfo);
  // await sendJson(
  //   { block: block.createBlockString() },
  //   3000,
  //   "/blocks",
  //   "127.0.0.1"
  // );
  await floodNetwork(block.createBlockString(), "blocks");
  const blockchain = await sendJson({}, 3000, "/blockchain", "127.0.0.1");
  setBlockchain(blockchain.data);
};
