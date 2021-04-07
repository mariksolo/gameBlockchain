const crypto = require("crypto");
import { Block } from "./Block";
import { getBlockchain } from "./getBlockchain";

export const createBlock = async (info) => {
  const blockchain = await getBlockchain();
  const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
  const blockchainString = lastBlock.createBlockString();

  const hash = crypto
    .createHash("sha256")
    .update(blockchainString)
    .digest("base64");
//   console.log(Math.floor(new Date().getTime() / 1000));
  const block = new Block(
    hash,
    Math.floor(new Date().getTime() / 1000),
    info
  );
//   console.log(block);
  return block;
};
