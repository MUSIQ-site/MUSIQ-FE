import { FC } from 'react';
import { StyledBubble, StyledFont } from './SpeechBubbleText.styled';

interface SpeechBubbleTextProps {
  correctAnswerCnt: number;
}

export const SpeechBubbleText: FC<SpeechBubbleTextProps> = ({
  correctAnswerCnt,
}) => {
  let messages = ['결과창입니다'];

  if (correctAnswerCnt === 0) {
    // 맞춘 개수에 따라 각기 다른 대사를 출력하자
    messages = [
      '하나도 못 맞혔어...',
      '다음번엔 맞힐 수 있을거야.',
      '친구와 같이 맞혀봐!!!',
    ];
  } else if (correctAnswerCnt >= 1 && correctAnswerCnt <= 7) {
    messages = [
      `겨우 ${correctAnswerCnt}라운드?`,
      '조금 더 분발해봐!',
      '더 다양한 노래를 맞혀보자!',
    ];
  } else if (correctAnswerCnt >= 8 && correctAnswerCnt <= 15) {
    messages = [
      `와우! ${correctAnswerCnt}라운드 라니`,
      '잘했어, 계속 노력하자!',
      '더 높은 라운드까지 가보자고!',
    ];
  } else if (correctAnswerCnt >= 16) {
    messages = [
      `${correctAnswerCnt}라운드라니!!`,
      '여기까지 오다니 정말 대단해!!',
      '친구들에게 결과를 자랑해보자!',
    ];
  }

  return (
    <StyledBubble>
      {messages.map((message) => (
        <StyledFont key={message}>{message}</StyledFont>
      ))}
    </StyledBubble>
  );
};
