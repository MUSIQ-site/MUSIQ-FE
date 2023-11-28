/* eslint-disable react/require-default-props */
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import * as S from './Modal.styled';

type OwnProps = {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    title: string;
    message: string;
  };
  noBtnClick?: () => void | null;
  yesBtnClick?: () => void | null;
  isToggledRef?: React.MutableRefObject<boolean>;
};

export const Modal = (props: OwnProps) => {
  const {
    isToggled,
    setIsToggled,
    data,
    noBtnClick,
    yesBtnClick,
    isToggledRef,
  } = props;
  const location = useLocation();

  return (
    <AnimatePresence>
      {isToggled && (
        <>
          <S.GreyBackground
            onClick={() => {
              if (location.pathname === '/sign-up') {
                return;
              }
              setIsToggled(false);
              if (isToggledRef !== undefined) {
                isToggledRef.current = false;
              }
            }}
          />
          <S.ModalContainer
            initial={{ y: 10, x: '-50%', opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <S.ModalContent>
              {data.message.split('.').map((item) =>
                item !== '' ? (
                  <p className="contentText" key={item}>
                    {item}
                  </p>
                ) : (
                  ''
                )
              )}
            </S.ModalContent>
            <div style={{ display: 'flex', gap: '50px' }}>
              {noBtnClick ? (
                <S.ModalBtn
                  onClick={() => {
                    noBtnClick();
                  }}
                >
                  아니오
                </S.ModalBtn>
              ) : (
                ''
              )}
              <S.ModalBtn
                onClick={() => {
                  if (yesBtnClick) {
                    yesBtnClick();
                  } else {
                    setIsToggled((prev) => !prev);
                    if (isToggledRef !== undefined) {
                      isToggledRef.current = false;
                    }
                  }
                }}
              >
                네
              </S.ModalBtn>
            </div>
          </S.ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};
