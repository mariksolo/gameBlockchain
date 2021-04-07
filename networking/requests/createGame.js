import { createBlock } from "../../blockchain/createBlock";
import { setBlockchain } from "../../blockchain/setBlockchain";
import { createStartGameInfo } from "../../transactions/infoCreators/createStartGameInfo";
import { sendJson } from "../sendJson";
import { setKnownNodes } from "../setKnownNodes";

export const createGame = async (opponentIP, startingTeam) => {
    const startGameInfo = await createStartGameInfo(opponentIP, startingTeam);
    const block = await createBlock(startGameInfo);
    await sendJson(
        { block: block.createBlockString() },
        3000,
        "/blocks",
        "3.95.161.139"
      );
      const blockchain = await sendJson({}, 3000, "/blockchain", "3.95.161.139");
      setBlockchain(blockchain.data);
      
}