import { generateKeyPair } from "../cryptography/generateKeyPair";
import { createCreateAccountInfo } from "../transactions/infoCreators/createCreateAccountInfo";
import { createBlock } from "../blockchain/createBlock";
import { sendJson } from "../networking/sendJson";
import { setBlockchain } from "../blockchain/setBlockchain";
import { setKnownNodes } from "../networking/setKnownNodes";

export const initializeNode = async () => {
  // TODO modify so that it automatically sets first 2 knowNodes. First one should be init node,
  // second should be itself. Unless it is itself an init node, in which case there should only be one (itself).
  // That way, it confirms everything against itself?

  const blockchain = await sendJson({}, 3000, "/blockchain", "54.89.182.190");
  setBlockchain(blockchain.data);
  setKnownNodes(blockchain.data);
  
  await generateKeyPair();
  const createAccountInfo = await createCreateAccountInfo();
  const block = await createBlock(createAccountInfo);
  console.log(block);
  await sendJson(
    { block: block.createBlockString() },
    3000,
    "/blocks",
    "54.89.182.190"
  );
  const blockchain = await sendJson({}, 3000, "/blockchain", "54.89.182.190");
  console.log(blockchain.data);
  setBlockchain(blockchain.data);
  setKnownNodes(blockchain.data);
};
