import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledBgmBtn, ExplainBox, Container } from './BgmBtn.styled';
import playButton from '../../../assets/svgs/bgmController/playButton.svg';
import muteButton from '../../../assets/svgs/bgmController/muteButton.svg';
import { LoginRouterBtn } from '../Login';

export const BgmBtn = () => {
  const isLogin = Boolean(window.localStorage.getItem('userAccessToken'));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState<number>(3);

  const location = useLocation(); // 게임 플레이 페이지를 제외하고 bgm을 재생하기 위한 로직 추가
  const isLoginRoute = location.pathname.includes('/select-mode');

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);

  return (
    <Container>
      <audio ref={audioRef} loop>
        <source src="/assets/bgm/pixelLand.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>
      {isLoginRoute ? <LoginRouterBtn isLogin={isLogin} /> : ''}
      <StyledBgmBtn type="button" onClick={handlePlayPause}>
        <img
          src={isPlaying ? playButton : muteButton}
          alt={isPlaying ? 'Mute' : 'Play'}
          width={100}
          className="megaphone"
        />
        <ExplainBox time={time}>
          <p>배경음악을 틀어보세요!</p>
          <p>이 알림은 {time}초후에 사라집니다</p>
        </ExplainBox>
      </StyledBgmBtn>
    </Container>
  );
};
