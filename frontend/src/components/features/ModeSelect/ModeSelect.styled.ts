import styled from 'styled-components';
import { motion } from 'framer-motion';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

export const Box = styled(motion.div)`
  width: 54rem;
  height: 30rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 2.5rem;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  bottom: 4rem;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 20rem;

  button:nth-child(1) {
    position: absolute;
    left: -5rem;
  }

  button:nth-child(3) {
    position: absolute;
    right: -5rem;
  }

  img:hover,
  img:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

export const RotatedImage = styled.img`
  transform: rotate(180deg);
`;

export const StyledImage = styled.img`
  width: 54rem;
  height: 30rem;
  border-radius: 2.5rem;
`;

export const StyledGuideBtn = styled.button`
  position: absolute;
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c8c8c8;
  border-radius: 50%;
  margin-top: 35%;
  margin-right: 80%;

  &:hover {
    background-color: #fae100;
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  img:hover {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

export const StyledGuideText = styled.div`
  position: absolute;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.5;
`;
