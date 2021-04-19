import { getBoardState } from "./getBoardState";
import { identifyEnd } from "./identifyEnd";

export const evaluateMove = async (playerIP, move, boardState) => {
  // let boardState = await getBoardState(gameID);
  if (boardState === []) return false;

  if (boardState[0] !== playerIP) return false;
  if ((await identifyEnd(boardState[1])) !== null) return false;

  for (let i = 0; i < move.length; i++) {
    if (move.charAt(i) !== ".") {
      if (boardState[1][i][parseInt(move.charAt(i))] !== "E") {
        return false;
      }
    }
  }

  return true;
};
