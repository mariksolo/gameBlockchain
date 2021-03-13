const crypto = require("crypto");
import { Block } from "./Block";
import { getBlockchain } from "./getBlockchain";

export const createBlock = async (infoString) => {
  const blockchain = await getBlockchain();
  const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
  const blockchainString =
    lastBlock.prevHash + lastBlock.timestamp + lastBlock.transactionInfo;

  const hash = crypto
    .createHash("sha256")
    .update(blockchainString)
    .digest("base64");
//   console.log(Math.floor(new Date().getTime() / 1000));
  const block = new Block(
    hash,
    Math.floor(new Date().getTime() / 1000),
    infoString
  );
//   console.log(block);

  return block;
};
