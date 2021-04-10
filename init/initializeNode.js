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

  console.log("regular init");

  let blockchain = await sendJson({}, 3000, "/blockchain", "54.89.182.190");
  await setBlockchain(blockchain.data);
  // setKnownNodes(blockchain.data);
  
  // TODO figure out this weird bug where it appears to set the key pair after this function runs
  // await generateKeyPair();
  const createAccountInfo = await createCreateAccountInfo();
  console.log(createAccountInfo);
  const block = await createBlock(createAccountInfo);
  console.log(block);
  await sendJson(
    { block: block.createBlockString() },
    3000,
    "/blocks",
    "54.89.182.190"
  );
  blockchain = await sendJson({}, 3000, "/blockchain", "54.89.182.190");
  // console.log(blockchain.data);
  setBlockchain(blockchain.data);
  setKnownNodes(blockchain.data);
};
