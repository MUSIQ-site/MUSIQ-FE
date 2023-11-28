import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import styled from 'styled-components';
import answerInput from '../../../../assets/img/playgame/answerInput.png';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

const Container = styled.div`
  position: relative;
  margin-bottom: 2rem;

  & .explainTryCnt {
    position: absolute;
    top: -1.3rem;
    left: 0;
    right: 0;
    font-weight: bold;
  }

  & .explainKey {
    position: absolute;
    bottom: -1.5rem;
    left: 0.9rem;
    font-weight: bold;
  }
`;

const InputStyle = styled.div`
  & input {
    background-image: url(${answerInput});
    width: 21.1rem;
    height: 6.4rem;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding: 1rem;
    font-size: 1.6rem;
  }

  & input:hover,
  & input:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

type OwnProps = {
  tryCntRef: MutableRefObject<number>;
  isCorrect: boolean;
  isLose: boolean;
  isJudge: boolean;
  inputText: string;
  setInputText: (e: any) => void;
  activeButton: (inputText: string) => void;
  setIsInputFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AnswerInput = (props: OwnProps) => {
  const {
    tryCntRef,
    isCorrect,
    isLose,
    isJudge,
    inputText,
    setInputText,
    activeButton,
    setIsInputFocus,
  } = props;
  const focusRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<string>('');
  const inputFocusRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputTextRef.current === '') {
        if (focusRef.current) {
          if (inputFocusRef.current) {
            focusRef.current.blur();
            inputFocusRef.current = false;
            setIsInputFocus(false);
          } else {
            focusRef.current.focus();
            inputFocusRef.current = true;
            setIsInputFocus(true);
          }
        }
      } else if (e.key === 'Enter' && inputTextRef.current !== '') {
        activeButton(inputTextRef.current);
        setInputText('');
        inputTextRef.current = '';
        inputFocusRef.current = false;
        setIsInputFocus(false);
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    };

    window.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Container>
      <InputStyle>
        <input
          type="text"
          placeholder={
            tryCntRef.current <= 0
              ? ''
              : `남은 정답 시도 횟수 : ${tryCntRef.current}회`
          }
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            inputTextRef.current = e.target.value;
          }}
          ref={focusRef}
          disabled={isJudge || isCorrect || isLose || tryCntRef.current <= 0}
          readOnly={isJudge || isCorrect || isLose || tryCntRef.current <= 0}
        />
      </InputStyle>
      <p className="explainKey">enter 키로 활성화, enter키로 정답 제출</p>
    </Container>
  );
};
