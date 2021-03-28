const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const inquirer = require("inquirer");

import { createSignature } from "./cryptography/createSignature";
import { verifySignature } from "./cryptography/verifySignature";
import { getKeyPair } from "./cryptography/getKeyPair";

let recieveBlock = require("./networking/routes/recieveBlock");
let queryBlockchain = require("./networking/routes/queryBlockchain");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser);
app.use("/blocks", recieveBlock);
app.use("/blockchain", queryBlockchain);

app.get("/", async (req, res) => {
  // floodNetwork({block: "VHClQf4JVh2b37/YTLzLmv+P9u3P3F2fkYU+41pmb+8=]1615673714]random info,randomvar,randomvar2]"}, "blocks");
  // sendJson("", 80, "https://game-blockchain-test.herokuapp.com/blockchain").then((blockchain) => {
  //   console.log(blockchain.data);
  // });
  // createCreateAccountInfo().then((accountInfo) => {
  //   createBlock(accountInfo).then((block) => {
  //     sendJson(
  //       { block: block.createBlockString() },
  //       3000,
  //       "/blocks",
  //       "127.0.0.1"
  //     ).then((response) => {
  //       console.log("done");
  //     });
  //   });
  // });
  const [publicKey, privateKey] = await getKeyPair();
  // console.log(publicKey);
  // console.log(privateKey);
  const signature = createSignature("Random info", privateKey);
  const result = verifySignature("Random info", publicKey, signature);
  console.log(result);
  res.send(result);
});

inquirer
  .prompt([
    {
      type: "confirm",
      name: "initialize",
      message: "Run init sequence?",
      default: false,
    },
  ])
  .then((answers) => {
    if (answers.initialize) {
      initializeNode();
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error(error);
    } else {
      // Something else went wrong
      console.error(error);
    }
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
