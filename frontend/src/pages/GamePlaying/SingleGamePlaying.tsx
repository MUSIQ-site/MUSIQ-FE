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

type answerDataType = {
  title: string;
  singer: string;
};

type gameResultDataType = {
  mode: string;
  selectYear: string[];
  correctAnswerCnt: number;
  exp: number;
};

const FirstMusicStartTime = 0;
const SecondMusicStartTime = 60;
const ThirdMusicStartTime = 120;

export const SingleGamePlaying = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userIp, setUserIp] = useRecoilState(UserIpAtom);

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
  const [playTime, setPlayTime] = useState<number>(5000);

  // 유저의 목숨 관련 정보
  // life: 생명, listenNum: 남은 듣기 횟수 , tryNum: 남은 정답입력 기회
  const [life, setlife] = useState<number>(location.state.life);
  const lifeRef = useRef<number>(location.state.life);
  const [listenNum, setListennum] = useState<number>(location.state.listenNum);
  const listenNumRef = useRef<number>(listenNum);
  const [tryNum, setTryNum] = useState<number>(location.state.tryNum);
  const tryNumRef = useRef<number>(tryNum);

  // 게임 스테이트 관련 상태
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 노래가 나오고있는지, 아닌지
  const isPlayingRef = useRef(false);
  const [isJudge, setIsJudge] = useState<boolean>(false); // 채점중인지 아닌지
  const [isSkip, setIsSkip] = useState<boolean>(false); // 스킵 눌렀는지 아닌지
  const isSkipRef = useRef<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(true); // 처음 게임 들어왔는지, 아닌지
  const [isCorrect, setIsCorrect] = useState<boolean>(false); // 맞췄는지, 틀렸는지
  const isCorrectRef = useRef(false);
  const [isLose, setIsLose] = useState<boolean>(false); // 졌는지, 안졌는지(결과창으로 라우팅 시 필요)
  const isLoseRef = useRef(false);
  const [endRound, setEndRound] = useState<boolean>(false); // 해당 라운드가 종료되었는지 (게임종료 X)
  const endRoundRef = useRef<boolean>(false);
  const [isBubbleTime, setIsBubbleTime] = useState<boolean>(false); // 말풍선이 말해도되는지 아닌지
  const [isGameDone, setIsGameDone] = useState<boolean>(false); // 게임이 종료되었는가
  const isGameDoneRef = useRef<boolean>(false);
  const [gameResultData, setGameResultData] = useState<gameResultDataType>({
    mode: '',
    selectYear: [''],
    correctAnswerCnt: 0,
    exp: 0,
  });

  // 유저의 정답을 담을 상태
  const [answer, setAnswer] = useState<string>(''); // 정답 담을 state

  // 게임 데이터 (음악 url, 가수 및 제목)
  const [musicUrl, setMusicUrl] = useState<string>(location.state.musicUrl);
  const [answerData, setAnswerData] = useState<answerDataType>({
    title: '',
    singer: '',
  });

  // 버튼, 인풋, 키보드, 유튭 플레이어 관련 상태
  const [btn1isDisabled, setIsBtn1Disabled] = useState<boolean>(false);
  const [btn2isDisabled, setIsBtn2Disabled] = useState<boolean>(false);
  const [btn3isDisabled, setIsBtn3Disabled] = useState<boolean>(false);
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const [keyEvent, setKeyEvent] = useState<string>('');
  const videoRef = useRef<ReactPlayer>(null);

  // 제목없는 음원으로 미디어 플레이어 제목 가리기
  navigator.mediaSession.metadata = new MediaMetadata({});
  const aud = new Audio(`${blindSound}`);
  const blindMusicTitlePlay = () => {
    aud.volume = 0;
    aud.loop = true;
    aud.play();
  };
  const blindMusicTitleStop = () => {
    aud.pause();
  };

  // 게임 플레이 실행 - 실행 시 버튼 누른거에 따라 해당 시간으로 이동 후 플레이 시켜줌
  const playMusic = (musicStartTime: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(musicStartTime);
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  // ///////////////////////////////////// 싱글모드 api /////////////////////////////////////
  // 음악 재생 가능 여부 체크
  const getIsMusicPlaying = async (time: number) => {
    await userApis
      .get(`${process.env.REACT_APP_BASE_URL}/music/single/v2/listencheck`)
      .then((res) => {
        if (res.data.data.isAvail) {
          const resListenNum = res.data.data.listenNum;
          setListennum(resListenNum);
          listenNumRef.current = resListenNum;
          playMusic(time);
        } else {
          setListennum(0);
          listenNumRef.current = 0;
        }
      });
  };

  // 게임 종료
  const deleteGameOver = async () => {
    await userApis
      .delete(`${process.env.REACT_APP_BASE_URL}/music/single/v2/gameover`)
      .then((res) => {
        setIsGameDone(true);
        isGameDoneRef.current = true;
        setGameResultData({
          mode: res.data.data.difficulty,
          selectYear: res.data.data.year.split(' '),
          correctAnswerCnt: res.data.data.round,
          exp: 0,
        });
      });
  };

  // 라운드 종료
  const getRoundOver = async () => {
    await userApis
      .get(`${process.env.REACT_APP_BASE_URL}/music/single/v2/roundend`)
      .then(async (res) => {
        setAnswerData({
          title: res.data.data.title,
          singer: res.data.data.singer,
        });
        setEndRound(true);
        endRoundRef.current = true;
        setIsBubbleTime(false);
        setlife(res.data.data.life);
        lifeRef.current = res.data.data.life;
        if (res.data.data.isGameOver) {
          await deleteGameOver();
        }
      });
  };

  // 정답 채점
  const getMarkAnswer = async (userAnswer: string) => {
    setIsJudge(true);
    setIsReady(false);
    setIsBubbleTime(true);
    const encodedInputText = encodeURIComponent(userAnswer);
    await userApis
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/single/v2/answercheck?answer=${encodedInputText}`
      )
      .then(async (res) => {
        if (res.data.data.isEnded || res.data.data.tryNum === 0) {
          await getRoundOver();
        }
        setTryNum(res.data.data.tryNum);
        tryNumRef.current = res.data.data.tryNum;
        if (res.data.data.isCorrect) {
          setIsCorrect(res.data.data.isCorrect);
          isCorrectRef.current = res.data.data.isCorrect;
        } else {
          setIsLose(!res.data.data.isCorrect);
          isLoseRef.current = !res.data.data.isCorrect;
        }
        setIsJudge(false);
      })
      .catch((err) => {
        setIsJudge(false);
      });
  };

  // 스킵
  const patchSkip = async () => {
    await userApis
      .patch(`${process.env.REACT_APP_BASE_URL}/music/single/v2/skip`)
      .then(async (res) => {
        setIsSkip(res.data.data.isSkipped);
        isSkipRef.current = res.data.data.isSkipped;
        await getRoundOver();
      });
  };

  // 다음문제
  const getNextRound = async () => {
    await userApis
      .get(`${process.env.REACT_APP_BASE_URL}/music/single/v2/nextround`)
      .then((res) => {
        setIsJudge(false);
        setIsSkip(false);
        isSkipRef.current = false;
        setIsCorrect(false);
        isCorrectRef.current = false;
        setIsLose(false);
        isLoseRef.current = false;
        setEndRound(false);
        endRoundRef.current = false;
        setListennum(res.data.data.listenNum);
        listenNumRef.current = res.data.data.listenNum;
        setTryNum(res.data.data.tryNum);
        tryNumRef.current = res.data.data.tryNum;
        setRound(res.data.data.round);
        roundRef.current = res.data.data.round;
        setMusicUrl(res.data.data.musicUrl);
        setAnswerData({
          title: '',
          singer: '',
        });
      });
  };

  // 몇 초 뒤에 멈출 지 설정
  const stopAfterSecond = (second: number) => {
    if (isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      }, second);
    }
  };

  // 노래듣기 버튼 handler
  const playBtnHandler = async (Time: number) => {
    await getIsMusicPlaying(Time);
    setIsReady(false);
  };

  // 버튼 리스트
  const playBtnList = [
    {
      btnName: 'firstMusicPlayKey',
      onClickHandler: () => {
        playBtnHandler(FirstMusicStartTime);
      },
      isBtnDisabled: btn1isDisabled,
      keyEvent,
    },
    {
      btnName: 'middleMusicPlayKey',
      onClickHandler: () => {
        playBtnHandler(SecondMusicStartTime);
      },
      isBtnDisabled: btn2isDisabled,
      keyEvent,
    },
    {
      btnName: 'endMusicPlayKey',
      onClickHandler: () => {
        playBtnHandler(ThirdMusicStartTime);
      },
      isBtnDisabled: btn3isDisabled,
      keyEvent,
    },
  ];

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

  // 결과창으로 라우팅
  const goResultPage = async () => {
    navigate('/single/game-result', { state: gameResultData });
  };

  // 게임 로그 찍는 요청
  const patchGameLog = () => {
    userApis.patch(`${process.env.REACT_APP_BASE_URL}/music/single/log`, {
      roomId: location.state.gameRoomData.roomId,
      userIp,
    });
  };

  // 처음 렌더링 시
  useEffect(() => {
    switch (location.state.difficulty) {
      case 'EASY':
        setPlayTime(3000);
        break;
      case 'NORMAL':
        setPlayTime(2000);
        break;
      case 'HARD':
        setPlayTime(1000);
        break;
      case 'CRAZY':
        setPlayTime(500);
        break;
      default:
        break;
    }
    // patchGameLog();
    const handleKeyUp = (e: any) => {
      if (
        e.target.nodeName === 'INPUT' ||
        isPlayingRef.current ||
        isToggledRef.current
      ) {
        return;
      }
      if (e.key === '.' && lifeRef.current > 1 && !endRoundRef.current) {
        setIsReady(false);
        patchSkip();
        setKeyEvent('');
      }
      if (
        e.key === 'ArrowLeft' &&
        listenNumRef.current > 0 &&
        !endRoundRef.current
      ) {
        setIsReady(false);
        getIsMusicPlaying(FirstMusicStartTime);
        setKeyEvent('');
      }
      if (
        e.key === 'ArrowDown' &&
        listenNumRef.current > 0 &&
        !endRoundRef.current
      ) {
        setIsReady(false);
        getIsMusicPlaying(SecondMusicStartTime);
        setKeyEvent('');
      }
      if (
        e.key === 'ArrowRight' &&
        listenNumRef.current > 0 &&
        !endRoundRef.current
      ) {
        setIsReady(false);
        getIsMusicPlaying(ThirdMusicStartTime);
        setKeyEvent('');
      }
      if (
        e.keyCode === 32 &&
        (isCorrectRef.current || isSkipRef.current) &&
        !isGameDoneRef.current
      ) {
        setIsReady(false);
        getNextRound();
        setKeyEvent('');
      }
    };

    const handleKeyDown = (e: any) => {
      if (
        e.target.nodeName === 'INPUT' ||
        isPlayingRef.current ||
        isToggledRef.current
      ) {
        return;
      }
      if (e.key === '.' && lifeRef.current > 1 && !endRoundRef.current) {
        setKeyEvent('.');
      }
      if (
        e.key === 'ArrowLeft' &&
        listenNumRef.current > 0 &&
        !endRoundRef.current
      ) {
        setKeyEvent('ArrowLeft');
      }
      if (
        e.key === 'ArrowDown' &&
        listenNumRef.current > 0 &&
        !endRoundRef.current
      ) {
        setKeyEvent('ArrowDown');
      }
      if (
        e.key === 'ArrowRight' &&
        listenNumRef.current > 0 &&
        !endRoundRef.current
      ) {
        setKeyEvent('ArrowRight');
      }
      if (
        e.keyCode === 32 &&
        (isCorrectRef.current || isSkipRef.current) &&
        !isGameDoneRef.current
      ) {
        getNextRound();
        setKeyEvent('');
      }
    };

    const preventRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('beforeunload', preventRefresh);
    window.addEventListener('keydown', handleKeyDown);
    blindMusicTitlePlay();

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('beforeunload', preventRefresh);
      window.removeEventListener('keydown', handleKeyDown);
      blindMusicTitleStop();
    };
  }, []);

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
        {!endRound ? (
          <ReactPlayer
            url={musicUrl}
            controls
            playing={isPlaying}
            onPlay={() => {
              // 플레이 시간 추가해야함
              stopAfterSecond(playTime);
            }}
            width="0"
            height="0"
            ref={videoRef}
            volume={1}
          />
        ) : (
          ''
        )}

        {/* 말풍선 */}
        <S.TalkBoxPosition>
          {isReady ? (
            <S.TalkBoxContainer>
              <img src={talkBoxImg} alt="말풍선" width={200} />
              <p className="firstAttempGame1">게임이 시작되었어요</p>
              <p className="firstAttempGame2">키보드를 눌러</p>
              <p className="firstAttempGame3">노래를 들어보세요</p>
            </S.TalkBoxContainer>
          ) : (
            <div>
              {isBubbleTime ? (
                <div>
                  {isJudge ? (
                    <S.TalkBoxContainer>
                      <img src={talkBoxImg} alt="말풍선" width={200} />
                      <p className="judgeText">채점중</p>
                    </S.TalkBoxContainer>
                  ) : (
                    <S.TalkBoxContainer>
                      <img src={talkBoxImg} alt="말풍선" width={200} />
                      <p className="judgeText">
                        {isCorrect ? '정답!' : '오답 X!'}
                      </p>
                    </S.TalkBoxContainer>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </S.TalkBoxPosition>
        <div className="emptyBox" />

        {/* 가운데 게임 진행 알림, 병아리, 정답입력 인풋, 버튼 컴포넌트 */}
        <S.MiddleContainer>
          <S.GameStatusExplainContainer>
            {isGameDone ? (
              <p className="explainGame">
                게임이 끝났습니다. 결과를 확인해주세요
              </p>
            ) : (
              <p className="explainGame">현재 {round} 라운드</p>
            )}
          </S.GameStatusExplainContainer>
          {endRound ? (
            ''
          ) : (
            <div>
              {isInputFocus ? (
                <S.GameStatusExplainContainer>
                  <p className="gameStatus">정답을 입력해삐약</p>
                </S.GameStatusExplainContainer>
              ) : (
                <S.GameStatusExplainContainer>
                  <p className="gameStatus">노래를 들어봐삐약</p>
                </S.GameStatusExplainContainer>
              )}
            </div>
          )}
          {endRound ? (
            <S.AnswerYouTubePlayerPosition>
              <p>
                {answerData.singer} - {answerData.title}
              </p>
              <ReactPlayer
                url={musicUrl}
                controls
                playing
                width="300px"
                height="340px"
                ref={videoRef}
                volume={1}
              />
            </S.AnswerYouTubePlayerPosition>
          ) : (
            <>
              <DancingChick />
              <AnswerInput
                tryCntRef={tryNumRef}
                isCorrect={isCorrect} // 맞았는지
                isLose={isLose} // 졌는지
                isJudge={isJudge} // 채점중인지 아닌지
                inputText={answer}
                setInputText={(e: any) => {
                  setAnswer(e);
                }}
                activeButton={getMarkAnswer} // 채점
                setIsInputFocus={setIsInputFocus} // 엔터치면 인풋 포커스
              />
            </>
          )}
          <S.PlayingBtnBoxPosition>
            {/* 게임종료되었으면 결과 버튼만 렌더링 */}
            {isGameDone ? (
              <ResultBtn
                clickHandler={async () => {
                  await goResultPage();
                }}
              />
            ) : (
              <>
                {/* 정답이거나, 스킵을 눌렀을때는 다음으로 가기 버튼 렌더링 */}
                {isCorrect || isSkip || tryNum === 0 ? (
                  <NextBtn
                    keyEvent={keyEvent}
                    clickHandler={async () => {
                      await getNextRound();
                    }}
                  />
                ) : (
                  <div>
                    {/* 남은 생명과 듣기기회에 따라서 모르겠어요 버튼 , 기본 플레이와 스킵버튼 */}
                    {life <= 1 && listenNum === 0 ? (
                      <DontKnowBtn clickHandler={patchSkip} />
                    ) : (
                      <div>
                        <div className="btnContainer">
                          {playBtnList.map((item) => (
                            <PlayBtn
                              btnName={item.btnName}
                              onClickHandler={item.onClickHandler}
                              isBtnDisabled={listenNum <= 0 || isPlaying}
                              key={item.btnName}
                              keyEvent={item.keyEvent}
                            />
                          ))}
                          <SkipBtn
                            clickHandler={patchSkip}
                            isBtnDisabled={life <= 1 || isPlaying}
                            keyEvent={keyEvent}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </S.PlayingBtnBoxPosition>
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
