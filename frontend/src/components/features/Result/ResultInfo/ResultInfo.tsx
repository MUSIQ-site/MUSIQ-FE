import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../../utils/Logo/Logo';
import { ShareButton } from '../ShareButton';
import { RetryButton } from '../RetryButton';
import { SpeechBubbleText } from '../SpeechBubbleText';
import {
  InfoWrapper,
  ChickWrapper,
  ResultContainer,
  DancingChickContainer,
} from './ResultInfo.styled';
import { ResultInfoText } from '../ResultInfoText';
import DanceChick from '../../../../assets/img/playgame/danceChick.gif';
import WaveBar from '../../../../assets/img/playgame/wave.png';
import SpeechBubble from '../../../../assets/img/playgame/speechBubble.png';

// props로 내리기

export const ResultInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state가 존재하지 않으면 홈으로 리다이렉트
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  });

  // location.state가 null이거나 undefined이면 빈 객체를 사용
  const { mode, selectYear, correctAnswerCnt, exp } = location.state || {};

  return (
    <ResultContainer>
      <ChickWrapper>
        <DancingChickContainer>
          <img src={DanceChick} alt="DanceChick" width={200} />
          <img src={WaveBar} alt="WaveBar" width={400} />
          <img src={SpeechBubble} alt="SpeechBubble" width={400} />
          <SpeechBubbleText correctAnswerCnt={correctAnswerCnt} />
        </DancingChickContainer>
      </ChickWrapper>
      <InfoWrapper>
        <div>
          <Logo size="lg" />
        </div>
        <ResultInfoText
          mode={mode}
          selectYear={selectYear}
          correctAnswerCnt={correctAnswerCnt}
          exp={exp}
        />
        <div style={{ marginTop: '1rem' }}>
          <RetryButton mode={mode} selectYear={selectYear} />
          <ShareButton correctAnswerCnt={correctAnswerCnt} mode={mode} />
        </div>
      </InfoWrapper>
    </ResultContainer>
  );
};
