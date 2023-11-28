import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { StyledRankingImg, StyledRankingDiv } from './RankingPage.styled';
import { RankingInfo } from '../../components/features/Ranking/RankingInfo';
import { ActiveCarouselNumAtom } from '../../atoms/atoms';

export const RankingPage = () => {
  const navigate = useNavigate();
  const [activeCarouselNum, setActiveCarouselNum] = useRecoilState(
    ActiveCarouselNumAtom
  );

  useEffect(() => {
    // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }

    setActiveCarouselNum({ activeCarouselNum: 3 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <RankingInfo />
    </motion.div>
  );
};
