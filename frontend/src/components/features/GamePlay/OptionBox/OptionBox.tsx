import React from 'react';
import * as S from './OptionBox.styled';

type OwnProps = {
  difficulty: string;
};

export const OptionBox = (props: OwnProps) => {
  const { difficulty } = props;

  return (
    <S.Container>
      <h1>게임 옵션</h1>
      <p>{difficulty}모드</p>
    </S.Container>
  );
};
