import { generateKeyPair } from "../cryptography/generateKeyPair";
import { createCreateAccountInfo } from "../transactions/infoCreators/createCreateAccountInfo";
import { createBlock } from "../blockchain/createBlock";

export const initializeNode = async () => {
  await generateKeyPair();
  const createAccountInfo = await createCreateAccountInfo();
  const block = await createBlock(createAccountInfo);
  console.log(block);
};
