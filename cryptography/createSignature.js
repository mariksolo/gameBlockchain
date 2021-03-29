// const { createSign } = import("crypto");
const crypto = require("crypto");

export const createSignature = (data, privateKey) => {
  const privateKeyObject = crypto.createPrivateKey(privateKey);
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  sign.end();
  const signature = sign.sign(privateKeyObject, "hex");
  return signature;
};
