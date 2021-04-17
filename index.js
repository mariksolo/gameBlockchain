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
import { initializeInitNode } from "./init/initializeInitNode";
import { verifyStartGameInfo } from "./transactions/verifyInfo/verifyStartGameInfo";
import { createAcceptGameInfo } from "./transactions/infoCreators/createAcceptGameInfo";
import { verifyAcceptGameInfo } from "./transactions/verifyInfo/verifyAcceptGameInfo";
import { createMoveInfo } from "./transactions/infoCreators/createMoveInfo";
import { verifyMoveInfo } from "./transactions/verifyInfo/verifyMoveInfo";
import { createDeclareEndInfo } from "./transactions/infoCreators/createDeclareEndInfo";
import { verifyDeclareEndInfo } from "./transactions/verifyInfo/verifyDeclareEndInfo";
import { createGame } from "./networking/requests/createGame";
import { acceptGame } from "./networking/requests/acceptGame";
import { makeMove } from "./networking/requests/makeMove";
import { declareEnd } from "./networking/requests/declareEnd";
import { getBlockchain } from "./blockchain/getBlockchain";
import { setKnownNodes } from "./networking/setKnownNodes";
import { sendJson } from "./networking/sendJson";
import { setBlockchain } from "./blockchain/setBlockchain";
import { getInitNodeIP } from "./networking/getInitNodeIP";
import { verifyBlockchain } from "./blockchain/verifyBlockchain";
import { requestBlockchain } from "./networking/requests/requestBlockchain";
import { getBoardState } from "./games/ticTacToe/getBoardState";
import { evaluateMove } from "./games/ticTacToe/evaluateMove";

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
  // const boardState = await getBoardState("60b7ee20-03cd-43ed-b42a-2e2e51ecb651");
  // console.log(boardState);
  console.log(await evaluateMove("60b7ee20-03cd-43ed-b42a-2e2e51ecb651", "127.0.0.1", "1.."))

  res.send("Hi");
});

const initQuestion = {
  type: "confirm",
  name: "initialize",
  message: "Run init sequence?",
  default: false,
};

const initializeInitNodeQuestion = {
  type: "confirm",
  name: "initializeInitNode",
  message: "Run init sequence for init nodes?",
  default: false,
};

const actionQuestion = {
  type: "list",
  name: "action",
  message: "What would you like to do?",
  choices: [
    "create game",
    "accept game",
    "make move",
    "declare end",
    "query blockchain",
  ],
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
  .prompt([initQuestion, initializeInitNodeQuestion])
  .then(async (answers) => {
    if (answers.initialize) {
      initializeNode();
    } else if (answers.initializeInitNode) {
      initializeInitNode();
    }
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });

    while (true) {
      const answers = await inquirer.prompt([actionQuestion]);
      if (answers.action === "create game") {
        const secondAnswers = await inquirer.prompt(createGameQuestions);
        console.log(JSON.stringify(secondAnswers, null, "  "));
        console.log(secondAnswers["opponentIP"]);
        console.log(secondAnswers["starting team"].slice(0, 1));
        await createGame(
          secondAnswers["opponentIP"],
          secondAnswers["starting team"].slice(0, 1)
        );
      } else if (answers.action === "accept game") {
        const secondAnswers = await inquirer.prompt(acceptGameQuestions);
        console.log(JSON.stringify(secondAnswers, null, "  "));
        await acceptGame(secondAnswers["gameID"]);
      } else if (answers.action === "make move") {
        const secondAnswers = await inquirer.prompt(makeMoveQuestions);
        console.log("move");
        console.log(secondAnswers["placement"].join("."));
        // await makeMove(
        //   secondAnswers["gameID"],
        //   secondAnswers["placement"].join(".")
        // );
      } else if (answers.action === "declare end") {
        const secondAnswers = await inquirer.prompt(declareEndQuestions);
        console.log(JSON.stringify(secondAnswers, null, "  "));
        await declareEnd(secondAnswers["gameID"], secondAnswers["winner"]);
      } else if (answers.action === "query blockchain") {
        await requestBlockchain();
        const blockchain = await getBlockchain();
        setKnownNodes(blockchain);
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
