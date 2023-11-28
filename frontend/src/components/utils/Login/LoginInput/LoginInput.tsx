/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import * as S from './LoginInput.styled';
import closeEye from '../../../../assets/img/Login/closeEye.png';
import openEye from '../../../../assets/img/Login/openEye.png';

type OwnProps = {
  labelContent: string;
  labelId: string;
  placeholder?: string;
  isSuccess?: boolean;
  successMessage?: string;
  isError?: boolean;
  errorMessage?: string;
  isDuplicate?: boolean;
  duplicatedMessage?: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.MutableRefObject<string>;
};

export const LoginInput = (props: OwnProps) => {
  const {
    labelContent,
    labelId,
    placeholder,
    isError,
    errorMessage,
    isSuccess,
    successMessage,
    isDuplicate,
    duplicatedMessage,
    inputValue,
    setInputValue,
    inputRef,
  } = props;
  const [showPwd, setShowPwd] = useState<boolean>(true);

  return (
    <S.Container>
      <label id={labelId}>{labelContent}</label>
      <S.LoginInputContainer>
        <S.LoginInput
          type={labelId === 'userPwd' && showPwd ? 'password' : 'text'}
          placeholder={placeholder}
          name={labelId}
          value={inputValue}
          onChange={(e: any) => {
            setInputValue(e.target.value);
            inputRef.current = e.target.value;
          }}
        />
        <div>
          {labelId === 'userPwd' ? (
            <div>
              {showPwd ? (
                <S.showPwdIcon
                  onClick={() => {
                    setShowPwd(!showPwd);
                  }}
                >
                  <img src={closeEye} width={24} alt="가림" />
                </S.showPwdIcon>
              ) : (
                <S.showPwdIcon
                  onClick={() => {
                    setShowPwd(!showPwd);
                  }}
                >
                  <img src={openEye} width={24} alt="보임" />
                </S.showPwdIcon>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </S.LoginInputContainer>
      <S.ErrorMessage isError={isError}>{errorMessage}</S.ErrorMessage>
      {isDuplicate ? (
        <S.DuplicatedMessage isDuplicate={isDuplicate}>
          {duplicatedMessage}
        </S.DuplicatedMessage>
      ) : (
        ''
      )}

      <S.SuccessMessage isSuccess={isSuccess}>
        {successMessage}
      </S.SuccessMessage>
    </S.Container>
  );
};
