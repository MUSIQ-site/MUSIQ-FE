import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

const HoverImg = styled.div`
  position: absolute;
  bottom: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  & p {
    font-size: 2rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  & p:hover,
  & p:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

const ExplainBox = styled.div<{ time: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 22rem;
  opacity: ${(props) => (props.time > 0 ? '1' : '0')};
  padding: 1rem 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: opacity 0.2s linear;

  & h1 {
    font-size: 1.3rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  & p {
    font-size: 1rem;

    & .highlight {
      font-size: 1.5rem;
      font-family: 'Galmuri11', 'sans-serif';
      font-weight: bold;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 26rem;
  height: 20rem;
  ${HoverImg}:hover {
    background-color: #fff;
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;

    & + ${ExplainBox} {
      opacity: 1;
    }
  }
`;

type OwnProps = {
  explainList: { isTitle: boolean; content: string }[];
};

export const GameExplain = () => {
  const [time, setTime] = useState<number>(10);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > -1) {
        setTime((prev) => prev - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);

  return (
    <Container>
      <HoverImg className="hoverImg">
        <p>?</p>
      </HoverImg>
      <ExplainBox className="explainBox" time={time}>
        {time < 0 ? '' : <p>{time}초 뒤에 사라집니다</p>}
        <h1>키보드 조작</h1>
        <p>⬅ : 처음 버튼</p>
        <p>⬇ : 중간 버튼</p>
        <p>➡ : 끝 버튼</p>
        <p>
          <span className="highlight">.</span> ( 마침표 ) : skip 버튼
        </p>
        <p>enter : 정답창 활성화 및 정답제출</p>
        <p>spacebar : 정답시 다음 문제로 넘어가기</p>
      </ExplainBox>
    </Container>
  );
};
