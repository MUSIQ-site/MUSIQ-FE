import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const RankingWrapper = styled.div`
  width: 44rem;
  height: 42rem;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.4);
  flex-direction: column;
`;

export const RankingItemsWrapper = styled.div`
  width: 38rem;
  height: 35rem;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 2px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: whitesmoke;
  }
`;

export const RankingLogoImg = styled.img`
  display: flex;
  margin-bottom: 1.5%;
`;

export const RankingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #eee;
  width: 38rem;
  border-radius: 2px;
`;

export const HeaderCell = styled.div`
  font-weight: bold;
  font-size: large;
  color: #ff5d70;
  flex-basis: 33.33%;
  text-align: center;
`;

export const RankingItem = styled.div`
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 1.2rem 1rem;
  border-bottom: 1px solid #eee;
`;

export const Cell = styled.div`
  flex-basis: 33.33%;
  text-align: center;
  line-height: 1.2rem;
`;

export const RankingContainer = styled.div`
  width: 38rem;
`;

export const StyledMyRanking = styled.div`
  min-width: 20rem;
  width: 20vw;
  height: 32vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  align-items: center;
  left: 5%;
`;

export const PrizeImage = styled.img``;

export const PrizeCell = styled.div`
  position: relative;
  width: 0.1rem;
  height: 2rem;

  img {
    margin-left: 1rem;
  }
`;

export const MyRankingText = styled.div`
  font-size: 2rem;
  margin-bottom: 10%;
  font-family: 'Galmuri11', 'sans-serif';
  font-weight: bold;
`;

export const MyRankingGrade = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #ff5d70;
`;

export const LoginButton = styled.div`
  display: flex;
  margin-left: 30%;
`;
