import { appendFile } from "fs";

export const addKnownNode = (ip, publicKey) => {
  console.log("in addKnownNode")
  appendFile("knownNodes.txt", "\n" + ip + "]" + publicKey + "]", (err) => {
    if (err) throw err;
    console.log("Added knownNode");
  });
};
