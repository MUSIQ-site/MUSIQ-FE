import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom';
import { userApis } from '../../hooks/api/userApis';
import {
  MultiGameStatus,
  MultiGameChatting,
  MultiGameHint,
  MultiGameSkip,
  MultiDancingChick,
  MultiGameStart,
  MultiGameOption,
  MultiGameOutBtn,
} from '../../components/features';
import countDownBgm from '../../assets/audio/CountDownMid.wav';
import blindSound from '../../assets/audio/무음.wav';
import * as S from './MultiGamePlaying.styled';
import { Modal } from '../../components/utils';

type GameUserList = {
  nickname: string;
  score: number;
};

type GameChatType = {
  nickname: string;
  message: string;
};

type AnswerDataType = {
  title: string;
  singer: string;
};

type ResultUser = {
  nickname: string;
  score: number;
};

export const MultiGamePlaying = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = window.localStorage.getItem('userAccessToken') ?? '';
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const isOutButtonClickRef = useRef<boolean>(false);
  const client = useRef<any>({}); // 게임 소켓 클라이언트
  const gameRoomNumber = Number(location.pathname.split('/')[4]); // 게임방번호
  const [gameChatList, setGameChatList] = useState<GameChatType[]>([]); // 채팅리스트
  const [gameUserList, setGameUserList] = useState<GameUserList[]>([]); // 유저리스트

  const [manager, setManager] = useState<string>(''); // 내가 게임방의 매니저인지 아닌지
  const managerRef = useRef<string>('');
  const [playTime, setPlayTime] = useState<number>(5); // 플레이타임
  const [playTimeMessage, setPlayTimeMessage] = useState<string>('');
  const [isMusicStart, setIsMusicStart] = useState<boolean>(false); // 음악이 시작되었는지 아닌지
  const isMusicStartRef = useRef<boolean>(false);
  const [isGameStart, setIsGameStart] = useState<boolean>(false); // 게임 시작되었는지 아닌지

  const [remainMusicNum, setRemainMusicNum] = useState<number>(
    location.state.requestBody.quizAmount
  );
  const [initialHint, setInitialHint] = useState<string>(''); // 초성힌트
  const [singerHint, setSingerHint] = useState<string>(''); // 가수힌트
  const [winner, setWinner] = useState<string>(''); // 우승자가 없을때는 '', 있을때는 string
  const [answerData, setAnswerData] = useState<AnswerDataType>({
    title: '',
    singer: '',
  }); // 정답 제목, 가수
  const [musicUrl, setMusicUrl] = useState<string>('');
  const videoRef = useRef<ReactPlayer>(null);
  const [isResult, setIsResult] = useState<boolean>(false); // 결과페이지인지 아닌지
  const isResultRef = useRef<boolean>(false);
  const [resultUser, setResultUser] = useState<ResultUser[]>([]);
  const [skipVote, setSkipVote] = useState<number>(0);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [speakChick, setSpeakChick] = useState<GameChatType>({
    nickname: '삐약이',
    message: '게임 대기중...',
  });

  // 카운트다운 음악객체 생성
  const myAudio = new Audio(); // Aduio 객체 생성
  myAudio.volume = 0.1;
  myAudio.src = countDownBgm; // 음원 파일 설정

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

  // 게임 로그 찍기
  const postGameStart = () => {
    userApis
      .post(`${process.env.REACT_APP_BASE_URL}/game/start`, {
        multiModeCreateGameRoomLogId:
          location.state.requestBody.multiModeCreateGameRoomLogId,
        gameRoomNumber,
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postGameEnd = () => {
    userApis
      .post(`${process.env.REACT_APP_BASE_URL}/game/over`, {
        multiModeCreateGameRoomLogId:
          location.state.requestBody.multiModeCreateGameRoomLogId,
        gameRoomNumber,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 게임 시작, 끝난 후 로그 찍기
  useEffect(() => {
    if (window.localStorage.getItem('nickname') === managerRef.current) {
      if (isGameStart) {
        postGameStart();
      } else if (isResult) {
        postGameEnd();
      }
    }
  }, [isGameStart]);

  // 모바일 기기 접근을 막는 로직
  useEffect(() => {
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
    client.current.subscribe(`/topic/${gameRoomNumber}`, (message: any) => {
      const msg = JSON.parse(message.body);

      switch (msg.messageType) {
        case 'ENTERUSER': // 유저 입장 시 마다 pub
          setGameUserList(msg.userInfoItems);
          setManager(msg.gameRoomManagerNickname);
          managerRef.current = msg.gameRoomManagerNickname;
          setGameChatList((prev) => [
            ...prev,
            {
              nickname: '삐약이',
              message: `${msg.enteredUserNickname}님이 입장하셨습니다.`,
            },
          ]);
          setSpeakChick({
            nickname: '삐약이',
            message: `${msg.enteredUserNickname}님이 입장하셨습니다.`,
          });
          break;
        case 'EXITUSER': // 유저 나갈 때 pub
          setGameUserList(msg.userInfoItems);
          setManager(msg.gameRoomManagerNickname);
          if (msg.gameRoomManagerNickname === managerRef.current) {
            setGameChatList((prev) => [
              ...prev,
              {
                nickname: '삐약이',
                message: `${msg.exitedUserNickname}님이 퇴장하셨습니다.`,
              },
            ]);
          } else {
            setGameChatList((prev) => [
              ...prev,
              {
                nickname: '삐약이',
                message: `${msg.exitedUserNickname}님이 퇴장하셨습니다.`,
              },
              {
                nickname: '삐약이',
                message: `방장이 ${msg.gameRoomManagerNickname}님으로 변경되었습니다.`,
              },
            ]);
            setSpeakChick({
              nickname: '삐약이',
              message: `방장이 ${msg.gameRoomManagerNickname}님으로 변경되었습니다.`,
            });
          }
          managerRef.current = msg.gameRoomManagerNickname;
          break;
        case 'CHAT': // 유저가 채팅 보냈을 때
          if (msg.message === '.' && isMusicStartRef.current) {
            setGameChatList((prev) => [
              ...prev,
              {
                nickname: '삐약이',
                message: `${msg.nickname}님 스킵투표되었습니다.`,
              },
            ]);
          } else {
            setGameChatList((prev) => [
              ...prev,
              { nickname: msg.nickname, message: msg.message },
            ]);
          }
          break;
        case 'GAMESTART': // 게임 시작 버튼 클릭시
          setIsGameStart(true);
          setSpeakChick({
            nickname: '삐약이',
            message: '게임이 시작됐다!',
          });
          break;
        case 'TIME': // 시간초세기
          setPlayTime(msg.time);
          setPlayTimeMessage(msg.message);
          if (
            !isMusicStartRef.current &&
            !isResultRef.current &&
            msg.time <= 3
          ) {
            myAudio.play();
          }
          break;
        case 'MUSICPROBLEM': // 음악 문제 세팅
          setAnswerData({ title: msg.title, singer: msg.singer });
          setWinner(msg.winner);
          setSingerHint(msg.singerHint);
          setInitialHint(msg.initialHint);
          setMusicUrl(msg.musicUrl);
          setRemainMusicNum((prev) => prev - 1);
          setSkipVote(msg.skipVote);
          setIsSkipped(false);
          break;
        case 'SINGERHINT': // 가수힌트
          setSingerHint(msg.singerHint);
          setGameChatList((prev) => [
            ...prev,
            { nickname: '삐약이', message: '가수힌트가 나왔어요 삐약' },
          ]);
          setSpeakChick({
            nickname: '삐약이',
            message: '가수힌트가 나왔어요 삐약',
          });
          break;
        case 'INITIALHINT': // 초성힌트
          setInitialHint(msg.initialHint);
          setGameChatList((prev) => [
            ...prev,
            { nickname: '삐약이', message: '초성힌트가 나왔어요 삐약' },
          ]);
          setSpeakChick({
            nickname: '삐약이',
            message: '초성힌트가 나왔어요 삐약',
          });
          break;
        case 'BEFORESKIP': // 누군가 문제 맞추기 전 스킵요청
          if (msg.winner) {
            setWinner(msg.winner);
            setAnswerData({ title: msg.title, singer: msg.singer });
            setSingerHint(msg.singerHint);
            setInitialHint(msg.initialHint);
            setSkipVote(msg.skipVote);
            setIsSkipped(msg.isSkipped);
            setGameUserList(msg.memberInfos);
          } else if (msg.isSkipped) {
            setSkipVote(msg.skipVote);
            setIsSkipped(msg.isSkipped);
          } else {
            setSkipVote(msg.skipVote);
            setIsSkipped(msg.isSkipped);
          }
          break;
        case 'AFTERSKIP': // 문제 맞춘 후 스킵요청
          setSkipVote(msg.skipVote);
          setIsSkipped(msg.isSkipped);
          break;
        case 'BEFOREANSWERCORRECT': // 정답 맞췄을때 누가 정답맞췄고, 정답이 뭔지
          setAnswerData({ title: msg.title, singer: msg.singer });
          setSingerHint(msg.singerHint);
          setInitialHint(msg.initialHint);
          setSkipVote(msg.skipVote);
          setWinner(msg.winner);
          if (msg.winner !== '') {
            setGameChatList((prev) => [
              ...prev,
              {
                nickname: '삐약이',
                message: `${msg.winner}님이 정답을 맞추셨습니다 삐약!`,
              },
            ]);
            setSpeakChick({
              nickname: '삐약이',
              message: `${msg.winner}님이 정답을 맞추셨습니다 삐약!`,
            });
            setGameUserList(msg.memberInfos);
          }

          break;
        case 'MUSICPLAY': // 노래 시작 타이밍
          blindMusicTitlePlay();
          setIsMusicStart(msg.musicPlay);
          isMusicStartRef.current = msg.musicPlay;
          break;
        case 'MUSICEND': // 노래 끝
          blindMusicTitleStop();
          setIsMusicStart(msg.musicPlay);
          isMusicStartRef.current = msg.musicPlay;
          break;
        case 'GAMERESULT':
          setIsResult(true);
          isResultRef.current = true;
          setResultUser(msg.userResults);
          setSpeakChick({
            nickname: '삐약이',
            message: '게임이 끝났다 삐약!',
          });
          if (window.localStorage.getItem('nickname') === managerRef.current) {
            postGameEnd();
          }
          break;
        case 'GOWAITING': // 게임 끝났을 때 대기상태로 다시 변환
          setIsGameStart(false);
          setIsResult(false);
          isResultRef.current = false;
          setIsSkipped(false);
          setIsMusicStart(false);
          isMusicStartRef.current = false;
          setWinner('');
          setAnswerData({ title: '', singer: '' });
          setGameUserList(msg.memberInfos);
          setRemainMusicNum(msg.numberOfProblems);
          setInitialHint('');
          setSingerHint('');
          setSkipVote(0);
          setSpeakChick({
            nickname: '삐약이',
            message: '대기중입니다.. 삐약!',
          });
          break;
        default:
          break;
      }
    });
  };

  // 소켓 연결
  const connect = async () => {
    client.current = await new StompJs.Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        accessToken,
        channelNo: String(gameRoomNumber),
        connectType: 'ENTER_GAME_ROOM',
        password: location.state.requestBody.password,
      },
      onConnect: subscribe,
      onStompError: (frame) => {
        console.error('STOMP Error:', frame.headers.message);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  // 게임방 나가기
  const patchOutGameRoom = async () => {
    await userApis
      .patch(`${process.env.REACT_APP_BASE_URL}/game/main/exit`, {
        previousChannelNo: gameRoomNumber,
      })
      .then((res) => {
        navigate(`/multi/${res.data.data.destinationChannelNo}/lobby`);
        setIsToggled(false);
      });
  };

  // 첫 렌더링 시 소켓연결, 페이지 떠날 시 disconnect
  useEffect(() => {
    connect();
    setGameUserList(location.state.requestBody.data.userInfoItems);
    setManager(location.state.requestBody.data.gameRoomManagerNickname);
    managerRef.current =
      location.state.requestBody.data.gameRoomManagerNickname;
    setGameChatList((prev) => [
      ...prev,
      {
        nickname: '삐약이',
        message: `${location.state.requestBody.data.enteredUserNickname}님이 입장하셨습니다.`,
      },
    ]);
    return () => {
      disconnect();
      if (!isOutButtonClickRef.current) {
        patchOutGameRoom();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Modal
        data={{
          title: '😥',
          message: '정말 게임방을 나가시겠어요?',
        }}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
        noBtnClick={() => {
          setIsToggled(false);
        }}
        yesBtnClick={() => {
          isOutButtonClickRef.current = true;
          patchOutGameRoom();
        }}
      />
      <ReactPlayer
        url={musicUrl}
        controls
        playing={isMusicStart}
        width="0"
        height="0"
        ref={videoRef}
      />
      <S.Container>
        <MultiGameOption years={location.state.requestBody.musicYear} />
        <MultiGameStatus gameUserList={gameUserList} manager={manager} />
        <S.topPosition>
          <S.ExplainBox>
            {isResult ? (
              <div className="result">
                <h1>결과</h1>
                <ul>
                  {resultUser.map((user, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index}>
                      {index + 1}등 {user.nickname} - {user.score}{' '}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                {isGameStart ? (
                  <MultiGameHint
                    playTimeMessage={playTimeMessage}
                    isSkipped={isSkipped}
                    winner={winner}
                    isResult={isResult}
                    isMusicStart={isMusicStart}
                    answerData={answerData}
                    remainMusic={remainMusicNum}
                    totalMusic={location.state.requestBody.quizAmount}
                    time={playTime}
                    singerHint={singerHint}
                    initialHint={initialHint}
                  />
                ) : (
                  <div className="waitingBox">
                    <p className="waiting">...게임 대기중입니다</p>
                    {manager === window.localStorage.getItem('nickname') ? (
                      <MultiGameStart socketClient={client} />
                    ) : (
                      <p>방장이 게임을 시작할때까지 기다려주세요</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </S.ExplainBox>
        </S.topPosition>
        <S.middlePosition>
          <MultiGameSkip
            gameStatus={isGameStart}
            isResult={isResult}
            time={playTime}
          />
        </S.middlePosition>
        <S.bottomPosition>
          <MultiGameOutBtn
            patchOutGameRoom={() => {
              setIsToggled(true);
            }}
          />
          <MultiDancingChick speakChick={speakChick} />
          <MultiGameChatting
            userLength={gameUserList.length}
            skipVote={skipVote}
            gameChatList={gameChatList}
            setGameChatList={setGameChatList}
            socketClient={client}
          />
        </S.bottomPosition>
      </S.Container>
    </motion.div>
  );
};
