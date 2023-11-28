/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  & p {
    font-size: 1.3rem;

    & .bold {
      font-family: 'Galmuri11', 'sans-serif';
      font-weight: bold;
    }
  }
`;

type OwnProps = {
  time: number;
  gameStatus: boolean;
  isResult: boolean;
};

export const MultiGameSkip = (props: OwnProps) => {
  const { gameStatus, isResult, time } = props;

  return (
    <Container>
      <div>
        {isResult ? (
          <p>[ 게임이 끝났습니다. {time}초후에 대기상태로 이동합니다. ]</p>
        ) : (
          <div>
            {gameStatus ? (
              <p>
                [ 채팅창에 <span className="bold"> . (마침표)</span> 하나만
                입력하면 스킵투표가 됩니다. ]
                {/* <span className="bold">.</span> 키를 누르면 스킵투표가 됩니다. ] */}
              </p>
            ) : (
              <p>[ 방장이 게임 시작을 누르면 게임이 시작됩니다. ]</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};
