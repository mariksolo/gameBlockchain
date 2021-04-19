import { generateKeyPair } from "../cryptography/generateKeyPair";
import { createCreateAccountInfo } from "../transactions/infoCreators/createCreateAccountInfo";
import { createBlock } from "../blockchain/createBlock";
import { sendJson } from "../networking/sendJson";
import { setBlockchain } from "../blockchain/setBlockchain";
import { setKnownNodes } from "../networking/setKnownNodes";
import { getInitNodeIP } from "../networking/getInitNodeIP";

export const initializeNode = async () => {
  const initNodeIP = await getInitNodeIP();

  console.log("regular init");

  let blockchain = await sendJson({}, 3000, "/blockchain", initNodeIP); // Normally IP of init node
  await setBlockchain(blockchain.data);
  // setKnownNodes(blockchain.data);
  
  await generateKeyPair();
  const createAccountInfo = await createCreateAccountInfo();
  console.log(createAccountInfo);
  const block = await createBlock(createAccountInfo);
  console.log(block);
  await sendJson(
    { block: block.createBlockString() },
    3000,
    "/blocks",
    initNodeIP // normally IP of init node
  );
  blockchain = await sendJson({}, 3000, "/blockchain", initNodeIP); // normally IP of init node
  // console.log(blockchain.data);
  setBlockchain(blockchain.data);
  setKnownNodes(blockchain.data);
};
