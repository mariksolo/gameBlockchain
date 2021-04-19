const express = require("express");
let router = express.Router();
import { parseBlock } from "../../blockchain/parseBlock";
import { verifyBlockHash } from "../../blockchain/verifyBlockHash";
import { verifyCreateAccountInfo } from "../../transactions/verifyInfo/verifyCreateAccountInfo";
import { addBlock } from "../../blockchain/addBlock";
import { getBlockchain } from "../../blockchain/getBlockchain";

router.post("/", async (req, res) => {
  console.log("blockchain request recieved");
  const blockchain = await getBlockchain();
  res.send(blockchain);

});

// export { router };
module.exports = router;
