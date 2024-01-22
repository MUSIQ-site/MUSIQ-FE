import React, { Dispatch, SetStateAction } from 'react';
import * as S from './MultiGameOption.styled';
import { MultiGameOptionChangeBtn } from '../MultiGameOptionChangeBtn';
import { ReactComponent as RoomLock } from '../../../../assets/svgs/MultiLobby/roomLock.svg';
import { ReactComponent as RoomUnlock } from '../../../../assets/svgs/MultiLobby/roomUnlock.svg';

type userInfoItem = {
  nickname: string;
  score: number;
  isSkipped: boolean;
};

type OwnProps = {
  title: string;
  musicYear: string[];
  quizAmount: number;
  maxUserNumber: number;
};

export const MultiGameOption = (props: {
  requestBodyData: OwnProps;
  gameRoomNumber: number;
  password: string;
  manager: string;
  setIsGameOptionChange: Dispatch<SetStateAction<boolean>>;
  isGameStart: boolean;
}) => {
  const {
    title,
    musicYear,
    quizAmount,
    maxUserNumber,
    // eslint-disable-next-line react/destructuring-assignment
  } = props.requestBodyData;
  const {
    gameRoomNumber,
    password,
    manager,
    setIsGameOptionChange,
    isGameStart,
  } = props;
  const myNickname = window.localStorage.getItem('nickname');

  return (
    <S.Container>
      <h1>
        {gameRoomNumber}번방{' '}
        <span>
          {password === '' ? (
            <RoomUnlock width={25} height={25} />
          ) : (
            <RoomLock width={30} height={25} />
          )}
        </span>
      </h1>
      <div className="data">
        <span className="title">방 제목 : </span>
        <span className="wordWrap">{title}</span>
      </div>
      <div className="data">
        <span className="title">문제 수 : </span>
        <span>{quizAmount}문제</span>
      </div>
      <div className="data">
        <p className="title">출제 연도</p>
        <div className="yearList">
          {musicYear.map((year, idx) => {
            if (idx === 0 && musicYear.length === 1) {
              return `${year}`;
            }
            if (idx === 0) {
              return ` ${year}, `;
            }
            if (idx === musicYear.length - 1) {
              return `${year} `;
            }
            return `${year}, `;
          })}
        </div>
      </div>
      {manager === myNickname && !isGameStart ? (
        <div className="optionChange">
          <MultiGameOptionChangeBtn
            setIsGameOptionChange={setIsGameOptionChange}
          />
        </div>
      ) : (
        ''
      )}
    </S.Container>
  );
};
