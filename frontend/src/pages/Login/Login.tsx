/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ActiveCarouselNumAtom, UserDataAtom } from '../../atoms/atoms';
import {
  Modal,
  LoginBtn,
  LoginInput,
  Logo,
  BackBtn,
} from '../../components/utils';
import * as S from './Login.styled';

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(UserDataAtom);
  const [activeCarouselNum, setActiveCarouselNum] = useRecoilState(
    ActiveCarouselNumAtom
  );

  const [userId, setUserId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const userIdRef = useRef('');
  const pwRef = useRef('');

  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  const getLogin = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/member/login`, {
        loginId: userIdRef.current,
        password: pwRef.current,
      })
      .then((res) => {
        window.localStorage.setItem(
          'userAccessToken',
          res.data.data.accessToken
        );
        window.localStorage.setItem(
          'userRefreshToken',
          res.data.data.refreshToken
        );
        window.localStorage.setItem('nickname', res.data.data.nickname);
        setUserData({ nickname: res.data.data.nickname });
        setActiveCarouselNum({ activeCarouselNum: 0 });
        navigate('/');
      })
      .catch((err) => {
        setIsToggled(true);
        setModalData({
          data: {
            title: '😥',
            message: '아이디나 비밀번호가 일치하지 않습니다',
          },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
        setUserId('');
        setPw('');
        userIdRef.current = '';
        pwRef.current = '';
      });
  };

  const checkLogin = () => {
    if (userId === '') {
      setIsToggled(true);
      setModalData({
        data: {
          title: '😥',
          message: '아이디를 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
        },
      });
    } else if (pw === '') {
      setIsToggled(true);
      setModalData({
        data: {
          title: '😥',
          message: '비밀번호를 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
        },
      });
    } else if (userId && pw) {
      getLogin();
    }
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

  useEffect(() => {
    const handleKeyUp = (e: any) => {
      if (e.key === 'Enter') {
        if (userIdRef.current === '') {
          setIsToggled(true);
          setModalData({
            data: {
              title: '😥',
              message: '아이디를 적어주세요',
            },
            yesBtnClick: () => {
              setIsToggled(false);
            },
          });
        } else if (pwRef.current === '') {
          setIsToggled(true);
          setModalData({
            data: {
              title: '😥',
              message: '비밀번호를 적어주세요',
            },
            yesBtnClick: () => {
              setIsToggled(false);
            },
          });
        } else if (userIdRef.current && pwRef.current) {
          getLogin();
        }
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <BackBtn url="/select-mode" />
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <S.LoginContainer>
        <S.LogoContainer>
          <Logo size="sm" />
        </S.LogoContainer>
        <S.LoginWrapper>
          <h1>Login</h1>
          <LoginInput
            inputRef={userIdRef}
            labelId="userId"
            labelContent="아이디"
            placeholder=""
            inputValue={userId}
            setInputValue={setUserId}
          />
          <LoginInput
            inputRef={pwRef}
            labelId="userPwd"
            labelContent="비밀번호"
            inputValue={pw}
            setInputValue={setPw}
          />

          <LoginBtn
            content="login"
            isDisabled={false}
            handleClick={checkLogin}
          />

          <S.signupText>
            계정이 없으시다면,
            <Link to="/sign-up" className="link">
              회원가입
            </Link>
          </S.signupText>
        </S.LoginWrapper>
      </S.LoginContainer>
    </motion.div>
  );
};
