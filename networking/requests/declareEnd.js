import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createDeclareEndInfo } from "../../transactions/infoCreators/createDeclareEndInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";

export const declareEnd = async (gameID, winner) => {
  const declareEndInfo = await createDeclareEndInfo(gameID, winner);
  const block = await createBlock(declareEndInfo);
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
