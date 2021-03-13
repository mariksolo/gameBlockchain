const express = require("express");
const crypto = require("crypto");

import { verifyBlockHash } from "./blockchain/verifyBlockHash";
import { createBlock } from "./blockchain/createBlock";
import { addBlock } from "./blockchain/addBlock";
import { generateKeyPair } from "./cryptography/generateKeyPair";
import { Block } from "./blockchain/Block";
import { createCreateAccountInfo } from "./transactions/infoCreators/createCreateAccountInfo";
import { getBlockchain } from "./blockchain/getBlockchain";
import { getKnownNodes } from "./networking/getKnownNodes";
import { KnownNode } from "./networking/getKnownNodes";
import { verifyCreateAccountInfo } from "./transactions/verifyInfo/verifyCreateAccountInfo";
import { initializeNode } from "./init/initializeNode";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // createCreateAccountInfo().then((info) => {
    
  //   verifyCreateAccountInfo(info).then((result) => {
  //     if (result) {
  //       createBlock(info).then((block) => {
  //         addBlock(block);
  //       });
  //     }
  //   });
  // });
  initializeNode();
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
