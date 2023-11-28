import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type OwnProps = {
  socketClient: React.MutableRefObject<any>;
};

const ButtonStyle = styled.div`
  margin: 0 auto;
  width: 9rem;
  height: 4rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 210, 48, 0.5);

  :hover {
    background-color: rgba(255, 210, 48, 1);
    transition: all 0.3s ease-in-out;
  }

  & button {
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }
`;

export const MultiGameStart = (props: OwnProps) => {
  const { socketClient } = props;
  const accessToken = window.localStorage.getItem('userAccessToken');
  const location = useLocation();

  const sendGameStart = () => {
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    socketClient.current.publish({
      destination: `/chat-message/${location.pathname.split('/')[4]}`,
      headers,
      body: JSON.stringify({
        messageType: 'GAMESTART',
        message: '',
        nickname: '',
      }),
    });
  };

  return (
    <ButtonStyle>
      <button type="button" onClick={sendGameStart}>
        게임시작
      </button>
    </ButtonStyle>
  );
};
