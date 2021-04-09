import { generateKeyPair } from "../cryptography/generateKeyPair";
import { createCreateAccountInfo } from "../transactions/infoCreators/createCreateAccountInfo";
import { createBlock } from "../blockchain/createBlock";
import { sendJson } from "../networking/sendJson";
import { setBlockchain } from "../blockchain/setBlockchain";
import { setKnownNodes } from "../networking/setKnownNodes";

export const initializeNode = async () => {
  // TODO modify so the first thing it does is get the blockchain and set it, before generating a creat_account block
  await generateKeyPair();
  const createAccountInfo = await createCreateAccountInfo();
  const block = await createBlock(createAccountInfo);
  console.log(block);
  await sendJson(
    { block: block.createBlockString() },
    3000,
    "/blocks",
    "54.144.196.153"
  );
  const blockchain = await sendJson({}, 3000, "/blockchain", "54.144.196.153");
  console.log(blockchain.data);
  setBlockchain(blockchain.data);
  setKnownNodes(blockchain.data);
};
