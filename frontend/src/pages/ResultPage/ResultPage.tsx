import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResultInfo } from '../../components/features/Result/ResultInfo/ResultInfo';
import { HomeBtn } from '../../components/utils/HomeBtn/HomeBtn';

export const ResultPage: FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <HomeBtn url="/select-mode" />;
      <ResultInfo />
    </motion.div>
  );
};
