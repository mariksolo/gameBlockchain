import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createStartGameInfo } from "../../transactions/infoCreators/createStartGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";
import { floodNetwork } from "../floodNetwork";
import { getInitNodeIP } from "../getInitNodeIP";
import { requestBlockchain } from "./requestBlockchain";

export const createGame = async (opponentIP, startingTeam) => {
  const initNodeIP = await initNodeIP();
  const startGameInfo = await createStartGameInfo(opponentIP, startingTeam);
  const block = await createBlock(startGameInfo);
  // await sendJson(
  //   { block: block.createBlockString() },
  //   3000,
  //   "/blocks",
  //   "127.0.0.1"
  // );
  console.log("createGame");
  console.log(block);
  console.log(block.createBlockString());
  await floodNetwork({ block: block.createBlockString() }, "blocks", "127.0.0.1");
  // const blockchain = await sendJson({}, 3000, "/blockchain", initNodeIP);
  // setBlockchain(blockchain.data);
  await requestBlockchain();
  
};
