import { appendFile } from "fs";

export const addBlock = (block) => {
  let blockString = "\n" + block.prevHash + "]" + block.timestamp + "]" + block.transactionInfo + "]";
  console.log(block);
  appendFile("blockchain.txt", blockString, (err) => {
    if (err) throw err;
    console.log("Added new block");
  });
};
