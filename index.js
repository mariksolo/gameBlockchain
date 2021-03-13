const express = require("express");
const crypto = require('crypto');

import { verifyBlockHash } from "./blockchain/verifyBlockHash";
import { createBlock } from "./blockchain/createBlock";
import { addBlock } from "./blockchain/addBlock";
import { generateKeyPair } from "./cryptography/generateKeyPair";
import { Block } from "./blockchain/Block";
import { createCreateAccountInfo } from "./transactions/infoCreators/createCreateAccountInfo";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // createBlock("random info").then((block) => {
  //   verifyBlockHash(block).then((isValid) => {
  //     console.log(block);
  //     if (isValid) {
  //       addBlock(block);
  //     }
  //   });
  // });
  createCreateAccountInfo().then((info) => {
    console.log(info);
  });
 
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
