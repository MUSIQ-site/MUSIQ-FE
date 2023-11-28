import React from 'react';
import styled from 'styled-components';
import dontKnowBtn from '../../../../assets/img/playgame/dontKnowBtn.png';
import clickDontKnowBtn from '../../../../assets/img/playgame/clickDontknowBtn.png';

const DontKnowBtnStyle = styled.button`
  width: 12rem;
  height: 6rem;
  background-image: url(${dontKnowBtn});
  background-size: contain;

  &:active {
    background-image: url(${clickDontKnowBtn});
    background-size: contain;
  }
`;

type OwnProps = {
  clickHandler: () => void;
};

export const DontKnowBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return <DontKnowBtnStyle onClick={clickHandler} />;
};
