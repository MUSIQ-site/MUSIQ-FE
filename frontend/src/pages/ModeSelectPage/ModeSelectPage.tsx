/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ModeSelectBackground,
  StyledLogo,
  LogoContainer,
} from './ModeSelectPage.styled';
import { ModeSelectCarousel } from '../../components/features';
import { BackBtn } from '../../components/utils/BackBtn/BackBtn';
import LogoIcon from '../../assets/svgs/logo.svg';

export const ModeSelectPage = () => {
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
      <LogoContainer>
        <StyledLogo src={LogoIcon} alt="Logo" />
      </LogoContainer>
      <ModeSelectBackground>
        <BackBtn url="/" />
        <ModeSelectCarousel />
      </ModeSelectBackground>
    </motion.div>
  );
};
