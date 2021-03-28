import * as fs from "fs";

export const setBlockchain = (blockchain) => {
  let blockchainString = "";
  for (let block of blockchain.blocks) {
    blockchainString += block.prevHash + "]";
    blockchainString += block.timestamp + "]";
    blockchainString += block.transactionInfo.infoString + "]\n";
  }
  fs.writeFile("blockchain.txt", blockchainString, (err) => {
    if (err) throw err;
  });
};
