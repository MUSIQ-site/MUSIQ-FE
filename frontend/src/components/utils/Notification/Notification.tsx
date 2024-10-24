import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as S from './Notification.styled';
import dancingChick from '../../../assets/img/playgame/danceChick.gif';
import Logo from '../../../assets/svgs/logo.svg';
import WrongBtn from '../../../assets/img/Mutli/wrongBtn.png';

const version = process.env.REACT_APP_VERSION;
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
              <h2>{version} 업데이트</h2>
              <ul>
                <h3>테마 부문</h3>
                <li>
                  곧 찾아올 겨울 분위기에 맞는 UI로 업데이트 하였습니다, 게임을
                  플레이하면서 직접 확인해보세요!
                </li>
              </ul>
              <br />
              <ul>
                <h3>게임 부문</h3>
                <li>
                  2024년도 노래 추가하였습니다, 조금 늦었지만 마음껏 즐겨주세요!
                </li>
              </ul>
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
