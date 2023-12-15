import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { Client, IMessage } from '@stomp/stompjs';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { websocketClientState } from '../../../../atoms/atoms';
import {
  ChattingWrapper,
  ChattingContentsWrapper,
  ChattingInputWrapper,
  StyledInput,
  ChattingContent,
} from './LobbyChatting.styled';
import messageSubmit from '../../../../assets/svgs/MultiLobby/chatSubmit.svg';

interface ChatMessage {
  nickname: string;
  message: string;
}

type OwnProps = {
  socketClient: React.MutableRefObject<any>;
  lobbyChatList: { nickname: string; message: string }[];
};

export const LobbyChatting = (props: OwnProps) => {
  const { socketClient, lobbyChatList } = props;
  const location = useLocation();
  const channelNo = location.pathname.split('/').slice(-2)[0];
  const myNickname = window.localStorage.getItem('nickname') || 'Unknown';
  const [lobbyInputMessage, setLobbyInputMessage] = useState<string>('');
  const accessToken = window.localStorage.getItem('UAT');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    const headers: { [key: string]: string } = {};
    if (accessToken && lobbyInputMessage.trim() !== '') {
      headers.accessToken = accessToken;
    }
    socketClient.current.publish({
      destination: `/chat-message/${channelNo}`,
      headers,
      body: JSON.stringify({
        message: lobbyInputMessage,
        nickname: myNickname,
      }),
    });
    setLobbyInputMessage(''); // 채팅 보내고 입력창 비우기
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lobbyChatList]); // lobbyChatList가 변경될 때마다 스크롤 조정(맨 아래로)

  return (
    <ChattingWrapper>
      <ChattingContentsWrapper>
        <ChattingContent>
          {lobbyChatList.map((msg) => (
            <div key={msg.nickname} style={{ marginTop: '0.5%' }}>
              <strong style={{ fontWeight: 'bold' }}>{msg.nickname}:</strong>{' '}
              {msg.message}
            </div>
          ))}
          <div ref={chatEndRef} />
        </ChattingContent>
      </ChattingContentsWrapper>
      <ChattingInputWrapper>
        <StyledInput
          type="text"
          placeholder="메시지를 입력하세요..."
          value={lobbyInputMessage}
          onChange={(e) => {
            // 채팅 글자 수 제한
            if (e.target.value.length <= 100) {
              setLobbyInputMessage(e.target.value);
            }
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button type="button" onClick={sendMessage}>
          <img src={messageSubmit} alt="메세지 보내기" width={27} />
        </button>
      </ChattingInputWrapper>
    </ChattingWrapper>
  );
};
