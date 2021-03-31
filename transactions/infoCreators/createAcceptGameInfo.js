import { getKeyPair } from "../../cryptography/getKeyPair";
import { TransactionInfo } from "../TransactionInfo";
import { createSignature } from "../../cryptography/createSignature";

export const createAcceptGameInfo = async (gameID) => {
  const [publicKey, privateKey] = await getKeyPair();
  const signature = createSignature(gameID, privateKey);
  const parameters = [gameID, signature];
  const info = new TransactionInfo("accept_game", parameters);
  return info;
};
