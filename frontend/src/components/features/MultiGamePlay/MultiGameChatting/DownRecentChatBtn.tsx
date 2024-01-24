import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import DownArrow from '../../../../assets/img/Mutli/downArrow.png';

const Container = styled.div`
  position: absolute;
  bottom: 18%;
  left: 45%;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: rgba(217, 217, 217, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

type OwnProps = {
  clickHandler: () => void;
};

export const DownRecentChatBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return (
    <Container onClick={clickHandler}>
      <img src={DownArrow} alt="새로운 채팅 내역으로 돌아가기" width={25} />
    </Container>
  );
};
