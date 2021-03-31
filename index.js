const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const inquirer = require("inquirer");
const inquirerTablePrompt = require("inquirer-table-prompt");

import { createSignature } from "./cryptography/createSignature";
import { verifySignature } from "./cryptography/verifySignature";
import { getKeyPair } from "./cryptography/getKeyPair";
import { createStartGameInfo } from "./transactions/infoCreators/createStartGameInfo";
import { addBlock } from "./blockchain/addBlock";
import { createBlock } from "./blockchain/createBlock";
import { initializeNode } from "./init/initializeNode";
import { verifyStartGameInfo } from "./transactions/verifyInfo/verifyStartGameInfo";
import { createAcceptGameInfo } from "./transactions/infoCreators/createAcceptGameInfo";
import { verifyAcceptGameInfo } from "./transactions/verifyInfo/verifyAcceptGameInfo";
import { createMoveInfo } from "./transactions/infoCreators/createMoveInfo";
import { verifyMoveInfo } from "./transactions/verifyInfo/verifyMoveInfo";
import { createDeclareEndInfo } from "./transactions/infoCreators/createDeclareEndInfo";
import { verifyDeclareEndInfo } from "./transactions/verifyInfo/verifyDeclareEndInfo";

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
  // const [publicKey, privateKey] = await getKeyPair();

  // const info = await createStartGameInfo("52.23.236.117", "X");
  // const block = await createBlock(info);
  // await addBlock(block);

  // const info2 = await createAcceptGameInfo(info.parameterList[6]);
  // console.log(await verifyAcceptGameInfo(info2));

  // const info = await createMoveInfo("dfb16c73-601f-4f08-843c-f59af043a2c7", "0.0");
  // const block = await createBlock(info);

  // const result = await verifyMoveInfo(block.transactionInfo);
  // console.log(result);

  // const info = await createDeclareEndInfo("dfb16c73-601f-4f08-843c-f59af043a2c7", "52.23.236.117");
  // const block = await createBlock(info);

  // const result = await verifyDeclareEndInfo(block.transactionInfo);
  // console.log(result);

  res.send("Hi");
});

const initQuestion = {
  type: "confirm",
  name: "initialize",
  message: "Run init sequence?",
  default: false,
};

const actionQuestion = {
  type: "list",
  name: "action",
  message: "What would you like to do?",
  choices: ["create game", "accept game", "make move", "declare end"],
};

const createGameQuestions = [
  {
    type: "input",
    name: "opponentIP",
    message: "What is your opponent's IP address?",
  },
  {
    type: "list",
    name: "starting team",
    message: "What is your starting side?",
    choices: ["X's", "O's"],
  },
];

const acceptGameQuestions = [
  {
    type: "input",
    name: "gameID",
    message: "What is the ID of the game?",
  },
];

const makeMoveQuestions = [
  {
    type: "input",
    name: "gameID",
    message: "What is the ID of the game?",
  },
  {
    type: "table",
    name: "placement",
    message: "Where do you move?",
    columns: [
      {
        name: "Col 1",
        value: 0,
      },
      {
        name: "Col 2",
        value: 1,
      },
      {
        name: "Col 3",
        value: 2,
      },
    ],
    rows: [
      {
        name: "Row 1",
        value: 0,
      },
      {
        name: "Row 2",
        value: 1,
      },
      {
        name: "Row 3",
        value: 2,
      },
    ],
  },
];

const declareEndQuestions = [
  {
    type: "input",
    name: "gameID",
    message: "What is the ID of the game?",
  },
  {
    type: "input",
    name: "winner",
    message: "What is the IP address of the winner?",
  },
];
inquirer.registerPrompt("table", inquirerTablePrompt);

inquirer
  .prompt([initQuestion])
  .then(async (answers) => {
    if (answers.initialize) {
      initializeNode();
    }
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });

    while (true) {
      const answers = await inquirer.prompt([actionQuestion]);
      if (answers.action === "create game") {
        const secondAnswers = await inquirer.prompt(createGameQuestions);
        console.log(JSON.stringify(secondAnswers, null, "  "));
      } else if (answers.action === "accept game") {
        const secondAnswers = await inquirer.prompt(acceptGameQuestions);
        console.log(JSON.stringify(secondAnswers, null, "  "));
      } else if (answers.action === "make move") {
        const secondAnswers = await inquirer.prompt(makeMoveQuestions);
        console.log(secondAnswers);
      } else if (answers.action === "declare end") {
        const secondAnswers = await inquirer.prompt(declareEndQuestions);
        console.log(JSON.stringify(secondAnswers, null, "  "));
      }
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
