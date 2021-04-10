import { generateKeyPair } from "../cryptography/generateKeyPair";
import { createCreateAccountInfo } from "../transactions/infoCreators/createCreateAccountInfo";
import { createBlock } from "../blockchain/createBlock";
import { sendJson } from "../networking/sendJson";
import { setBlockchain } from "../blockchain/setBlockchain";
import { setKnownNodes } from "../networking/setKnownNodes";
import { addBlock } from "../blockchain/addBlock";
import { getBlockchain } from "../blockchain/getBlockchain";
import { readFile, writeFile } from "fs";

export const initializeInitNode = async () => {
  console.log("init node initialization");
  await generateKeyPair();

  let ip = await new Promise((resolve, reject) => {
    readFile("IP.txt", "utf8", (err, key) => {
      if (err) throw err;
      resolve(key);
    });
  });

  const publicKey = await new Promise((resolve, reject) => {
    readFile("publicKey.txt", "utf8", (err, key) => {
      if (err) console.error(err);
      resolve(key);
    });
  });

  await new Promise((resolve, reject) => {
    writeFile("knownNodes.txt", ip + "]" + publicKey + "]", (err) => {
      if (err) throw err;
      resolve();
    });
  });

  await new Promise((resolve, reject) => {
    writeFile("blockchain.txt", "VHClQf4JVh2b37/YTLzLmv+P9u3P3F2fkYU+41pmb+8=]1615673714]initial node]", (err) => {
      if (err) throw err;
      resolve();
    });
  });
  const createAccountInfo = await createCreateAccountInfo();
  const block = await createBlock(createAccountInfo);
  await addBlock(block);
};
