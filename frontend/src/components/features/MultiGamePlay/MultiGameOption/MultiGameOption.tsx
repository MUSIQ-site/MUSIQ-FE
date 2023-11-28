import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
  width: 10rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 16px;
  border: 5px solid rgba(235, 226, 255, 0.6);
  background-color: rgba(235, 226, 255, 0.6);
  text-align: center;

  & h1 {
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 4%;
  }

  & li {
    font-size: 1.2rem;
    padding-bottom: 3%;
  }
`;

type OwnProps = {
  years: string[];
};

export const MultiGameOption = (props: OwnProps) => {
  const { years } = props;

  return (
    <Container>
      <h1>출제 연도</h1>
      <ul>
        {years.map((year) => (
          <li key={year}>{year}</li>
        ))}
      </ul>
    </Container>
  );
};
