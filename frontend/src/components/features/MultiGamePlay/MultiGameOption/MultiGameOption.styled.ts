import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
  width: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 16px;
  border: 5px solid rgba(235, 226, 255, 0.6);
  background-color: rgba(235, 226, 255, 0.6);
  text-align: left;

  & h1 {
    width: 13rem;
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 3%;
    text-align: center;
  }

  & li {
    font-size: 1.2rem;
    padding-bottom: 3%;
  }

  & .title {
    font-size: 1.1rem;
    font-weight: bold;
    padding-bottom: 0.5rem;
  }

  & .data {
    line-height: 1.2rem;
  }

  & .wordWrap {
    word-break: break-all;
  }

  & .yearList {
    display: flex;
    line-height: 1.2rem;
  }

  & .optionChange {
    padding-top: 0.3rem;
    text-align: center;
  }
`;
