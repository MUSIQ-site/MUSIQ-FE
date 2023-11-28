import styled from 'styled-components';

export const InfoWrapper = styled.div`
  width: 35rem;
  height: 42rem;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10rem;
  background-color: rgba(255, 255, 255, 0.4);
  gap: 2rem;
`;

export const ChickWrapper = styled.div`
  width: 35rem;
  height: 42rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ResultContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DancingChickContainer = styled.div`
  position: relative;
  width: 29rem;
  height: 20rem;
  top: 10%;

  & img:nth-child(1) {
    position: absolute;
    top: 20%;
    bottom: 0;
    left: 20%;
    right: 0;
    z-index: 2;
  }

  & img:nth-child(2) {
    position: absolute;
    top: 70%;
    left: 0;
    right: 0;
    z-index: 1;
  }

  & img:nth-child(3) {
    position: absolute;
    bottom: 50%;
    left: 30%;
    right: 0;
  }

  & :nth-child(4) {
    position: absolute;
    bottom: 107%;
    left: 36%;
  }
`;
