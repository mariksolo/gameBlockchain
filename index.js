const express = require("express");

import { generateKeyPair } from "./cryptography/generateKeyPair";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  generateKeyPair();

  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
