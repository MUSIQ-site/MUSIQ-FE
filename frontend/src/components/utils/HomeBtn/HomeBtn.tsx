import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HomeBtnIcon } from '../../../assets/svgs/HomeButton.svg';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

const HomePosition = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 120px;
  height: 70px;

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

export const HomeBtn = (props: { url: string }) => {
  const { url } = props;
  const navigate = useNavigate();

  return (
    <HomePosition>
      <HomeBtnIcon
        width={120}
        height={70}
        onClick={() => {
          navigate(url);
        }}
        fill="rgba(164, 164, 164, 0.8)"
      />
    </HomePosition>
  );
};
