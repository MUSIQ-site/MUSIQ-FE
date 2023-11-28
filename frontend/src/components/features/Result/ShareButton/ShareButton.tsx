import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import ShareIcon from '../../../../assets/svgs/ShareIcon.svg';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Container = styled.button`
  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

const HoverStyled = styled.img`
  &:hover {
    filter: sepia(100%);
  }
`;

interface ShareButtonProps {
  correctAnswerCnt: number;
  mode: string;
}

export const ShareButton: FC<ShareButtonProps> = ({
  correctAnswerCnt,
  mode,
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => {
      window.Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    let titleMessage = ''; // 맞힌 개수에 따라 다르게 대사를 출력해주자
    let imageUrl = ''; // imageUrl를 동적으로 설정할 변수

    // correctAnswerCnt 값에 따라 titleMessage와 imageUrl 변경
    if (correctAnswerCnt === 0) {
      titleMessage = `${mode} 난이도로 하나도 못 맞혔어요... 도와주세요😭`;
      imageUrl =
        'https://image.musinsa.com/mfile_s01/2016/03/21/317b6935907bfd5e33f103fa503b07e4165530.jpg';
    } else if (correctAnswerCnt >= 1 && correctAnswerCnt <= 7) {
      titleMessage = `아쉽게도 ${mode} 난이도로 ${correctAnswerCnt}개밖에 못 맞혔어요. 😢`;
      imageUrl =
        'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/1973494215/B.jpg?765000000';
    } else if (correctAnswerCnt >= 8 && correctAnswerCnt <= 15) {
      titleMessage = `우와! ${mode} 난이도로 ${correctAnswerCnt}개나 맞혔어요! 🎉`;
      imageUrl = 'https://pbs.twimg.com/media/EFogp8wUcAAkydU.jpg';
    } else if (correctAnswerCnt >= 16) {
      titleMessage = `대단해요! ${mode} 난이도로 ${correctAnswerCnt}개나 맞혔어요! 🚀`;
      imageUrl = 'https://i3.ruliweb.com/img/22/02/07/17ed283669719ea12.jpg';
    }

    window.Kakao.Link.sendDefault(
      {
        objectType: 'feed',
        content: {
          title: titleMessage,
          description: '친구와 같이 퀴즈를 맞혀보세요',
          imageUrl,
          link: {
            mobileWebUrl: `${process.env.REACT_APP_SHARE_URL}/mobile-restriction`,
            webUrl: `${process.env.REACT_APP_SHARE_URL}`,
          },
        },
      },
      (res: any) => {
        // 에러 띄우기
        console.log(res);
      },
      (error: any) => {
        console.error(error);
      }
    );
  };
  return (
    <Container type="button" onClick={handleShare}>
      <HoverStyled src={ShareIcon} alt="Share Icon" width={150} />
    </Container>
  );
};
