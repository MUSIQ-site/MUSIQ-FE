import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { ActiveCarouselNumAtom } from '../../atoms/atoms';
import * as S from './Landing.styled';
import { Logo } from '../../components/utils';
import {
  FadeInFromBottom,
  Blink,
  Enlarge,
} from '../../components/animationEffect';

export const Landing = () => {
  const [activeCarouselNum, setActiveCarouselNum] = useRecoilState(
    ActiveCarouselNumAtom
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(window.localStorage.getItem('userAccessToken'))
  ); // 로그인 검증
  const navigate = useNavigate();

  useEffect(() => {
    // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }

    setActiveCarouselNum({ activeCarouselNum: isLoggedIn ? 1 : 0 });
  }, []);

  useEffect(() => {
    const handleKeyUp = (e: any) => {
      if (e.key === 'Enter') {
        navigate('/select-mode');
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <S.LandingPageContainer>
      <S.Version>v{process.env.REACT_APP_VERSION}</S.Version>
      <FadeInFromBottom>
        <h1>실시간 노래 맞추기 게임</h1>
        <motion.div
          initial={{ scale: 0.9, rotateZ: -5 }}
          animate={{ scale: 0.9, rotateZ: 5 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            damping: 0,
            bounce: 1,
          }}
        >
          <Logo size="lg" />
        </motion.div>
        <Enlarge>
          <button
            type="button"
            onClick={() => {
              navigate('/select-mode');
            }}
          >
            Press Enter
          </button>
        </Enlarge>
        <Blink>
          <p>please insert (1) coin</p>
        </Blink>
      </FadeInFromBottom>
    </S.LandingPageContainer>
  );
};
