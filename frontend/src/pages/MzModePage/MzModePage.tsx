import React from 'react';
import { motion } from 'framer-motion';
import { BackBtn } from '../../components/utils';
import { StyledMzModeDiv } from './MzModePage.styled';
import mzDeveloping from '../../assets/svgs/developing.svg';

export const MzModePage = () => (
  <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
    <StyledMzModeDiv>
      <img src={mzDeveloping} alt="moblie page"/>
      <BackBtn url='/select-mode'/>
    </StyledMzModeDiv> 
  </motion.div>
);
