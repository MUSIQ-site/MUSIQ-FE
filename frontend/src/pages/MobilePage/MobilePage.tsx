import React from 'react';
import { StyledMobileDiv } from './MobilePage.styled';
import mobileRestriction from '../../assets/svgs/mobileRestriction.svg';

export const MobilePage = () => (
  <StyledMobileDiv>
    <img src={mobileRestriction} alt="moblie page" width={350} />
  </StyledMobileDiv>
);
