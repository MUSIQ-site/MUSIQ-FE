import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  & .emptyBox {
    flex-flow: 1;
    width: 10rem;
  }
`;

export const TalkBoxPosition = styled.div`
  position: absolute;
  top: 20%;
  left: 22%;
`;

export const TalkBoxContainer = styled.div`
  position: relative;
  width: 15rem;
  height: 10rem;

  & .firstAttempGame1 {
    width: 100%;
    position: absolute;
    top: 25%;
    left: 60%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
  }
  & .firstAttempGame2 {
    width: 100%;
    position: absolute;
    top: 40%;
    left: 60%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
  }

  & .firstAttempGame3 {
    width: 100%;
    position: absolute;
    top: 55%;
    left: 60%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
  }

  & .judgeText {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
  }
`;

// 가운데 병아리랑 인풋 묶어서 가운데 배치
export const MiddleContainer = styled.div`
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 8rem;
  flex-grow: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & .explainGame {
    font-size: 1.5rem;
    color: #111;
    font-family: 'Galmuri11', sans-serif;

    & span {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fbc92b;
    }
  }

  & .gameStatus {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Galmuri11', sans-serif;
    color: #111;
  }
`;

export const GameStatusExplainContainer = styled.div`
  padding: 1rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
`;

// 옵션, 하트, 기회, 선택버튼 묶어서 우측으로 배치
export const RightSideContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-right: 5%;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const TopRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const bottomRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

export const PlayingBtnBoxPosition = styled.div`
  width: 28rem;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    & .loadingMusic {
      font-size: 1rem;
      font-family: 'Galmuri11', sans-serif;
    }

    & .btnContainer {
      display: flex;
      flex-direction: row;
    }
  }
`;

export const AnswerYouTubePlayerPosition = styled.div`
  transition: opacity 0.2s linear;
  height: 420px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & p {
    min-width: 350px;
    padding: 0.8rem;
    line-height: 30px;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0.5rem;
    text-align: center;
  }
`;
