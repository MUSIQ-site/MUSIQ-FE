import { atom } from 'recoil';
// eslint-disable-next-line import/no-unresolved
import { Client } from '@stomp/stompjs';

type GameOptionDataType = {
  difficulty: {
    title: string;
    select: boolean;
    time: number;
  };
  yearList: string[];
  gameRoomData: {
    roomId: number;
    round: number;
    problems: number;
  };
};

export const TempLocationStateGameInfo = atom<GameOptionDataType>({
  key: 'TempLocationStateGameInfo',
  default: {
    difficulty: {
      title: '',
      select: false,
      time: 0,
    },
    yearList: [],
    gameRoomData: {
      roomId: 0,
      round: 0,
      problems: 0,
    },
  },
});

export const UserDataAtom = atom({
  key: 'UserDataAtom',
  default: {
    nickname: '',
  },
});

export const UserIpAtom = atom({
  key: 'UserIpAtom',
  default: {
    ip: '',
  },
});

const isLogin = Boolean(window.localStorage.getItem('userAccessToken'));
export const ActiveCarouselNumAtom = atom({
  key: 'ActiveCarouselNumAtom',
  default: {
    activeCarouselNum: isLogin ? 1 : 0,
  },
});

export const websocketClientState = atom<Client | null>({
  key: 'websocketClientState',
  default: null,
});
