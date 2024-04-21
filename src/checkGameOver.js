import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectSizeX,
  selectSizeY,
  set_winner,
} from "./features/gameSlice";

const CheckGameOver = (board, sizeX, sizeY) => {
  function* iterFours() {
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

  const checkGameOver = () => {
    // if (!this.possibleDrops()) {
    //   this.wins = null; // tie
    //   return true;
    // }

    for (const four of iterFours()) {
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

export default CheckGameOver;
