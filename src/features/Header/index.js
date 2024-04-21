import { Button, ButtonWrapper, StyledHeader, Wrapper } from "./styled";

const Header = () => {
  return ( 
    <header>
      <Wrapper>
        <StyledHeader> Connect4 </StyledHeader>
        <ButtonWrapper> 
          <Button> New Game </Button>
        </ButtonWrapper>
      </Wrapper>
    </header>
   );
}
 
export default Header;