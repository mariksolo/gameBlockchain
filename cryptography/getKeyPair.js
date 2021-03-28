import * as fs from "fs";

export const getKeyPair = async () => {
  const publicKey = await new Promise((resolve, reject) => {
    fs.readFile("publicKey.txt", "utf8", (err, key) => {
      if (err) console.error(err);
      resolve(key);
    });
  });

  const privateKey = await new Promise((resolve, reject) => {
    fs.readFile("privateKey.txt", "utf8", (err, key) => {
      if (err) console.error(err);
      resolve(key);
    });
  });

  return [publicKey, privateKey];
};
