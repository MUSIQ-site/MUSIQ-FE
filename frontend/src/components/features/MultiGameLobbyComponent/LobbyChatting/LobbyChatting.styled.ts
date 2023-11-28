import styled from 'styled-components';

export const ChattingWrapper = styled.div`
  width: 75vw;
  height: 35vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: 5%;
  left: 21%;
`;

export const ChattingContentsWrapper = styled.div`
  width: 73vw;
  height: 27vh;
  border: solid 5px rgba(235, 226, 255, 0.2);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: whitesmoke;
  }
`;

export const ChattingContent = styled.div`
  width: 68vw;
  padding: 1%;
`;

export const ChattingInputWrapper = styled.div`
  width: 73vw;
  height: 3vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 0.8%;
`;

export const StyledInput = styled.input`
  border: solid 5px rgba(235, 226, 255, 0.3);
  border-radius: 10px;
  width: 60vw;
`;
