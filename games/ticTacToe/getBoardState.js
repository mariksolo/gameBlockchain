import { getBlockchain } from "../../blockchain/getBlockchain";

export const getBoardState = async (gameID) => {
  console.log("get board state");
  const blockchain = await getBlockchain();
  let gameFound = false;
  let player1;
  let player2;
  let player1Role;
  let player2Role;

  let board = [
    ["E", "E", "E"],
    ["E", "E", "E"],
    ["E", "E", "E"],
  ];
  let nextTurn;
  for (let block of blockchain.blocks) {
    if (block.transactionInfo.transactionType === "create_game" && block.transactionInfo.parameterList[6] === gameID) {
      console.log("game found")
      gameFound = true;
      player1 = block.transactionInfo.parameterList[3];
      player1Role = block.transactionInfo.parameterList[1];
      player2 = block.transactionInfo.parameterList[5];
      if (player1Role === "X") {
        player2Role = "O";
      } else {
        player2Role = "X";
      }
    } else if (block.transactionInfo.transactionType === "move" && block.transactionInfo.parameterList[2] === gameID) {
      console.log("move found");
      for (let i = 0; i < block.transactionInfo.parameterList[0].length; i++) {
        console.log(block.transactionInfo.parameterList[0].charAt(i));
        if (block.transactionInfo.parameterList[0].charAt(i) !== ".") {
          let mark;
          if (block.transactionInfo.parameterList[1] === player1) {
            mark = player1Role;
            nextTurn = player2;
          } else if (block.transactionInfo.parameterList[1] === player2) {
            mark = player2Role;
            nextTurn = player1;
          }
          board[i][
            parseInt(block.transactionInfo.parameterList[0].charAt(i))
          ] = mark;
        }
      }
    }
  }
  if (!nextTurn)
    return []
    
  return [nextTurn, board];
};
