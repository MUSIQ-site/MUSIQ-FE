import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const ChangeBtnStyle = styled.button`
  width: 8rem;
  height: 3rem;
  border: 3px solid rgba(194, 254, 185, 0.6);
  border-radius: 100px;
  background-color: rgba(84, 173, 71, 0.6);
  font-family: 'Galmuri11', 'sans-serif';
  font-weight: bold;
  color: #fff;

  &:hover {
    border: 3px solid rgba(103, 192, 89, 1);
    background-color: rgba(103, 192, 89, 1);
    transition: all 0.3s ease-in-out;
  }
`;

type OwnProps = {
  setIsGameOptionChange: Dispatch<SetStateAction<boolean>>;
};

export const MultiGameOptionChangeBtn = (props: OwnProps) => {
  const { setIsGameOptionChange } = props;

  return (
    <ChangeBtnStyle
      onClick={() => {
        setIsGameOptionChange(true);
      }}
    >
      게임 옵션 변경
    </ChangeBtnStyle>
  );
};
