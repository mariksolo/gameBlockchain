import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createAcceptGameInfo } from "../../transactions/infoCreators/createAcceptGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";

export const acceptGame = async (gameID) => {
    const acceptGameInfo = await createAcceptGameInfo(gameID);
    const block = await createBlock(acceptGameInfo);
    await sendJson(
        { block: block.createBlockString() },
        3000,
        "/blocks",
        "3.95.161.139"
      );
      const blockchain = await sendJson({}, 3000, "/blockchain", "3.95.161.139");
      setBlockchain(blockchain.data);
      
}