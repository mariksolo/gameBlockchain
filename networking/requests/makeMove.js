import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createMoveInfo } from "../../transactions/infoCreators/createMoveInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";

export const makeMove = async (gameID, move) => {
    const moveInfo = await createMoveInfo(gameID, move);
    const block = await createBlock(moveInfo);
    await sendJson(
        { block: block.createBlockString() },
        3000,
        "/blocks",
        "3.95.161.139"
      );
      const blockchain = await sendJson({}, 3000, "/blockchain", "3.95.161.139");
      setBlockchain(blockchain.data);
      
}