import { verifyBlockHash } from "./verifyBlockHash";
import { Blockchain } from "./Blockchain";

export const verifyBlockchain = async (blockchain) => {
  if (
    blockchain.blocks[0].createBlockString() !==
    "VHClQf4JVh2b37/YTLzLmv+P9u3P3F2fkYU+41pmb+8=]1615673714]initial node]"
  ) {
    return false;
  }

  let blockchainSegment;
  for (let i = 1; i < blockchain.blocks.length; i++) {
    blockchainSegment = new Blockchain(blockchain.blocks.slice(0, i));
    if (
      !(await verifyBlockHash(
        blockchain.blocks[i],
        blockchainSegment
      ))
    ) {
      return false;
    }
  }

  return true;
};
