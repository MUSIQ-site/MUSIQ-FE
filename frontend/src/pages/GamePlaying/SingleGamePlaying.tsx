/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { TempLocationStateGameInfo, UserIpAtom } from '../../atoms/atoms';
import talkBoxImg from '../../assets/img/playgame/horseBaloon.png';
import { userApis } from '../../hooks/api/userApis';
import {
  OptionBox,
  DancingChick,
  AnswerInput,
  HeartGauge,
  ChanceGauge,
  PlayBtn,
  SkipBtn,
  NextBtn,
  ResultBtn,
  DontKnowBtn,
  GameExplain,
} from '../../components/features';
import { BackBtn, Modal } from '../../components/utils';
import * as S from './GamePlaying.styled';
import blindSound from '../../assets/audio/무음.wav';

export const SingleGamePlaying = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Modal 관련 상태()
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick: () => void;
    yesBtnClick: () => void;
  }>({
    data: { title: '', message: '' },
    noBtnClick: () => {},
    yesBtnClick: () => {},
  });
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const isToggledRef = useRef<boolean>(false);

  // 게임 방 정보(난이도, 몇 라운드인지)
  const gameDifficulty = location.state.difficulty;
  const [round, setRound] = useState<number>(location.state.round);
  const roundRef = useRef(0);

  // 유저의 목숨 관련 정보
  // life: 생명, listenNum: 남은 듣기 횟수 , tryNum: 남은 정답입력 기회
  const [life, setlife] = useState<number>(location.state.life);
  const lifeRef = useRef<number>(location.state.life);
  const [listenNum, setListennum] = useState<number>(location.state.listenNum);
  const listenNumRef = useRef<number>(listenNum);
  const [tryNum, setTryNum] = useState<number>(location.state.tryNum);
  const tryNumRef = useRef<number>(tryNum);

  // 정답을 담을 상태
  const [answer, setAnswer] = useState<string>(''); // 정답 담을 state

  // 제목없는 음원으로 미디어 플레이어 제목 가리기
  navigator.mediaSession.metadata = new MediaMetadata({});
  const aud = new Audio(`${blindSound}`);
  const blindMusicTitlePlay = () => {
    aud.volume = 0;
    aud.loop = true;
    aud.play();
  };

  // 모바일 기기 접근을 막기 위해 추가한 코드
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

  const blindMusicTitleStop = () => {
    aud.pause();
  };

  // 뒤로가기 버튼 이벤트핸들러
  const backBtnHandler = () => {
    setIsToggled(true);
    isToggledRef.current = true;
    setModalData({
      data: {
        title: '😥',
        message: '노래 맞추기 게임을 그만 하시겠어요?',
      },
      yesBtnClick: async () => {
        setIsToggled(false);
        isToggledRef.current = false;
        navigate('/select-mode');
      },
      noBtnClick: () => {
        setIsToggled(false);
        isToggledRef.current = false;
      },
    });
  };

  // ///////////////////////////////////// 싱글모드 api /////////////////////////////////////
  // 음악 재생 가능 여부 체크
  const getIsMusicPlaying = async () => {
    await userApis.get(
      `${process.env.REACT_APP_BASE_URL}/music/single/v2/listencheck`
    );
  };

  // 정답 채점
  const getMarkAnswer = async () => {
    await userApis.get(
      `${process.env.REACT_APP_BASE_URL}/music/single/v2/answercheck?answer=${answer}`
    );
  };

  // 스킵
  const patchSkip = async () => {
    await userApis.patch(
      `${process.env.REACT_APP_BASE_URL}/music/single/v2/skip`
    );
  };

  // 라운드 종료
  const getRoundOver = async () => {
    await userApis.get(
      `${process.env.REACT_APP_BASE_URL}/music/single/v2/roundend`
    );
  };

  // 다음문제
  const getNextRound = async () => {
    await userApis.get(
      `${process.env.REACT_APP_BASE_URL}/music/single/v2/nextround`
    );
  };

  // 게임 종료
  const deleteGameOver = async () => {
    await userApis.delete(
      `${process.env.REACT_APP_BASE_URL}/music/single/v2/gameover`
    );
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return !location.state ? (
    <div />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <S.Container>
        {/* 모달 */}
        <Modal
          {...modalData}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
        />
        {/* 뒤로가기 버튼 */}
        <BackBtn url="/single/game-option" handleClick={backBtnHandler} />
        {/* 좌측 하단 게임 설명 컴포넌트 */}
        <GameExplain />

        {/* 가운데 게임 진행 알림, 병아리, 정답입력 인풋, 버튼 컴포넌트 */}
        <S.MiddleContainer>
          <DancingChick />
        </S.MiddleContainer>

        {/* 우측 게임옵션, 하트, 헤드폰 컴포넌트 */}
        <S.RightSideContainer>
          <S.TopRightSideContainer>
            <OptionBox difficulty={gameDifficulty} />
            <HeartGauge lives={life} />
          </S.TopRightSideContainer>
          <S.bottomRightSideContainer>
            <ChanceGauge chanceCnt={listenNum} />
          </S.bottomRightSideContainer>
        </S.RightSideContainer>
      </S.Container>
    </motion.div>
  );
};
