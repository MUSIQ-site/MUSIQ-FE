import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResultInfo } from '../../components/features/Result/ResultInfo/ResultInfo';
import { HomeBtn } from '../../components/utils/HomeBtn/HomeBtn';

export const ResultPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

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
