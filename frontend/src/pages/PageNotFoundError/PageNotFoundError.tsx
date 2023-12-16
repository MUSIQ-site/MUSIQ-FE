import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  StyledPageNotFoundErrorDiv,
  StyledBg,
} from './PageNotFoundError.styled';
import Error404Message from '../../assets/svgs/Error404Message.svg';
import waterBG from '../../assets/img/background/waterBackground.gif';

export const PageNotFoundError = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <StyledBg src={waterBG} alt="배경" />
      <StyledPageNotFoundErrorDiv>
        <img src={Error404Message} alt="moblie page" />
        <button
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로 가기
        </button>
      </StyledPageNotFoundErrorDiv>
    </motion.div>
  );
};
