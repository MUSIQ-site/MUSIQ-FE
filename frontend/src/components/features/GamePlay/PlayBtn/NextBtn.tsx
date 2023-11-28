import React, { MutableRefObject, useEffect } from 'react';
import styled from 'styled-components';
import nextBtn from '../../../../assets/img/playgame/nextBtn.png';
import clickNextBtn from '../../../../assets/img/playgame/clickNextBtn.png';

const NextButtonStyle = styled.button<{ keyEvent: string }>`
  width: 12rem;
  height: 6rem;
  background-image: ${(props) =>
    props.keyEvent === 'SpaceBar' ? `url(${clickNextBtn})` : `url(${nextBtn})`};
  background-size: contain;

  &:active {
    background-image: url(${clickNextBtn});
    background-size: contain;
  }
`;

type OwnProps = {
  clickHandler: () => void;
  keyEvent: string;
};

export const NextBtn = (props: OwnProps) => {
  const { clickHandler, keyEvent } = props;

  return <NextButtonStyle onClick={clickHandler} keyEvent={keyEvent} />;
};
