import styled from "styled-components";

export const StyledHeader = styled.header`
   
    text-align: center;
    font-size:50px;
    font-weight: 100;
    color: #023047;
    border-bottom: 1px solid #023047;
`

export const Wrapper = styled.div`
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    
`

export const Button = styled.button`
    
    background-color: #8ecae6;
        color: #023047;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 300;
    transition: background-color 0.3s;
    &:hover {
      background-color: #023047;
    color: #8ecae6;
    }
`

export const ButtonWrapper = styled.div`
    background-color: #8ecae6;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`