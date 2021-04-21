import { getBlockchain } from "./getBlockchain";
const crypto = require('crypto');

export const verifyBlockHash = async (block, blockchain = null) => {
  // const blockchain = await getBlockchain();
  if (blockchain === null) {
    blockchain = await getBlockchain();
  }
  const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
  const blockchainString = lastBlock.createBlockString();
  const hash = crypto.createHash('sha256').update(blockchainString + block.nonce).digest('base64');

  if (hash === block.prevHash && block.prevHash.includes("aaa")) {
      return true;
  } else {
      return false;
  }
};
