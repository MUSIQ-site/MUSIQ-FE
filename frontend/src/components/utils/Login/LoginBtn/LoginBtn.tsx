import React from 'react';
import * as S from './LoginBtn.styled';

type OwnProps = {
  content: string;
  isDisabled: boolean;
  // eslint-disable-next-line react/require-default-props
  handleClick?: () => void;
};

export const LoginBtn = (props: OwnProps) => {
  const { content, isDisabled, handleClick } = props;

  return (
    <div>
      {isDisabled ? (
        <S.LoginButtonContainer
          disabled={isDisabled}
          isDisabled={isDisabled}
          content={content}
        />
      ) : (
        <S.LoginButtonContainer
          disabled={isDisabled}
          isDisabled={isDisabled}
          onClick={handleClick}
          content={content}
        />
      )}
    </div>
  );
};
