import React from 'react';
import styled from 'styled-components';

const SkipBox = styled.div`
  position: absolute;
  top: 0;
  right: 0.68rem;
  width: 12rem;
  height: 3rem;
  background-color: rgba(235, 226, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    & .bold {
      font-family: 'Galmuri11', 'sans-serif';
      font-weight: bold;
    }
  }
`;

type OwnProps = {
  skipVote: number;
  userLength: number;
};

export const MultiSkipBox = (props: OwnProps) => {
  const { skipVote, userLength } = props;

  return (
    <SkipBox>
      <p>
        <span className="bold">스킵인원</span> - [ {skipVote} / {userLength} ]
      </p>
    </SkipBox>
  );
};
