/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ModeSelectBackground,
  StyledLogo,
  LogoContainer,
} from './ModeSelectPage.styled';
import { ModeSelectCarousel } from '../../components/features';
import { Modal } from '../../components/utils';
import { BackBtn } from '../../components/utils/BackBtn/BackBtn';
import LogoIcon from '../../assets/svgs/logo.svg';

export const ModeSelectPage = () => {
  const navigate = useNavigate();
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick: () => void; // 새로운 게임 데이터로 게임 생성(게임방으로 라우팅)
    yesBtnClick: () => void; // 기존의 게임 데이터로 게임 생성(옵션창으로 라우팅)
  }>({
    data: { title: '', message: '' },
    noBtnClick: () => {},
    yesBtnClick: () => {},
  });
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <LogoContainer>
        <StyledLogo src={LogoIcon} alt="Logo" />
      </LogoContainer>
      <ModeSelectBackground>
        <BackBtn url="/" />
        <ModeSelectCarousel
          setModalData={setModalData}
          setIsToggled={setIsToggled}
        />
      </ModeSelectBackground>
    </motion.div>
  );
};
