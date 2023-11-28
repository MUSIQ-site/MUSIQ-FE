import React from 'react';
import styled from 'styled-components';
import heartIcon from '../../../../assets/img/playgame/heart.png';

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const HeartGauge = ({ lives }: { lives: number }) => (
  <Container>
    {Array.from({ length: lives }, (v, i) => i + 1).map((item) => (
      <img src={heartIcon} alt="하트" key={item} width={50} />
    ))}
  </Container>
);
