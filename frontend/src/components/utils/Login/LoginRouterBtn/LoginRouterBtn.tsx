import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ActiveCarouselNumAtom } from '../../../../atoms/atoms';
import { Modal } from '../../Modal';
import { userApis } from '../../../../hooks/api/userApis';
import { ReactComponent as LoginKey } from '../../../../assets/svgs/login/loginKey.svg';
import { ReactComponent as LogoutKey } from '../../../../assets/svgs/login/logoutKey.svg';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

const Container = styled.div<{ isLogin: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-top: ${(props) => (props.isLogin ? '1rem' : '0.5rem')};
  padding-right: 8rem;

  & p {
    font-size: 2rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  &:hover {
    & .keyLogo {
      fill: ${(props) => (props.isLogin ? '#FF2E2E' : '#ffe500')};
      transition: all 0.3s;

      :hover,
      :active {
        cursor:
          url(${hoverCursorIcon}) 2 2,
          auto !important;
      }
    }

    & p {
      color: ${(props) => (props.isLogin ? '#FF2E2E' : '#ffe500')};
      transition: all 0.3s;

      :hover,
      :active {
        cursor:
          url(${hoverCursorIcon}) 2 2,
          auto !important;
      }
    }
  }
`;

type OwnProps = {
  isLogin: boolean;
};

export const LoginRouterBtn = (props: OwnProps) => {
  const [activeCarouselNum, setActiveCarouselNum] = useRecoilState(
    ActiveCarouselNumAtom
  );
  const navigate = useNavigate();
  const { isLogin } = props;

  const clickHandler = () => {
    if (isLogin) {
      userApis
        .delete(`${process.env.REACT_APP_BASE_URL}/member/logout`)
        .then((res) => {
          window.localStorage.removeItem('userAccessToken');
          window.localStorage.removeItem('userRefreshToken');
          window.localStorage.removeItem('nickname');
          setActiveCarouselNum({ activeCarouselNum: 1 });
          alert('로그아웃 성공!');
          navigate('/');
        })
        .catch((err) => {
          alert('로그아웃 실패!');
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <Container isLogin={isLogin} onClick={clickHandler}>
      {isLogin ? (
        <LogoutKey className="keyLogo" width={50} />
      ) : (
        <LoginKey className="keyLogo" width={50} />
      )}

      <p>{isLogin ? 'Logout' : 'Login'}</p>
    </Container>
  );
};
