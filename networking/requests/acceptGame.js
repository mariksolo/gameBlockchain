import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createAcceptGameInfo } from "../../transactions/infoCreators/createAcceptGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";
import { floodNetwork } from "../floodNetwork";
import { getInitNodeIP } from "../getInitNodeIP";
import { requestBlockchain } from "./requestBlockchain";

export const acceptGame = async (gameID) => {
  // const initNodeIP = await initNodeIP();
  const acceptGameInfo = await createAcceptGameInfo(gameID);
  const block = await createBlock(acceptGameInfo);
  // await sendJson(
  //   { block: block.createBlockString() },
  //   3000,
  //   "/blocks",
  //   "127.0.0.1"
  // );
  await floodNetwork({ block: block.createBlockString() }, "blocks", "127.0.0.1");
  
  // const blockchain = await sendJson({}, 3000, "/blockchain", initNodeIP);
  // // TODO ^^ replace things here with general consensus function/system
  // setBlockchain(blockchain.data);
  await requestBlockchain();
};
