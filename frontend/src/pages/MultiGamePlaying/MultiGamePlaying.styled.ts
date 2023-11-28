import styled from 'styled-components';
import backgroundGif1 from '../../assets/img/background/backgroundGif1.gif';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundGif1});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const topPosition = styled.div`
  width: 70%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-top: 2%;
`;

export const middlePosition = styled.div`
  width: fit-content;
  padding: 0.5rem;
  margin: 0 auto;
  background-color: black;
  color: #fff;
`;

export const bottomPosition = styled.div`
  margin: 0 auto;
  margin-bottom: 1%;
  position: relative;
`;

export const ExplainBox = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.6);

  & .result {
    & h1 {
      padding-top: 2rem;
      padding-bottom: 2rem;
      font-size: 2rem;
      font-family: 'Galmuri11', 'sans-serif';
      font-weight: bold;
    }

    & ul {
      :nth-of-type(1) {
        font-size: 3rem;
        padding-bottom: 1rem;
      }
      :nth-of-type(2) {
        font-size: 2.5rem;
        padding-bottom: 1rem;
      }
      :nth-of-type(3) {
        font-size: 2rem;
        padding-bottom: 1rem;
      }
      :nth-of-type(4) {
        font-size: 1rem;
        padding-bottom: 1rem;
      }
      :nth-of-type(5) {
        font-size: 0.5rem;
        padding-bottom: 1rem;
      }
      :nth-of-type(6) {
        font-size: 0.3rem;
        padding-bottom: 1rem;
      }
    }
  }

  & .waitingBox {
    height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    & .waiting {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-family: 'Galmuri11', 'sans-serif';
    }
  }
`;
