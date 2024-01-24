import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './MultiGameChatting.styled';
import { MultiSkipBox } from '../MultiSkipBox';
import { DownRecentChatBtn } from './DownRecentChatBtn';

type ChatType = {
  nickname: string;
  message: string;
};

type OwnProps = {
  userLength: number;
  skipVote: number;
  gameChatList: ChatType[];
  socketClient: React.MutableRefObject<any>;
  setGameChatList: Dispatch<SetStateAction<ChatType[]>>;
};

export const MultiGameChatting = (props: OwnProps) => {
  const { userLength, skipVote, gameChatList, socketClient, setGameChatList } =
    props;
  const accessToken = window.localStorage.getItem('UAT');
  const location = useLocation();
  const focusRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<string>('');
  const inputFocusRef = useRef<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null); // 채팅창 맨 밑으로 스크롤 내리기

  // 스크롤 구현
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef<boolean>(false);
  const [userScrolled, setUserScrolled] = useState<boolean>(false);

  const sendChat = () => {
    if (String(inputTextRef.current).trim() === '') {
      return;
    }
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    socketClient.current.publish({
      destination: `/chat-message/${location.pathname.split('/')[4]}`,
      headers,
      body: JSON.stringify({
        messageType: 'CHAT',
        message: inputTextRef.current,
        nickname: window.localStorage.getItem('nickname'),
      }),
    });
    setInputText('');
  };

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
    console.log(userScrolledRef.current);
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
    if (!userScrolledRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [gameChatList]); // lobbyChatList가 변경될 때마다 스크롤 조정(맨 아래로)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputTextRef.current === '') {
        if (focusRef.current) {
          if (inputFocusRef.current) {
            focusRef.current.blur();
            inputFocusRef.current = false;
          } else {
            focusRef.current.focus();
            inputFocusRef.current = true;
          }
        }
      } else if (e.key === 'Enter' && inputTextRef.current !== '') {
        sendChat();
        inputTextRef.current = '';
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    };

    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const DownRecentChatBtnHandler = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <S.Container
      onClick={() => {
        inputFocusRef.current = false;
      }}
    >
      {userScrolled ? (
        <DownRecentChatBtn clickHandler={DownRecentChatBtnHandler} />
      ) : (
        ''
      )}
      <MultiSkipBox skipVote={skipVote} userLength={userLength} />
      <S.ChatListContainer ref={chatContainerRef}>
        {gameChatList.map((chat, index) => (
          <S.NicknameColor
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="chatMessage"
            nickname={chat.nickname}
          >
            <div className="nickname">{chat.nickname}</div>
            <div className="message">{chat.message}</div>
          </S.NicknameColor>
        ))}
        <div ref={chatEndRef} />
      </S.ChatListContainer>
      <S.GameChatInputContainer>
        <label htmlFor="gameChatInput">
          {window.localStorage.getItem('nickname')}
        </label>
        <S.GameChatInput
          type="text"
          id="gameChatInput"
          className="gameChatInput"
          placeholder="엔터키로 활성화 후 채팅 입력"
          value={inputText}
          maxLength={100}
          ref={focusRef}
          onChange={(e) => {
            setInputText(e.target.value);
            inputTextRef.current = e.target.value;
          }}
        />
      </S.GameChatInputContainer>
    </S.Container>
  );
};
