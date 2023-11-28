import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginRouterBtn } from '../../utils';
import { BackBtn } from '../../utils/BackBtn/BackBtn';
import {
  RankingWrapper,
  CenteredContainer,
  RankingItemsWrapper,
  RankingLogoImg,
  RankingHeader,
  RankingItem,
  Cell,
  HeaderCell,
  RankingContainer,
  StyledMyRanking,
  PrizeImage,
  PrizeCell,
  MyRankingGrade,
  MyRankingText,
  LoginButton,
} from './Ranking.styled';
import rankingLogo from '../../../assets/svgs/ranking/rankingIcon.svg';
import crownImg from '../../../assets/svgs/ranking/Crown.svg';
import silverImg from '../../../assets/svgs/ranking/silverCrown.svg';
import bronzeImg from '../../../assets/svgs/ranking/bronzeCrown.svg';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

type RankingData = {
  rankNum: number;
  nickName: string;
  exp: number;
  level: number;
};

type ApiResponse = {
  code: number;
  message: string;
  data: {
    rankList: RankingData[];
    myRank: string;
  };
};

const nickname = window.localStorage.getItem('nickname');
const MyRanking = ({ rankNum }: { rankNum: string | number | null }) => {
  const navigate = useNavigate();
  const [isNickname, setNickname] = useState<string | null>(
    window.localStorage.getItem('nickname')
  );

  return (
    <StyledMyRanking>
      {isNickname === null ? (
        <>
          <div
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '4%',
            }}
          >
            내 랭킹 확인하기
          </div>
          <LoginButton>
            <LoginRouterBtn isLogin={false} />
          </LoginButton>
        </>
      ) : (
        <>
          <MyRankingText>나의 순위는?</MyRankingText>
          <MyRankingGrade>
            {Number.isNaN(Number(rankNum)) ? rankNum : `${rankNum}위`}
          </MyRankingGrade>
        </>
      )}
    </StyledMyRanking>
  );
};

export const RankingInfo: React.FC = () => {
  const [rankingData, setRankingData] = useState<RankingData[]>([]);
  const [myRank, setMyRank] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isNickname, setNickname] = useState<string | null>(
    window.localStorage.getItem('nickname')
  );

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.REACT_APP_BASE_URL}/ranking/fullranking?nickname=${isNickname}`
        );
        setRankingData(response.data.data.rankList);
        setMyRank(response.data.data.myRank ?? '순위권 외');
        setLoading(false);
      } catch (error) {
        console.error('랭킹 데이터를 가져오는 중 에러가 발생했습니다:', error);
        setLoading(false);
      }
    };

    fetchRankingData();
  }, [nickname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CenteredContainer>
      <BackBtn url="/select-mode" />
      <RankingLogoImg src={rankingLogo} alt="Ranking Logo" width={330} />
      <RankingWrapper>
        <RankingContainer>
          <RankingHeader>
            <HeaderCell>순위</HeaderCell>
            <HeaderCell>닉네임</HeaderCell>
            <HeaderCell>경험치</HeaderCell>
          </RankingHeader>
          <RankingItemsWrapper>
            {rankingData.map((item) => (
              <RankingItem key={item.nickName}>
                <PrizeCell>
                  {item.rankNum === 1 && (
                    <PrizeImage src={crownImg} alt="1등!" width={30} />
                  )}
                  {item.rankNum === 2 && (
                    <PrizeImage src={silverImg} alt="2등!" width={30} />
                  )}
                  {item.rankNum === 3 && (
                    <PrizeImage src={bronzeImg} alt="3등!" width={30} />
                  )}
                </PrizeCell>
                <Cell>{item.rankNum}</Cell>
                <Cell>{item.nickName}</Cell>
                <Cell>{item.exp}</Cell>
              </RankingItem>
            ))}
          </RankingItemsWrapper>
        </RankingContainer>
      </RankingWrapper>
      <MyRanking rankNum={myRank} />
    </CenteredContainer>
  );
};
