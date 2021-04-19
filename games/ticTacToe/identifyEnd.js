export const identifyEnd = async (board) => {

  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "E" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    )
      winner = board[i][0];

    if (
      board[0][i] !== "E" &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    )
      winner = board[0][i];
  }

  if (
    board[0][0] !== "E" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  )
    winner = board[0][0];

  if (
    board[0][2] !== "E" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  )
    winner = board[0][2];

  return winner;
};
