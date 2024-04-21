import { useDispatch, useSelector } from "react-redux";
import {
  drop_token,
  selectBoard,
  selectCurrentPlayer,
  selectSizeX,
  selectSizeY,
} from "../gameSlice";
import { AnimateSVG, BoardWrapper, Cell, Col, NowPlaying, Row, Text } from "./styled";
import { useEffect } from "react";
import CheckGameOver from "../../checkGameOver";

const generateToken = (value) => {
  if (value == 1) {
    return (
      <AnimateSVG
        fill="#000000"
        height="70px"
        width="70px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        
        viewBox="-62.7 -62.7 455.40 455.40"
        
        stroke="#fb8500"
        strokeWidth="33"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            id="XMLID_520_"
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300 C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z"
          ></path>{" "}
        </g>
      </AnimateSVG>
    );
  } else if (value == 2) {
    return (
      <AnimateSVG
        fill="#000000"
        height="70px"
        width="70px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        
        viewBox="-62.7 -62.7 455.40 455.40"
       
        stroke="#023047"
        strokeWidth="33"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            id="XMLID_520_"
            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300 C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z"
          ></path>{" "}
        </g>
      </AnimateSVG>
    );
  } else {
    return " ";
  }
};

const generateBoard = (sizeX, sizeY, board, dispatch) => {
  let board_html = [];

  for (let i = 0; i < sizeX; i++) {
    let row = [];
    for (let j = 0; j < sizeY; j++) {
      row.push(<Cell key={j}>{generateToken(board[j][i])}</Cell>);
    }
    board_html.push(
      <Col
        key={i}
        onClick={() => {
          dispatch(drop_token(i));
          
        }}
      >
        {row}
      </Col>
    );
  }

  return board_html;
};

const generateGameState = (player, winner) =>{
  
  if(winner === null){
    return <NowPlaying>Now playing: {generateToken(player)} </NowPlaying>
  }else{
    return <NowPlaying>{generateToken(winner)} WIN!!!</NowPlaying>
  }
}

const Board = () => {
  const sizeX = useSelector(selectSizeX);
  const sizeY = useSelector(selectSizeY);
  const board = useSelector(selectBoard);
  const player = useSelector(selectCurrentPlayer);
  const winner = useSelector((state) => state.game.winner);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= 1 && event.key <= sizeX) {
        dispatch(drop_token(parseInt(event.key) - 1));
        
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, sizeX]);



  return (
    <>
    <BoardWrapper>{generateBoard(sizeX, sizeY, board, dispatch)}</BoardWrapper>
    {generateGameState(player,winner)}
    <Text>click on choosen column OR press 1-7 to drop a token </Text>
    </>
  );
};

export default Board;
