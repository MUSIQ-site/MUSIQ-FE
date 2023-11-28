import React from 'react';
import styled from 'styled-components';
import dancingChick from '../../../../assets/img/playgame/danceChick.gif';
import waveBg from '../../../../assets/img/playgame/wave.png';

const Container = styled.div`
  margin-top: -2rem;
  margin-bottom: 2rem;
  position: relative;
  width: 29rem;
  height: 20rem;

  & img:nth-child(2) {
    position: absolute;
    top: 20%;
    left: 23%;
    right: 0;
  }
  & img:nth-child(1) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const DancingChick = () => (
  <Container>
    <img src={waveBg} alt="파동" width={400} />
    <img src={dancingChick} alt="춤추는병아리" width={200} height={200} />
  </Container>
);
