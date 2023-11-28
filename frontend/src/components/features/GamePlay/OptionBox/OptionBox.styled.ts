import styled from 'styled-components';

export const Container = styled.div`
  width: 12rem;
  padding: 1rem 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h1 {
    font-size: 1.5rem;
    font-family: 'Galmuri11', sans-serif;
  }

  & p {
    font-size: 1.2rem;
  }
`;
