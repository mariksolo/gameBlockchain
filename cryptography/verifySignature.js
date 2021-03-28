// const { generateKeyPairSync, createSign, createVerify } = import("crypto");
const crypto = require("crypto");

export const verifySignature = (data, publicKey, signature) => {
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(data);
  verify.end();
  return verify.verify(publicKey, signature);
};
