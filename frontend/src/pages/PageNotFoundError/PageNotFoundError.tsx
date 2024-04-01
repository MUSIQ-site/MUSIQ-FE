import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledPageNotFoundErrorDiv,
  StyledBg,
} from './PageNotFoundError.styled';
import Error404Message from '../../assets/svgs/Error404Message.svg';
import waterBG from '../../assets/img/background/waterBackground.webp';

export const PageNotFoundError = () => {
  const navigate = useNavigate();

  return (
    <div>
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
    </div>
  );
};
