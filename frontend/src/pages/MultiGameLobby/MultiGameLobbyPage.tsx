import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import { motion } from 'framer-motion';
import { userApis } from '../../hooks/api/userApis';
import {
  LobbyCreateRoomButton,
  LobbyChatting,
  LobbyRooms,
  LobbyUsersList,
  RefreshButton,
  QuickMatchButton,
  SearchRoomButton,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import {
  LobbyWrapper,
  MulitBackGround,
  ButtonsWrapper,
} from './MultiGameLobby.styled';

export const MultiGameLobbyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const channelNumber = location.pathname.split('/').slice(-2)[0];
  const accessToken = window.localStorage.getItem('userAccessToken') ?? '';
  const client = useRef<any>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [lobbyChatList, setLobbyChatList] = useState<
    { nickname: string; message: string }[]
  >([]);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // 상태 업데이트
  };

  useEffect(() => {
    // 모바일 기기 접근을 막는 로직
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

  // 구독
  const subscribe = () => {
    client.current.subscribe(`/topic/${channelNumber}`, (message: any) => {
      const msg = JSON.parse(message.body);
      setLobbyChatList((prev) => [
        ...prev,
        { nickname: msg.nickname, message: msg.message },
      ]);
    });
  };

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        accessToken,
        channelNo: location.pathname.split('/')[2],
        connectType: 'ENTER_LOBBY',
      },
      onConnect: subscribe,
      onStompError: (frame) => {
        console.error('STOMP Error:', frame.headers.message);
      },
    });
    client.current.activate();
  };

  // 소켓 연결 해제
  const postSocketDisconnect = async () => {
    try {
      const response = await userApis.post(
        `${process.env.REACT_APP_BASE_URL}/game/${Number(
          location.pathname.split('/')[2]
        )}`
      );
    } catch (error) {
      console.error('Error leaving channel:', error);
    }
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  // 첫 렌더링 시 소켓연결, 페이지 떠날 시 disconnect
  useEffect(() => {
    connect();
    return () => {
      disconnect();
      postSocketDisconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <MulitBackGround>
        <LobbyWrapper>
          <RefreshButton onClick={handleRefresh} />
          <BackBtn url="/multi/channel" />
          <LobbyUsersList refreshKey={refreshKey} />
          <LobbyRooms key={refreshKey} />
          <ButtonsWrapper>
            <LobbyCreateRoomButton />
            <QuickMatchButton channelNumber={channelNumber} />
            <SearchRoomButton channelNumber={channelNumber} />
          </ButtonsWrapper>
          <LobbyChatting socketClient={client} lobbyChatList={lobbyChatList} />
        </LobbyWrapper>
      </MulitBackGround>
    </motion.div>
  );
};
