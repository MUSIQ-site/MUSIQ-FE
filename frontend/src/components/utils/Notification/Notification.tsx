import React, { useState } from 'react';
import * as S from './Notification.styled';
import dancingChick from '../../../assets/img/playgame/danceChick.gif';

const version = '2.1.0';
const content = '내용이 들어갑니다';

export const Notification = () => {
  const [popup, setPopup] = useState<boolean>(true);

  return (
    <S.Container>
      <h1>공지사항</h1>
      <S.ContentContainer>
        <h2>{version} 업데이트 내역</h2>
        <p>{content}</p>
      </S.ContentContainer>
      <img src={dancingChick} alt="춤추는 병아리" width={80} />
    </S.Container>
  );
};
