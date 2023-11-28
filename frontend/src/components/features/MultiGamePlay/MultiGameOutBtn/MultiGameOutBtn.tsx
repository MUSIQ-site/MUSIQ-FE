import React from 'react';
import styled from 'styled-components';

type OwnProps = {
  patchOutGameRoom: () => void;
};

const OutBtnStyle = styled.button`
  position: absolute;
  top: -4rem;
  left: 3%;
  width: 8rem;
  height: 3rem;
  border: 3px solid rgba(255, 173, 174, 0.6);
  border-radius: 100px;
  background-color: rgba(226, 61, 65, 0.6);
  font-family: 'Galmuri11', 'sans-serif';
  font-weight: bold;
  color: #fff;

  &:hover {
    border: 3px solid rgba(226, 61, 65, 1);
    background-color: rgba(226, 61, 65, 1);
    transition: all 0.3s ease-in-out;
  }
`;

export const MultiGameOutBtn = (props: OwnProps) => {
  const { patchOutGameRoom } = props;

  return (
    <OutBtnStyle type="button" onClick={patchOutGameRoom}>
      게임방나가기
    </OutBtnStyle>
  );
};
