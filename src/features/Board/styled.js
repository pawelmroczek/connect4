import styled, { keyframes } from "styled-components";

export const Cell = styled.div`
  display: flex;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  margin: 2px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const dropIn = keyframes`
  from {
    transform: translateY(-200%);
    opacity: 1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Apply the animation to your SVG component
export const AnimateSVG = styled.svg`
  animation: ${dropIn} 0.5s ease; // Adjust duration and easing as needed
  transition: stroke 0.3s ease-in-out;
  stroke-width:33;
`;

export const Col = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  cursor: pointer;
  transition: background-color 0.5s;
  transition: scale 0.5s;
  &:hover {
    scale: 1.02;
    
    background-color: #8ecae6;
  }
`;

export const BoardWrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const HiddingSpan = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;


export const NowPlaying = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 30px;
`;