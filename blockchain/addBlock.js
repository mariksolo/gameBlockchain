import { appendFile } from "fs";

export const addBlock = async (block) => {
  
  let blockString = block.createBlockString();
  // console.log(block);
  appendFile("blockchain.txt", "\n" + blockString, (err) => {
    if (err) throw err;
    console.log("Added new block");
    return;
  });
};
