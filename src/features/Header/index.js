import { useDispatch } from "react-redux";
import { Button, ButtonWrapper, StyledHeader, Wrapper } from "./styled";
import { game_restart } from "../gameSlice";

const Header = () => {

  const dispatch = useDispatch();

  return ( 
    <header>
      <Wrapper>
        <StyledHeader> Connect4 </StyledHeader>
        <ButtonWrapper> 
          <Button onClick={()=>{
            dispatch(game_restart())
          }}> New Game </Button>
        </ButtonWrapper>
      </Wrapper>
    </header>
   );
}
 
export default Header;