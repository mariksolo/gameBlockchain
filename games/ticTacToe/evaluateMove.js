import { getBoardState } from "./getBoardState";

export const evaluateMove = async (gameID, playerIP, move, boardState) => {
  // let boardState = await getBoardState(gameID);
  if (boardState === []) return false;

  if (boardState[0] !== playerIP) return false;

  for (let i = 0; i < move.length; i++) {
    if (move.charAt(i) !== ".") {
      if (boardState[1][i][parseInt(move.charAt(i))] !== "E") {
        return false;
      }
    }
  }

  return true;
};
