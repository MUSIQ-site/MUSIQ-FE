import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { TempLocationStateGameInfo, UserIpAtom } from '../../atoms/atoms';
import talkBoxImg from '../../assets/img/playgame/horseBaloon.png';
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

type musicDataType = {
  musicId: number;
  musicUrl: string;
};

type answerDataType = {
  title: string;
  singer: string;
};

const FirstMusicStartTime = 0;
const SecondMusicStartTime = 60;
const ThirdMusicStartTime = 120;

export const GuestGamePlaying = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationState, setLocationState] = useRecoilState(
    TempLocationStateGameInfo
  );
  const [userIp, setUserIp] = useRecoilState(UserIpAtom);
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const isToggledRef = useRef<boolean>(false);

  // 게임 데이터
  const [musicData, setMusicData] = useState<musicDataType>({
    musicId: 2,
    musicUrl: 'https://www.youtube.com/watch?v=JeceYRagnQE',
  });
  const [answerData, setAnswerData] = useState<answerDataType>({
    title: '',
    singer: '',
  });

  // 생명, 기회, 게임점수 관련 상태
  const [lives, setLives] = useState<number>(3); // 생명
  const livesRef = useRef<number>(3);
  const [chanceCnt, setChanceCnt] = useState<number>(3); // 기회
  const chanceCntRef = useRef(3);
  const showRoundRef = useRef<number>(0); // 보여주기 위한 게임라운드
  const [round, setRound] = useState<number>(0); // 게임 라운드
  const roundRef = useRef(0);
  const [tryCnt, setTryCnt] = useState<number>(3); // 정답 시도 횟수
  const tryCntRef = useRef<number>(3);

  // 게임 스테이트 관련 상태
  const [firstAttemp, setFirstAttemp] = useState<boolean>(true); // 처음 게임 들어왔는지, 아닌지
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 노래가 나오고있는지, 아닌지
  const isPlayingRef = useRef(false);
  const [isJudge, setIsJudge] = useState<boolean>(false); // 채점중인지 아닌지
  const [isSkip, setIsSkip] = useState<boolean>(false); // 스킵 눌렀는지 아닌지
  const isSkipRef = useRef<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false); // 맞췄는지, 틀렸는지
  const isCorrectRef = useRef(false);
  const [isLose, setIsLose] = useState<boolean>(false); // 졌는지, 안졌는지(결과창으로 라우팅 시 필요)
  const isLoseRef = useRef(false);
  const [isBubbleTime, setIsBubbleTime] = useState<boolean>(false);

  // 버튼, 인풋, 키보드, 유튭 플레이어 관련 상태
  const [btn1isDisabled, setIsBtn1Disabled] = useState<boolean>(false);
  const [btn2isDisabled, setIsBtn2Disabled] = useState<boolean>(false);
  const [btn3isDisabled, setIsBtn3Disabled] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(''); // 정답 담을 state
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

  // back button handler
  const backBtnHandler = () => {
    setIsToggled(true);
    isToggledRef.current = true;
    setModalData({
      data: {
        title: '😥',
        message: '노래 맞추기 게임을 그만 하시겠어요?',
      },
      yesBtnClick: () => {
        setIsToggled(false);
        isToggledRef.current = false;
        navigate('/guest/game-option');
      },
      noBtnClick: () => {
        setIsToggled(false);
        isToggledRef.current = false;
      },
    });
  };

  // 게임 플레이 실행 - 실행 시 버튼 누른거에 따라 해당 시간으로 이동 후 플레이 시켜줌
  const playMusic = (musicStartTime: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(musicStartTime);
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  // 몇 초 뒤에 멈출 지 설정
  const stopAfterSecond = (second = 1000) => {
    if (isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      }, second);
    }
  };

  // 노래듣기 버튼 handler
  // 버튼 클릭하면 노래 시작하고, 기회 감소
  const playBtnHandler = (Time: number) => {
    setFirstAttemp(false);
    playMusic(Time);
    setChanceCnt((prev) => prev - 1);
    chanceCntRef.current -= 1;
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

  // 모르겠어요 버튼 handler
  const dontKnowBtnHandler = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/guest/giveup?room-id=${location.state.gameRoomData.roomId}&round=${round}`
      )
      .then((res) => {
        setLives(0);
        setIsLose(true);
        isLoseRef.current = true;
        setIsJudge(false);
        setIsBubbleTime(false);
        setAnswerData({
          title: res.data.data.title,
          singer: res.data.data.singer,
        });
      })
      .catch((err) => console.log(err));
  };

  const patchGameResult = () => {
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/music/guest/over?room-id=${location.state.gameRoomData.roomId}&round=${roundRef.current}`
      )
      .then((res) => {
        console.log(res);
      });
  };

  // 결과창으로 라우팅
  const goResultPage = () => {
    patchGameResult();
    const resultData = {
      mode: location.state.checkDifficulty.title,
      selectYear: location.state.yearCheckedList,
      correctAnswerCnt: round,
    };
    navigate('/guest/game-result', { state: resultData });
  };

  // 노래 불러오기
  const getMusic = async () => {
    setKeyEvent('');
    setIsSkip(false);
    isSkipRef.current = false;
    setTryCnt(3);
    tryCntRef.current = 3;
    setIsJudge(false);
    setIsBubbleTime(false);

    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/guest/quiz?room-id=${location.state.gameRoomData.roomId}&round=${roundRef.current}`
      )
      .then((res) => {
        setMusicData({
          musicId: res.data.data.musicId,
          musicUrl: res.data.data.musicUrl,
        });
        setIsBtn1Disabled(false);
        setIsBtn2Disabled(false);
        setIsBtn3Disabled(false);
        setChanceCnt(3);
        chanceCntRef.current = 3;
        setIsCorrect(false);
        isCorrectRef.current = false;
      })
      .catch((err) => {
        navigate('/select-mode');
      });
  };

  // 모르겠어요 클릭 시, 현재노래 정답 셋팅, 다음 라운드로 셋팅 (다음문제 불러오기 위해서!)
  const skipBtnHandler = async () => {
    setFirstAttemp(false);
    await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/music/guest/skip?room-id=${location.state.gameRoomData.roomId}&round=${roundRef.current}`
      )
      .then(async (res) => {
        setRound(res.data.data.round);
        roundRef.current = res.data.data.round;
        setAnswerData({
          title: res.data.data.title,
          singer: res.data.data.singer,
        });
      })
      .catch((err) => {
        navigate('/select-mode');
      });
  };

  // 하트가 0개라서 게임 종료 시
  // 스킵 시 하트 감소 다음 문제로 넘어가기
  const skipNextMusic = async () => {
    await skipBtnHandler();
    setKeyEvent('');
    setInputText('');
    setIsJudge(false);
    setIsSkip(true);
    setTryCnt(3);
    tryCntRef.current = 3;
    isSkipRef.current = true;
    setLives((prev) => prev - 1);
    livesRef.current -= 1;
    setIsBubbleTime(false);
  };

  // 채점 맞으면 round 갱신, 틀려도 그냥 가만냅두기
  const activeButtonForJudge = async (answerInputText: string) => {
    setIsBubbleTime(true);
    setIsJudge(true);
    setFirstAttemp(false);
    const encodedInputText = encodeURIComponent(answerInputText);

    // 채점
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/guest/result?room-id=${location.state.gameRoomData.roomId}&round=${round}&answer=${encodedInputText}`
      )
      .then(async (res) => {
        if (res.data.data.isCorrect) {
          setIsCorrect(true);
          isCorrectRef.current = true;
          setIsJudge(false);
          setRound(res.data.data.round);
          roundRef.current = res.data.data.round;
          setAnswerData({
            title: res.data.data.title,
            singer: res.data.data.singer,
          });
        } else if (
          !res.data.data.isCorrect &&
          lives === 1 &&
          tryCntRef.current <= 1
        ) {
          setLives(0);
          setIsLose(true);
          isLoseRef.current = true;
          setIsJudge(false);
          setIsBubbleTime(false);
        } else if (!res.data.data.isCorrect && tryCntRef.current <= 1) {
          skipNextMusic();
          setAnswerData({
            title: res.data.data.title,
            singer: res.data.data.singer,
          });
        } else {
          setTryCnt((prev) => prev - 1);
          tryCntRef.current -= 1;
          setIsJudge(false);
          setAnswerData({
            title: res.data.data.title,
            singer: res.data.data.singer,
          });
        }
      })
      .catch((err) => navigate('/select-mode'));
  };

  // 게임 로그 찍는 요청
  const patchGameLog = () => {
    axios.patch(`${process.env.REACT_APP_BASE_URL}/music/guest/log`, {
      roomId: location.state.gameRoomData.roomId,
      userIp,
    });
  };

  // 처음 입장 시
  useEffect(() => {
    if (!location.state || locationState.difficulty.title === '') {
      navigate('/');
    } else {
      setRound(location.state.gameRoomData.round);
      roundRef.current = location.state.gameRoomData.round;
      getMusic();
      patchGameLog();
    }

    const handleKeyUp = (e: any) => {
      if (
        e.target.nodeName === 'INPUT' ||
        isLoseRef.current ||
        isPlayingRef.current ||
        isToggledRef.current ||
        location.state.gameRoomData.problems === roundRef.current
      ) {
        return;
      }
      if (
        e.key === '.' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        livesRef.current > 1
      ) {
        setFirstAttemp(false);
        skipNextMusic();
        setKeyEvent('');
        setInputText('');
      }
      if (
        e.key === 'ArrowLeft' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        chanceCntRef.current > 0
      ) {
        setFirstAttemp(false);
        playMusic(FirstMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
        setKeyEvent('');
      }
      if (
        e.key === 'ArrowDown' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        chanceCntRef.current > 0
      ) {
        setFirstAttemp(false);
        playMusic(SecondMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
        setKeyEvent('');
      }
      if (
        e.key === 'ArrowRight' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        chanceCntRef.current > 0
      ) {
        setFirstAttemp(false);
        playMusic(ThirdMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
        setKeyEvent('');
      }
      if (e.keyCode === 32 && (isCorrectRef.current || isSkipRef.current)) {
        setFirstAttemp(false);
        getMusic();
        showRoundRef.current += 1;
        setKeyEvent('');
      }
    };

    const handleKeyDown = (e: any) => {
      if (
        e.target.nodeName === 'INPUT' ||
        isLoseRef.current ||
        isPlayingRef.current ||
        isToggledRef.current ||
        location.state.gameRoomData.problems === roundRef.current
      ) {
        return;
      }
      if (
        e.key === '.' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        livesRef.current > 1
      ) {
        setKeyEvent('.');
      }
      if (
        e.key === 'ArrowLeft' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        chanceCntRef.current > 0
      ) {
        setKeyEvent('ArrowLeft');
      }
      if (
        e.key === 'ArrowDown' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        chanceCntRef.current > 0
      ) {
        setKeyEvent('ArrowDown');
      }
      if (
        e.key === 'ArrowRight' &&
        !isCorrectRef.current &&
        !isSkipRef.current &&
        chanceCntRef.current > 0
      ) {
        setKeyEvent('ArrowRight');
      }
      if (e.keyCode === 32 && (isCorrectRef.current || isSkipRef.current)) {
        getMusic();
        showRoundRef.current += 1;
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
        <Modal
          {...modalData}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
        />
        <BackBtn url="/guest/game-option" handleClick={backBtnHandler} />
        <GameExplain />
        {!isCorrect && !isSkip && !isLose ? (
          <ReactPlayer
            url={musicData.musicUrl}
            controls
            playing={isPlaying}
            onPlay={() => {
              stopAfterSecond(location.state.checkDifficulty.time);
            }}
            width="0"
            height="0"
            ref={videoRef}
            volume={1}
          />
        ) : (
          ''
        )}

        <S.TalkBoxPosition>
          {firstAttemp ? (
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

        <S.MiddleContainer>
          <S.GameStatusExplainContainer>
            {location.state.gameRoomData.problems === round ? (
              <p className="explainGame">
                축하드립니다 준비된 모든 라운드가 끝났습니다!
              </p>
            ) : (
              <div>
                {isLose ? (
                  <p className="explainGame">
                    게임이 끝났습니다. 결과를 확인해주세요
                  </p>
                ) : (
                  <p className="explainGame">
                    현재 {showRoundRef.current + 1} 라운드
                  </p>
                )}
              </div>
            )}
          </S.GameStatusExplainContainer>
          {location.state.gameRoomData.problems === round ||
          isCorrect ||
          isLose ||
          isSkip ? (
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
          {isCorrect || isSkip || isLose ? (
            <S.AnswerYouTubePlayerPosition>
              <p>
                {answerData.singer} - {answerData.title}
              </p>
              <ReactPlayer
                url={musicData.musicUrl}
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
                tryCntRef={tryCntRef}
                isCorrect={isCorrect}
                isLose={isLose}
                isJudge={isJudge}
                inputText={inputText}
                setInputText={(e: any) => {
                  setInputText(e);
                }}
                activeButton={activeButtonForJudge}
                setIsInputFocus={setIsInputFocus}
              />
            </>
          )}
          <S.PlayingBtnBoxPosition>
            {isLose || location.state.gameRoomData.problems === round ? (
              <ResultBtn clickHandler={goResultPage} />
            ) : (
              <div>
                {isCorrect || isSkip ? (
                  <NextBtn
                    keyEvent={keyEvent}
                    clickHandler={() => {
                      getMusic();
                      showRoundRef.current += 1;
                    }}
                  />
                ) : (
                  <div>
                    {lives <= 1 && chanceCnt === 0 ? (
                      <DontKnowBtn clickHandler={dontKnowBtnHandler} />
                    ) : (
                      <div>
                        <div className="btnContainer">
                          {playBtnList.map((item) => (
                            <PlayBtn
                              btnName={item.btnName}
                              onClickHandler={item.onClickHandler}
                              isBtnDisabled={chanceCnt <= 0 ? true : isPlaying}
                              key={item.btnName}
                              keyEvent={item.keyEvent}
                            />
                          ))}
                          <SkipBtn
                            clickHandler={skipNextMusic}
                            isBtnDisabled={lives <= 1 || isPlaying}
                            keyEvent={keyEvent}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </S.PlayingBtnBoxPosition>
        </S.MiddleContainer>

        <S.RightSideContainer>
          <S.TopRightSideContainer>
            <OptionBox difficulty={location.state.checkDifficulty.title} />
            <HeartGauge lives={lives} />
          </S.TopRightSideContainer>
          <S.bottomRightSideContainer>
            <ChanceGauge chanceCnt={chanceCnt} />
          </S.bottomRightSideContainer>
        </S.RightSideContainer>
      </S.Container>
    </motion.div>
  );
};
