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
import { DownRecentChatBtn } from '../../../utils';
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
  const [chatCount, setChatCount] = useState(0);
  const [chatDisabled, setChatDisabled] = useState(false); // 도배 방지를 위한 상태 변수
  const inputRef = useRef<HTMLInputElement>(null);

  // 스크롤 구현을 위한 상태
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef<boolean>(false);
  const [userScrolled, setUserScrolled] = useState<boolean>(false);

  // 사용자가 수동으로 스크롤을 조작한 경우 상태 업데이트
  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      if (
        chatContainer.scrollTop + chatContainer.clientHeight <
        chatContainer.scrollHeight - 20
      ) {
        userScrolledRef.current = true;
        setUserScrolled(true);
      } else {
        userScrolledRef.current = false;
        setUserScrolled(false);
      }
    }
  };

  // useEffect를 사용하여 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputRef.current && !chatDisabled) {
        inputRef.current.focus(); // 엔터키가 눌렸을 때 입력 필드에 포커스
      }
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyPress);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [chatDisabled]); // 의존성 배열에 chatDisabled 추가

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

    // 채팅 도배 방지 로직
    setChatCount(chatCount + 1);

    // 연속 3번의 메시지를 보낸 경우
    if (chatCount >= 4) {
      setChatDisabled(true);
      setTimeout(() => {
        setChatDisabled(false);
        setChatCount(0);
      }, 3000); // 3초 후 채팅 활성화 및 카운트 초기화
    }
  };

  useEffect(() => {
    if (!userScrolledRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lobbyChatList]); // lobbyChatList가 변경될 때마다 스크롤 조정(맨 아래로)

  // 최신 채팅으로 이동하는 버튼 클릭핸들러
  const DownRecentChatBtnHandler = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ChattingWrapper>
      {userScrolled ? (
        <DownRecentChatBtn
          clickHandler={DownRecentChatBtnHandler}
          bgColor="rgba(29, 29, 29, 0.4)"
          hoverColor="rgba(29, 29, 29, 1)"
        />
      ) : (
        ''
      )}
      <ChattingContentsWrapper ref={chatContainerRef}>
        <ChattingContent>
          {lobbyChatList.map((msg, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ marginTop: '0.5%' }}>
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
          ref={inputRef}
          placeholder={
            chatDisabled
              ? '잠시 후 다시 시도해주세요'
              : '메시지를 입력하세요...'
          }
          value={lobbyInputMessage}
          onChange={(e) => {
            // 채팅 글자 수 제한 및 채팅 비활성화 상태 확인
            if (e.target.value.length <= 100 && !chatDisabled) {
              setLobbyInputMessage(e.target.value);
            }
          }}
          onKeyPress={(e) => {
            if (
              e.key === 'Enter' &&
              !chatDisabled &&
              lobbyInputMessage !== ''
            ) {
              sendMessage();
            }
          }}
          disabled={chatDisabled}
        />
        <button type="button" onClick={sendMessage}>
          <img src={messageSubmit} alt="메세지 보내기" width={27} />
        </button>
      </ChattingInputWrapper>
    </ChattingWrapper>
  );
};
