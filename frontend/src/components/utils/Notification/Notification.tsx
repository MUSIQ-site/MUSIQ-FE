import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as S from './Notification.styled';
import dancingChick from '../../../assets/img/playgame/danceChick.gif';
import Logo from '../../../assets/svgs/logo.svg';
import WrongBtn from '../../../assets/img/Mutli/wrongBtn.png';

const version = '2.1.0';
const content = '내용이 들어갑니다';

export const Notification = () => {
  const [popup, setPopup] = useState<boolean>(true);
  const [checkedBox, setCheckedBox] = useState<boolean>(false);

  const noShowPopup = () => {
    window.localStorage.setItem('isPopCheck', `${checkedBox}`);
    setPopup(false);
  };

  const checkHandled = () => {
    setCheckedBox(!checkedBox);
  };

  useEffect(() => {
    const isPopupOpenPossible = window.localStorage.getItem('isPopCheck');
    // 로컬스토리지에 isPopCheck가 없으면 한번도 보지 않았던 팝업이니까 셋해준다
    if (isPopupOpenPossible === null) {
      window.localStorage.setItem('isPopCheck', `${checkedBox}`);
    } else if (isPopupOpenPossible === 'true') {
      setPopup(false);
    } else {
      setPopup(true);
    }
  }, []);

  return (
    <div>
      {popup ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <S.Container>
            <S.TopContainer>
              <h1>공지사항</h1>
              <p>
                <img
                  role="presentation"
                  src={WrongBtn}
                  alt="창 끄기"
                  width={30}
                  onClick={noShowPopup}
                />
              </p>
            </S.TopContainer>
            <S.ContentContainer>
              <h2>{version} 업데이트 내역</h2>
              <p>{content}</p>
            </S.ContentContainer>
            <S.CheckBoxInput>
              <input
                type="checkbox"
                id="noShowCheck"
                checked={checkedBox}
                onChange={checkHandled}
              />
              <label htmlFor="noShowCheck">확인했어요, 이제 그만 볼게요.</label>
            </S.CheckBoxInput>
            <S.BottomContainer>
              <img
                className="musiqLogoPosition"
                src={Logo}
                alt="로고"
                width={120}
              />
              <img
                className="dancingChickPosition"
                src={dancingChick}
                alt="춤추는 병아리"
                width={70}
              />
            </S.BottomContainer>
          </S.Container>
        </motion.div>
      ) : (
        ''
      )}
    </div>
  );
};
