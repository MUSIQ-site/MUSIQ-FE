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
