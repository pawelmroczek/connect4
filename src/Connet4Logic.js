function* iterFours(board, sizeX, sizeY) {
  for (let nRow = 0; nRow < sizeY; nRow++) {
    for (let startColumn = 0; startColumn < sizeX - 3; startColumn++) {
      yield board[nRow].slice(startColumn, startColumn + 4);
    }
  }

  for (let nColumn = 0; nColumn < sizeX; nColumn++) {
    for (let startRow = 0; startRow < sizeY - 3; startRow++) {
      const four = [];
      for (let nRow = startRow; nRow < startRow + 4; nRow++) {
        four.push(board[nRow][nColumn]);
      }
      yield four;
    }
  }

  for (let nRow = 0; nRow < sizeY - 3; nRow++) {
    for (let nColumn = 0; nColumn < sizeX - 3; nColumn++) {
      const decreasingDiagonal = [];
      const increasingDiagonal = [];
      for (let i = 0; i < 4; i++) {
        decreasingDiagonal.push(board[nRow + i][nColumn + i]);
        increasingDiagonal.push(board[nRow + i][sizeX - 1 - nColumn - i]);
      }
      yield decreasingDiagonal;
      yield increasingDiagonal;
    }
  }
}

export const decideMove = (board, sizeX, sizeY, depth, currentPlayer) => {

  console.log(board);

  let move = AlphaBeta(
    board,
    sizeX,
    sizeY,
    depth,
    currentPlayer,
    true,
    -Infinity,
    Infinity,
    currentPlayer
  ).best_column;
  console.log(move);

  return move;
};

export const CheckGameOver = (board, sizeX, sizeY) => {
  const checkGameOver = () => {

    for (const four of iterFours(board, sizeX, sizeY)) {
      if (four.every((cell) => cell === 1)) {
        return true;
      } else if (four.every((cell) => cell === 2)) {
        return true;
      }
    }
    return false;
  };

  return checkGameOver();
};

export const CheckDraft = (board, sizeX, sizeY) => {
  for (let i = 0; i < sizeY; i++) {
    for (let j = 0; j < sizeX; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
};

const PossibleDrops = (board, sizeX, sizeY) => {
  let drops = [];
  for (let i = 0; i < sizeX; i++) {
    if (board[0][i] === 0) {
      drops.push(i);
    }
  }

  return drops;
};


const drop_token = (board, n_column, sizeY, currentPlayer) => {
  let n_row = 0;
  while (n_row + 1 < sizeY && board[n_row + 1][n_column] === 0) {
    n_row += 1;
  }

  board[n_row][n_column] = currentPlayer;
};

const undo_drop = (board, n_column, sizeY) => {
  let n_row = 0;
  while (n_row < sizeY && board[n_row][n_column] === 0) {
    n_row += 1;
  }

  board[n_row][n_column] = 0;
}

const AlphaBeta = (
  board,
  sizeX,
  sizeY,
  depth,
  currentPlayer,
  maximizing_player,
  alpha,
  beta,
  my_token
) => {
  if (depth === 0 || CheckGameOver(board, sizeX, sizeY)) {
    return {
      evaluate: evaluate(board, my_token, sizeX, sizeY),
      best_column: null,
    };
  }

  let best_eval;
  let best_column;

  if (maximizing_player) {
    best_eval = -Infinity;
    for (let column of PossibleDrops(board, sizeX, sizeY)) {
      drop_token(board, column, sizeY, currentPlayer);
      let evaluation = AlphaBeta(
        board,
        sizeX,
        sizeY,
        depth - 1,
        currentPlayer === 1 ? 2 : 1,
        false,
        alpha,
        beta,
        my_token
      ).evaluate;
      undo_drop(board, column, sizeY);
      if (evaluation > best_eval) {
        best_eval = evaluation;
        best_column = column;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
  } else {
    best_eval = Infinity;
    for (let column of PossibleDrops(board, sizeX, sizeY)) {
      drop_token(board, column, sizeY, currentPlayer);
      let evaluation = AlphaBeta(
        board,
        sizeX,
        sizeY,
        depth - 1,
        currentPlayer === 1 ? 2 : 1,
        true,
        alpha,
        beta,
        my_token
      ).evaluate;
      undo_drop(board, column, sizeY);
      if (evaluation < best_eval) {
        best_eval = evaluation;
        best_column = column;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
  }

  return { best_column: best_column, evaluate: best_eval };
};


const evaluate = (board, my_token, sizeX, sizeY) => {
  const opponent_token = my_token === 1 ? 2 : 1;

  let token_wins = 0;
  let opponent_wins = 0;

  const count = (array, value) => {
    return array.filter(cell => cell === value).length;
  };

  for (const four of iterFours(board, sizeX, sizeY)) {
    if (count(four, my_token) === 4) { 
      return 1000;
    } else if (count(four, opponent_token) === 4) { 
      return -1000;
    }

    if (count(four, my_token) === 3 && count(four, 0) === 1) {
      token_wins += 100;
    } else if (count(four, my_token) === 2 && count(four, 0) === 2) {
      token_wins += 10;
    }

    if (count(four, opponent_token) === 3 && count(four, 0) === 1) {
      opponent_wins += 100;
    } else if (count(four, opponent_token) === 2 && count(four, 0) === 2) {
      opponent_wins += 10;
    }
  }

  let value = token_wins - opponent_wins;

  if (value > 1000) {
    value= 999;
  }else if (value < -1000) {
    value= -999;
  }

  return value;
};

