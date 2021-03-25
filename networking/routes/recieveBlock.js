const express = require("express");
let router = express.Router();
import { parseBlock } from "../../blockchain/parseBlock";
import { verifyBlockHash } from "../../blockchain/verifyBlockHash";
import { verifyCreateAccountInfo } from "../../transactions/verifyInfo/verifyCreateAccountInfo";
import { addBlock } from "../../blockchain/addBlock";
import { addKnownNode } from "../addKnownNode";

router.post("/", async (req, res) => {
  console.log("block recieved");

  const proposedBlock = parseBlock(req.body["block"]);

  const verifiedHash = await verifyBlockHash(proposedBlock);
  const verifiedInfo = await verifyCreateAccountInfo(proposedBlock.transactionInfo);
  res.send("hi");
  console.log(req);
  
  if (verifiedHash && verifiedInfo) {
    addBlock(proposedBlock);
    // const infoObject = parseInfoString(proposedBlock.transactionInfo);
    addKnownNode(proposedBlock.transactionInfo.parameterList[0], proposedBlock.transactionInfo.parameterList[1]);
  }
});

// export { router };
module.exports = router;
