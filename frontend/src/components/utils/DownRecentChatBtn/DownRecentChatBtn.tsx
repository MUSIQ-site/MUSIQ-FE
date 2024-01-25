import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DownArrow from '../../../assets/img/Mutli/downArrow.png';

const Container = styled.button<{ bgColor: string; hoverColor: string }>`
  position: absolute;
  bottom: 18%;
  left: 45%;
  width: 3rem;
  height: 3rem;
  /* padding: 0.5rem; */
  border-radius: 100%;
  background-image: url(${DownArrow});
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: center center;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    transition: all ease-in-out 0.3s;
  }
`;

type OwnProps = {
  clickHandler: () => void;
  bgColor: string;
  hoverColor: string;
};

export const DownRecentChatBtn = (props: OwnProps) => {
  const { clickHandler, bgColor, hoverColor } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container
        type="button"
        onClick={clickHandler}
        bgColor={bgColor}
        hoverColor={hoverColor}
      />
    </motion.div>
  );
};
