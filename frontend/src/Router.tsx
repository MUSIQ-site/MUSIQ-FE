import { useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { UserIpAtom } from './atoms/atoms';
import { checkIsMobile } from './apis/utils/isMobile';
import PrivateRoute from './hooks/PrivateRoute';
import PublicRoute from './hooks/PublicRoute';
import { BgmBtn } from './components/utils';
import {
  Landing,
  ModeSelectPage,
  GuestGameOption,
  GuestGamePlaying,
  SingleGameOption,
  SingleGamePlaying,
  ResultPage,
  MobilePage,
  Login,
  RankingPage,
  Signup,
  PageNotFoundError,
  MultiChannelPage,
  MultiGameLobbyPage,
  MultiGamePlaying,
} from './pages';

const PrivatePath = [
  { path: '/multi/channel', component: <MultiChannelPage /> },
  { path: '/multi/:channelId/lobby', component: <MultiGameLobbyPage /> },
  {
    path: '/multi/:channelId/game/:gameRoomId',
    component: <MultiGamePlaying />,
  },
  { path: '/single/game-option', component: <SingleGameOption /> },
  { path: '/single/game-playing', component: <SingleGamePlaying /> },
  { path: '/single/game-result', component: <ResultPage /> },
];

// restricted = false 로그인 여부와 관계없이 접근 가능 페이지
// restricted = true 로그인한 상태에선 접근 불가능: 로그인, 회원가입
const PublicPath = [
  { path: '/login', component: <Login />, restricted: true },
  { path: '/sign-up', component: <Signup />, restricted: true },
  {
    path: '/guest/game-play',
    component: <GuestGamePlaying />,
    restricted: true,
  },
  {
    path: '/guest/game-option',
    component: <GuestGameOption />,
    restricted: true,
  },
  { path: '/guest/game-result', component: <ResultPage />, restricted: true },
  { path: '/', component: <Landing />, restricted: false },
  { path: '/select-mode', component: <ModeSelectPage />, restricted: false },
  { path: '/ranking', component: <RankingPage />, restricted: false },
  { path: '/mobile-restriction', component: <MobilePage />, restricted: false },
  { path: '/*', component: <PageNotFoundError /> },
];

const Router = () => {
  const location = useLocation(); // 게임 플레이 페이지를 제외하고 bgm을 재생하기 위한 로직 추가
  const navigate = useNavigate();
  const isMusicRoute =
    !location.pathname.includes('/game-play') &&
    !location.pathname.includes('/lobby') &&
    !location.pathname.includes('/game');
  const UAT = window.localStorage.getItem('UAT');
  const [userIpAtom, setUserIpAtom] = useRecoilState(UserIpAtom);

  useEffect(() => {
    const isMobile = checkIsMobile();
    if (isMobile) {
      navigate('/mobile-restriction');
    } else {
      navigate('/');
    }

    axios.get('https://geolocation-db.com/json/').then((res) => {
      const userIp = res.data.IPv4;
      setUserIpAtom(userIp);

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/member/visit`, {
          userIp,
        })
        .then((response) => response)
        .catch((err) => err);
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes key={0}>
        {PrivatePath.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <PrivateRoute component={item.component} authenticated={UAT} />
            }
          />
        ))}
        {PublicPath.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <PublicRoute
                authenticated={!UAT}
                restricted={item.restricted}
                component={item.component}
              />
            }
          />
        ))}
      </Routes>
      {isMusicRoute && <BgmBtn />}
    </AnimatePresence>
  );
};

export default Router;
