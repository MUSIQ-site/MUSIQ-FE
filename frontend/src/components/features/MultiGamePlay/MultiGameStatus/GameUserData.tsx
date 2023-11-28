import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Crown } from '../../../../assets/svgs/ranking/Crown.svg';

type OwnProps = {
  score: number;
  nickname: string;
  manager: string;
};

const Container = styled.div`
  max-width: 15rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .score {
    width: 1.5rem;
    font-weight: bold;
  }

  .nickname {
    width: 9rem;
  }
`;

const CharactorColor = styled.div<{ color: string }>`
  width: 1.2rem;
  height: 1.2rem;
  background-color: ${(props) => props.color};
  border-radius: 4px;
`;

export const GameUserData = (props: OwnProps) => {
  const { score, nickname, manager } = props;

  return (
    <Container>
      <p className="score">{score}</p>
      <p className="nickname">{nickname}</p>
      {manager === nickname ? (
        <Crown width={25} height={25} />
      ) : (
        <div style={{ width: '30px' }} />
      )}
    </Container>
  );
};
