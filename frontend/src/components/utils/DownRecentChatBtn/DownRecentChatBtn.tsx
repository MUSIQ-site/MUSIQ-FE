import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DownArrow from '../../../assets/img/Mutli/downArrow.png';

const Container = styled.div<{ bgColor: string; hoverColor: string }>`
  position: absolute;
  bottom: 18%;
  left: 45%;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;

  & :hover {
    background-color: ${(props) => props.bgColor};
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
        onClick={clickHandler}
        bgColor={bgColor}
        hoverColor={hoverColor}
      >
        <img src={DownArrow} alt="새로운 채팅 내역으로 돌아가기" width={25} />
      </Container>
    </motion.div>
  );
};
