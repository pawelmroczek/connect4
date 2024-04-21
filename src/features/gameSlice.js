import { createSlice, current } from "@reduxjs/toolkit";

const createEmptyBoard = (sizeX, sizeY) => {
  const board = [];
  for (let i = 0; i < sizeY; i++) {
    board.push(Array(sizeX).fill(0));
  }
  return board;
};

const gameSlice = createSlice({
  name: "game",
  initialState: {
    sizeX:7,
    sizeY:5,
    board: createEmptyBoard(7, 5),
    currentPlayer: 1,
  },
  reducers: {
    drop_token: (state, {payload: n_column}) => {
      let n_row = 0
      while (n_row + 1 < state.sizeY && state.board[n_row+1][n_column] == 0){
        n_row += 1
      }

      state.board[n_row][n_column] = state.currentPlayer
      
    }
  },
});

export const {
  
} = gameSlice.actions;

export const selectTasksState = (state) => state.tasks;



export default gameSlice.reducer;
