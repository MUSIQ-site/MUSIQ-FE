import { useEffect, useState } from 'react';
import styled from 'styled-components';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';
import loveLetter from '../../../assets/img/loveLetter.png';

const HoverImg = styled.div`
  position: absolute;
  bottom: 0;
  width: 5rem;
  height: 5rem;
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
  top: 80%;
  right: 0;
  opacity: ${(props) => (props.time > 0 ? '1' : '0')};
  padding: 1rem;
  width: 15rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  transition: opacity 0.2s linear;

  & :nth-child(2) {
    font-size: 0.8rem;
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 26rem;
  height: 22rem;

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

export const Contact = () => {
  const [time, setTime] = useState<number>(3);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
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
        <img src={loveLetter} alt="마음의편지" width={40} />
      </HoverImg>
      <ExplainBox time={time}>똑똑똑 마음의 편지가 왔어요</ExplainBox>
    </Container>
  );
};
