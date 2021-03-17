const express = require("express");
let router = express.Router();
import { parseBlock } from "../../blockchain/parseBlock";
import { verifyBlockHash } from "../../blockchain/verifyBlockHash";
import { verifyCreateAccountInfo } from "../../transactions/verifyInfo/verifyCreateAccountInfo";
import { addBlock } from "../../blockchain/addBlock";
router.post("/", async (req, res) => {
  console.log("block recieved");
  const proposedBlock = parseBlock(req.body["block"]);
  const verifiedHash = await verifyBlockHash(proposedBlock);
//   console.log(verifiedHash);
  const verifiedInfo = await verifyCreateAccountInfo(proposedBlock.transactionInfo);
//   console.log(verifiedInfo);
  res.send("hi");
  if (verifiedHash && verifiedInfo) {
    addBlock(proposedBlock);
  }
});

// export { router };
module.exports = router;
