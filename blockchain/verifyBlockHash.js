import { getBlockchain } from "./getBlockchain";
const crypto = require('crypto');

// TODO add optional parameter to verify blocks in middle of chain
export const verifyBlockHash = async (block) => {
  const blockchain = await getBlockchain();
  const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
  const blockchainString = lastBlock.prevHash + lastBlock.timestamp + lastBlock.transactionInfo;
  const hash = crypto.createHash('sha256').update(blockchainString).digest('base64');

  if (hash == block.prevHash) {
      return true;
  } else {
      return false;
  }
};
