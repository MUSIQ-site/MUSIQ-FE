import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 80rem;
  height: 20rem;
  border: 5px solid rgba(235, 226, 255, 0.6);
  background-color: rgba(0, 0, 0, 0.7);
`;

export const GameChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;

  & label {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const GameChatInput = styled.input`
  flex-grow: 1;
  height: 2.5rem;
  border: none;
  padding-left: 2%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;

  &:focus {
    outline: 1px solid #fff;
  }
`;

export const ChatListContainer = styled.div`
  border-bottom: 1px solid #fff;
  padding: 1rem;
  width: 100%;
  height: 16.7rem;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 0.7rem; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    height: 20%;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.3);
  }

  & .chatMessage {
    color: #fff;
    display: flex;
    gap: 0.6rem;

    & .nickname {
      text-align: center;
    }
  }
`;

export const NicknameColor = styled.div<{ nickname: string }>`
  & .nickname {
    color: ${(props) => (props.nickname === '삐약이' ? 'yellow' : '#fff')};
  }
`;
