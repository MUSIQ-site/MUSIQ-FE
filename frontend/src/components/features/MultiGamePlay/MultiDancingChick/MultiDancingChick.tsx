import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dancingChick from '../../../../assets/img/playgame/danceChick.gif';
import bubbleBg from '../../../../assets/img/Mutli/bubble.png';

const Container = styled.div`
  position: absolute;
  height: 200px;
  top: -170px;
  right: 0;
  display: flex;

  .bubble {
    position: relative;
    width: 200px;
    height: 131px;
    background-image: url(${bubbleBg});
    background-size: contain;
    position: relative;
    text-align: center;

    & .speakChickStyle {
      width: 190px;
      text-align: center;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 1.4rem;
    }

    & img {
      position: absolute;
      top: 0;
    }
  }

  .chick {
    width: 100px;
    height: 170px;
    position: relative;
    margin: 0 auto;

    & img {
      position: absolute;
      bottom: 0;
    }
  }
`;

type OwnProps = {
  speakChick: { nickname: string; message: string };
};

export const MultiDancingChick = (props: OwnProps) => {
  const { speakChick } = props;
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setTime(5);
  }, [speakChick]);

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
      {time <= 0 ? (
        ''
      ) : (
        <div className="bubble">
          <p className="speakChickStyle">{speakChick.message}</p>
        </div>
      )}
      <div className="chick">
        <img src={dancingChick} alt="춤추는병아리" width={100} height={100} />
      </div>
    </Container>
  );
};
