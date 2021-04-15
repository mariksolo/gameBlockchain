import { verifyBlockHash } from "./verifyBlockHash";
import { Blockchain } from "./Blockchain";

export const verifyBlockchain = async (blockchain) => {
  console.log("verify blockchain");
  console.log(blockchain.blocks[0]);
  console.log(blockchain.blocks[0].createBlockString());
  if (
    blockchain.blocks[0].createBlockString() !==
    "VHClQf4JVh2b37/YTLzLmv+P9u3P3F2fkYU+41pmb+8=]1615673714]initial node]"
  ) {
    console.log("First block is incorrect");
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
      console.log("A hash is wrong");
      return false;
    }
  }

  return true;
};
