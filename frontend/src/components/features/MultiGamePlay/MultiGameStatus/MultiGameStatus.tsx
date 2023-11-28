import React from 'react';
import styled from 'styled-components';
import { GameUserData } from './GameUserData';

const Container = styled.div`
  position: absolute;
  top: 3%;
  left: 3%;
  width: 16rem;
  height: 15rem;
  border-radius: 16px;
  border: 5px solid rgba(235, 226, 255, 0.6);
  background-color: rgba(235, 226, 255, 0.6);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 14px;

  & h1 {
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 4%;
  }

  & div {
    margin-left: 3%;
  }
`;

type OwnProps = {
  gameUserList: { nickname: string; score: number }[];
  manager: string;
};

export const MultiGameStatus = (props: OwnProps) => {
  const { gameUserList, manager } = props;

  return (
    <Container>
      <h1>게임현황</h1>
      {gameUserList.map((item) => (
        <GameUserData
          key={item.nickname}
          score={item.score}
          nickname={item.nickname}
          manager={manager}
        />
      ))}
    </Container>
  );
};
