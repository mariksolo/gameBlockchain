import { readFile } from "fs";
import { KnownNode } from "./KnownNode";

export const getKnownNodes = async () => {
  const nodes = new Promise((resolve, reject) => {
    readFile("knownNodes.txt", "utf8", (err, data) => {
      if (err) throw err;

      let node;
      let str = "";
      let ip;
      let key;

      let strCount = 0;
      let knownNodes = [];
      

      for (let i = 0; i < data.length; i++) {
        if (data[i] == "]") {
          switch (strCount) {
            case 0:
              ip = str;
              str = "";
              strCount++;
              break;
            case 1:
              key = str;
              strCount = 0;
              str = "";
              node = new KnownNode(ip, key);
              knownNodes.push(node);
              break;
          }
        } else if (!(data[i] == "\n" && data[i-1] == "]")) {
          str += data[i];
        }
      }

      resolve(knownNodes);
    });
  });

  return nodes;
};
