import { useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { StyledResultText } from './ResultInfoText.styled';

interface ResultInfoTextProps {
  mode: string;
  selectYear: string[]; // 선택한 연도들이 문자 배열로 들어옴
  correctAnswerCnt: number;
  // eslint-disable-next-line react/require-default-props
  exp?: number;
}

export const ResultInfoText: FC<ResultInfoTextProps> = ({
  mode,
  selectYear,
  correctAnswerCnt,
  exp,
}) => {
  // selectYear가 정의되어 있고 배열이면 실행
  let displayYear = '';

  if (selectYear && Array.isArray(selectYear)) {
    const years = selectYear.map((year) => parseInt(year, 10)); // 문자열 배열을 숫자 배열로 변환

    if (years.length === 1) {
      // 배열에 값이 하나만 있는 경우
      displayYear = `${years[0]}년`;
    } else {
      // 배열에 여러 값이 있는 경우
      const minYear = Math.min(...years); // 배열의 최소값 구하기
      const maxYear = Math.max(...years); // 배열의 최대값 구하기
      displayYear = `${minYear}년 ~ ${maxYear}년`;
    }
  }
  return (
    <div>
      <StyledResultText>{displayYear} 랜덤 문제</StyledResultText>
      <StyledResultText>{mode} 모드로</StyledResultText>
      <StyledResultText>
        {correctAnswerCnt}라운드까지 도달했습니다!
      </StyledResultText>
      {exp || exp === 0 ? (
        <StyledResultText>경험치 +{exp} 획득!</StyledResultText>
      ) : (
        ''
      )}
    </div>
  );
};
