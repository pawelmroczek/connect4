import { createSlice } from "@reduxjs/toolkit";
import {CheckDraft, CheckGameOver, decideMove} from "../Connet4Logic";

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
    sizeX: 7,
    sizeY: 5,
    board: createEmptyBoard(7, 5),
    currentPlayer: 1,
    winner: null,
  },
  reducers: {
    drop_token: (state, { payload: n_column }) => {
      if(state.winner!==null){
        return
      }

      let n_row = 0;
      while (n_row + 1 < state.sizeY && state.board[n_row + 1][n_column] === 0) {
        n_row += 1;
      }

      state.board[n_row][n_column] = state.currentPlayer;
      if(CheckGameOver(state.board,state.sizeX,state.sizeY)){
        state.winner= state.currentPlayer;
      }else if(CheckDraft(state.board,state.sizeX,state.sizeY)){
        state.winner= "draft"
      }

      else{
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      }
      
    },
    minMaxMove: (state) => {

      if(state.winner!==null){
        return
      }
      console.log("minMaxMove")
      let best_column = decideMove(state.board, state.sizeX, state.sizeY, 2, state.currentPlayer);
      let n_row = 0;
      while (n_row + 1 < state.sizeY && state.board[n_row + 1][best_column] === 0) {
        n_row += 1;
      }

      state.board[n_row][best_column] = state.currentPlayer;
      if(CheckGameOver(state.board,state.sizeX,state.sizeY)){
        state.winner= state.currentPlayer;
      }else if(CheckDraft(state.board,state.sizeX,state.sizeY)){
        state.winner= "draft"
      }

      else{
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      }

    },
    game_restart: (state) => {
      state.board = createEmptyBoard(state.sizeX, state.sizeY);
      state.currentPlayer = 1;
      state.winner=null;
    },
    set_winner: (state, { payload: winner }) => {
      state.winner = winner;
    },
  },
});

export const { drop_token,game_restart,set_winner,minMaxMove } = gameSlice.actions;

export const selectTasksState = (state) => state.game;
export const selectSizeX = (state) => selectTasksState(state).sizeX;
export const selectSizeY = (state) => selectTasksState(state).sizeY;
export const selectBoard = (state) => selectTasksState(state).board;
export const selectCurrentPlayer = (state) =>
  selectTasksState(state).currentPlayer;
export const selectWinner = (state) => selectTasksState(state).winner;

export default gameSlice.reducer;
