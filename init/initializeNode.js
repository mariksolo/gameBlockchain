import { generateKeyPair } from "../cryptography/generateKeyPair";
import { createCreateAccountInfo } from "../transactions/infoCreators/createCreateAccountInfo";
import { createBlock } from "../blockchain/createBlock";
import { sendJson } from "../networking/sendJson";
import { setBlockchain } from "../blockchain/setBlockchain";
import { setKnownNodes } from "../networking/setKnownNodes";

export const initializeNode = async () => {
  await generateKeyPair();
  const createAccountInfo = await createCreateAccountInfo();
  const block = await createBlock(createAccountInfo);
  console.log(block);
  await sendJson(
    { block: block.createBlockString() },
    3000,
    "/blocks",
    "3.95.161.139"
  );
  const blockchain = await sendJson({}, 3000, "/blockchain", "3.95.161.139");
  console.log(blockchain.data);
  setBlockchain(blockchain.data);
  setKnownNodes(blockchain.data);
};
