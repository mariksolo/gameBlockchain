import { TransactionInfo } from "../TransactionInfo";

export const createDeclareEndInfo = (gameID, winner) => {
  const info = new TransactionInfo("declare_end", [gameID, winner]);
  return info;
};
