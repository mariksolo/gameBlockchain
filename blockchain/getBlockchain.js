import { readFile } from "fs";
import { Block } from "./Block";
import { Blockchain } from "./Blockchain";
import { TransactionInfo } from "../transactions/TransactionInfo";
import { parseInfoString } from "../transactions/parseInfoString";

export const getBlockchain = async () => {
  const blockchain = new Promise((resolve, reject) => {
    readFile("blockchain.txt", "utf8", (err, data) => {
      if (err) throw err;

      let block;
      let str = "";
      let prevHash;
      let timestamp;
      let info;
      let strCount = 0;
      let blockchain = new Blockchain([]);
      let infoObject;

      for (let i = 0; i < data.length; i++) {
        if (data[i] == "]") {
          switch (strCount) {
            case 0:
              prevHash = str;
              str = "";
              strCount++;
              break;
            case 1:
              timestamp = str;
              str = "";
              strCount++;
              break;
            case 2:
              info = str;
              strCount = 0;
              str = "";
              infoObject = parseInfoString(info);
              block = new Block(prevHash, timestamp, infoObject);
              blockchain.blocks.push(block);
              // console.log("pushing block");
              // console.log(block);
              break;
          }
        } else if (!(data[i] == "\n" && data[i-1] == "]")) {
          str += data[i];
        }
      }

      resolve(blockchain);
    });
  });

  return blockchain;
};
