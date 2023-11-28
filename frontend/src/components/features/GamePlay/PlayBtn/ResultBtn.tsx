import React from 'react';
import styled from 'styled-components';
import resultBtn from '../../../../assets/img/playgame/resultBtn.png';
import clickResultBtn from '../../../../assets/img/playgame/clickResultBtn.png';

const ResultButtonStyle = styled.button`
  width: 12rem;
  height: 6rem;
  background-image: url(${resultBtn});
  background-size: contain;

  &:active {
    background-image: url(${clickResultBtn});
    background-size: contain;
  }
`;

type OwnProps = {
  clickHandler: () => void;
};

export const ResultBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return <ResultButtonStyle onClick={clickHandler} />;
};
