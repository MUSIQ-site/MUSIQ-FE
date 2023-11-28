import React, { useState, Dispatch, SetStateAction } from 'react';
import * as S from './SelectLevelBtn.styled';
import { ReactComponent as CircleIcon } from '../../../../assets/svgs/circle.svg';

type levelType = { title: string; select: boolean; time: number };

type OwnProps = {
  levelLists: levelType[];
  handleClickRadioButton: (e: any) => void;
  levelList: levelType;
};

export const SelectLevelBtn = (props: OwnProps) => {
  const { levelLists, handleClickRadioButton, levelList } = props;

  return (
    <S.Container>
      <ul>
        {levelLists.map((item) => (
          <li key={item.title}>
            <label htmlFor={item.title}>
              <span>{item.title}</span>
              <input
                type="radio"
                value={item.title}
                id={item.title}
                checked={levelList.title === item.title}
                onChange={handleClickRadioButton}
              />
              <S.SelectRadioStyle>
                <CircleIcon width={40} height={30} />
                {levelList.title === item.title ? (
                  <div className="circle" />
                ) : (
                  ''
                )}
              </S.SelectRadioStyle>
            </label>
          </li>
        ))}
        <p>
          노래의 처음, 중간, 끝을 <span>{levelList.time / 1000}</span> 초간
          들려드립니다
        </p>
      </ul>
    </S.Container>
  );
};
