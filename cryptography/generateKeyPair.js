// import NodeRSA from "node-rsa";
import * as fs from "fs";
import { generateKeyPair as generate } from "crypto";

export const generateKeyPair = async () => {
  // const key = new NodeRSA({ b: 512 });
  // const publicKey = key.exportKey("pkcs8-public-pem");
  // const privateKey = key.exportKey("pkcs8-private-pem");

  return new Promise ((resolve, reject) => {
    generate(
      "rsa",
      { modulusLength: 512 },
      async (err, publicKey, privateKey) => {
        let publicKeyString = publicKey.export({ format: "pem", type: "pkcs1" });
        let privateKeyString = privateKey.export({
          format: "pem",
          type: "pkcs1",
        });
        await new Promise((resolve2, reject) => {
          fs.writeFile(
            "publicKey.txt",
            publicKeyString.slice(0, publicKeyString.length - 1),
            (err) => {
              if (err) throw err;
              resolve2();
            }
          );
        });
  
        await new Promise((resolve2, reject) => {
          fs.writeFile(
            "privateKey.txt",
            privateKeyString.slice(0, privateKeyString.length - 1),
            (err) => {
              if (err) throw err;
              resolve2();
            }
          );
        });

        resolve();
      }
    );
  });
  
  

  // return;
};
