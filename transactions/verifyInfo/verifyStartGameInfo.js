import { TransactionInfo } from "../TransactionInfo";
import { getKnownNodes } from "../../networking/getKnownNodes";
import { verifySignature } from "../../cryptography/verifySignature";

export const verifyStartGameInfo = async (info) => {
  // IP matches public key in knownNodes, for creator and proposed opponent
  // Signature matches public key
  // Game and starting team are valid

  // TODO add more checks for syntax of info (FOR ALL VERIFIERS)

  if (info.transactionType !== "create_game") {
    console.log("transactionType is not create_game");
    return false;
  } else if (info.parameterList[0] !== "tic_tac_toe") {
    console.log("Invalid game");
    return false;
  } else if (
    (info.parameterList[1] !== "X") &
    (info.parameterList[1] !== "O")
  ) {
    console.log("Invalid team");
    return false;
  }

  const knownNodes = await getKnownNodes();
  let creatorIpMatchesKey = false;
  console.log("knkownNodes");
  console.log(knownNodes);
  for (let knownNode of knownNodes) {
    // console.log("knownNode.ip");
    // console.log(knownNode.ip);
    // console.log(info.parameterList[3]);
    // console.log("knownNode.key");
    // console.log(knownNode.key);
    // console.log(info.parameterList[2]);
    if (
      (knownNode.ip === info.parameterList[3]) &
      (knownNode.key === info.parameterList[2])
    ) {
      creatorIpMatchesKey = true;
      break;
    }
  }

  if (!creatorIpMatchesKey) {
    console.log("The IP does not match the key");
    return false;
  }

  let opponentIpMatchesKey = false;
  for (let knownNode of knownNodes) {
    if (
      (knownNode.ip === info.parameterList[5]) &
      (knownNode.key === info.parameterList[4])
    ) {
      opponentIpMatchesKey = true;
      break;
    }
  }

  if (!opponentIpMatchesKey) {
    console.log("The opponent IP does not match the key");
    return false;
  }

  const signatureParameters = [
    info.transactionType,
    ...info.parameterList.slice(0, info.parameterList.length - 1),
  ];
  const signatureString = signatureParameters.join(",");

  return verifySignature(
    signatureString,
    info.parameterList[2],
    info.parameterList[info.parameterList.length - 1]
  );
};
