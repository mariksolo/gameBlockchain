const crypto = require("crypto");
import { Block } from "./Block";
import { getBlockchain } from "./getBlockchain";

export const createBlock = async (info) => {
  const blockchain = await getBlockchain();
  const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
  const blockchainString = lastBlock.createBlockString();

  let nonce = 0;
  let hash = crypto
    .createHash("sha256")
    .update(blockchainString + nonce)
    .digest("base64");

  while (!hash.includes("aaa")) {
    nonce++;
    hash = crypto
      .createHash("sha256")
      .update(blockchainString + nonce)
      .digest("base64");
    // console.log(nonce);
    
  }

  const block = new Block(hash, nonce, info);
    console.log(block);
  return block;
};
