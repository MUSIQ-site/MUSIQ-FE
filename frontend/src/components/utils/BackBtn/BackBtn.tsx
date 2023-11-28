import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackBtnIcon } from '../../../assets/svgs/backBtn.svg';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

const PositionStyle = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 120px;
  height: 70px;
  z-index: 3;

  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  & svg:hover {
    fill: #414141;
    transition: 0.7s;
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  & svg:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

// eslint-disable-next-line react/require-default-props
export const BackBtn = (props: { url: string; handleClick?: () => void }) => {
  const navigate = useNavigate();
  const {
    url,
    handleClick = () => {
      navigate(url);
    },
  } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClick]);

  return (
    <PositionStyle>
      <BackBtnIcon
        width={120}
        height={70}
        onClick={handleClick}
        fill="rgba(164, 164, 164, 0.8)"
      />
    </PositionStyle>
  );
};
