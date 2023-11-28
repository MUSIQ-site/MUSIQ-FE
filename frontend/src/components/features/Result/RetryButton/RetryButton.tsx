import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RetryIcon from '../../../../assets/svgs/retryIcon.svg';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

interface RetryButtonProps {
  mode: string;
  selectYear: string[];
}

const StyledRetryButton = styled.button`
  width: 160px;

  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

const HoverStyled = styled.img`
  &:hover {
    filter: sepia(50%);
  }
`;

export const RetryButton: FC<RetryButtonProps> = ({ mode, selectYear }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRetry = () => {
    const paths = location.pathname.split('/');
    const gameMode = paths[1];
    navigate(`/${gameMode}/game-option`, { state: { mode, selectYear } });
  };

  return (
    <StyledRetryButton type="button" onClick={handleRetry}>
      <HoverStyled src={RetryIcon} alt="다시하기" width={150} />
    </StyledRetryButton>
  );
};
