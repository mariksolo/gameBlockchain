import NodeRSA from "node-rsa";
import * as fs from "fs";

export const generateKeyPair = () => {
  const key = new NodeRSA(({ b: 512 }));
  const publicKey = key.exportKey("pkcs1-public-pem");
  const privateKey = key.exportKey("pkcs1-private-pem");

  fs.writeFile("publicKey.txt", publicKey, (err) => {
    if (err) throw err;
  });

  fs.writeFile("privateKey.txt", privateKey, (err) => {
    if (err) throw err;
  });
};
