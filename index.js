const express = require("express");
const crypto = require("crypto");
const bodyParser = require('body-parser');

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
// import { recieveBlock } from "./routes/recieveBlock";
import { sendJson } from "./networking/sendJson";
let recieveBlock = require("./networking/routes/recieveBlock");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser);
app.use("/blocks", recieveBlock);

app.get("/", (req, res) => {
  // sendJson("127.0.0.1", "VHClQf4JVh2b37/YTLzLmv+P9u3P3F2fkYU+41pmb+8=]1615673714]random info,randomvar,randomvar2]");
  res.send("hi");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
