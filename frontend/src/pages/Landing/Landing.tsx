import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { ActiveCarouselNumAtom } from '../../atoms/atoms';
import * as S from './Landing.styled';
import {
  Logo,
  BgmBtn,
  BugReportButton,
  Notification,
} from '../../components/utils';
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
    Boolean(window.localStorage.getItem('UAT'))
  ); // 로그인 검증
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setActiveCarouselNum({ activeCarouselNum: isLoggedIn ? 1 : 0 });
  }, []);

  useEffect(() => {
    const handleKeyUp = (e: any) =>
      e.key === 'Enter' && !isModalOpen ? navigate('/select-mode') : '';

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isModalOpen]);

  return (
    <S.Container>
      <Notification />
      <BugReportButton onModalStateChange={setIsModalOpen} />
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
    </S.Container>
  );
};
