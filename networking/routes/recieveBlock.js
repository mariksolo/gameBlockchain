const express = require("express");
let router = express.Router();
import { parseBlock } from "../../blockchain/parseBlock";
import { verifyBlockHash } from "../../blockchain/verifyBlockHash";
import { verifyCreateAccountInfo } from "../../transactions/verifyInfo/verifyCreateAccountInfo";
import { addBlock } from "../../blockchain/addBlock";
import { addKnownNode } from "../addKnownNode";
import { verifyStartGameInfo } from "../../transactions/verifyInfo/verifyStartGameInfo";
import { verifyAcceptGameInfo } from "../../transactions/verifyInfo/verifyAcceptGameInfo";
import { verifyMoveInfo } from "../../transactions/verifyInfo/verifyMoveInfo";
import { verifyDeclareEndInfo } from "../../transactions/verifyInfo/verifyDeclareEndInfo";

router.post("/", async (req, res) => {
  console.log("block recieved");

  const proposedBlock = parseBlock(req.body["block"]);

  const verifiedHash = await verifyBlockHash(proposedBlock);
  if (!verifiedHash) {
    res.send("Block rejected");
    return;
  }

  let verifiedInfo;

  switch (proposedBlock.transactionInfo.transactionType) {
    case "create_account":
      verifiedInfo = await verifyCreateAccountInfo(proposedBlock.transactionInfo);
      break;
    case "create_game":
      verifiedInfo = await verifyStartGameInfo(proposedBlock.transactionInfo);
      break;
    case "accept_game":
      verifiedInfo = await verifyAcceptGameInfo(proposedBlock.transactionInfo);
      break;
    case "move":
      verifiedInfo = await verifyMoveInfo(proposedBlock.transactionInfo);
      break;
    case "declare_end":
      verifiedInfo = await verifyDeclareEndInfo(proposedBlock.transactionInfo);
      break;
    default:
      res.send("Block has invalid transaction type");
      return;
  }
  console.log(proposedBlock);
  if (verifiedInfo) {
    addBlock(proposedBlock);
  } else {
    console.log("Incorrect info");
    res.send("Incorrect info");
    return;
  }

  if (proposedBlock.transactionInfo.transactionType === "create_account") {
    addKnownNode(proposedBlock.transactionInfo.parameterList[0], proposedBlock.transactionInfo.parameterList[1]);
  }

  res.send("Added block");
  console.log("Added block");

  // const verifiedInfo = await verifyCreateAccountInfo(proposedBlock.transactionInfo);
  // res.send("hi");
  // console.log(req);
  
  // if (verifiedHash && verifiedInfo) {
  //   addBlock(proposedBlock);
  //   // const infoObject = parseInfoString(proposedBlock.transactionInfo);
  //   addKnownNode(proposedBlock.transactionInfo.parameterList[0], proposedBlock.transactionInfo.parameterList[1]);
  // }
});

// export { router };
module.exports = router;
