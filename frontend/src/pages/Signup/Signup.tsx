/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Modal,
  LoginBtn,
  LoginInput,
  Logo,
  BackBtn,
} from '../../components/utils';
import useDebounce from '../../hooks/useDebounce';
import * as S from './Signup.styled';

export const Signup = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>('');
  const [successUserId, setSuccessUserId] = useState<boolean>(false);
  const [errorUserId, setErrorUserId] = useState<boolean>(false);
  const [duplicatedUserId, setDuplicatedUserId] = useState<boolean>(false);
  const userIdRef = useRef('');
  const errorUserIdRef = useRef<boolean>(false);
  const duplicatedUserIdRef = useRef<boolean>(false);
  const debounceCheckUserId = useDebounce<string>(userId, 200);

  const [pw, setPw] = useState<string>('');
  const [successPw, setSuccessPw] = useState<boolean>(false);
  const [errorPw, setErrorPw] = useState<boolean>(false);
  const pwRef = useRef('');
  const errorPwRef = useRef<boolean>(false);
  const debouncePw = useDebounce<string>(pw, 200);

  const [nickname, setNickname] = useState<string>('');
  const [successNickname, setSuccessNickname] = useState<boolean>(false);
  const [errorNickname, setErrorNickname] = useState<boolean>(false);
  const [duplicatedNickname, setDuplicatedNickname] = useState<boolean>(false);
  const nicknameRef = useRef('');
  const errorNicknameRef = useRef<boolean>(false);
  const duplicatedNicknameRef = useRef<boolean>(false);
  const debounceCheckNickname = useDebounce<string>(nickname, 200);

  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const isToggledRef = useRef<boolean>(false);
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  // debounce를 이용한 유저아이디 중복검사, 0.2초마다 서버에 요청보내서 중복검사 실시간으로 시행
  useEffect(() => {
    if (debounceCheckUserId === '') {
      setErrorUserId(false);
      errorUserIdRef.current = false;
      setDuplicatedUserId(false);
      duplicatedUserIdRef.current = false;
      setSuccessUserId(false);
      return;
    }
    // 영문자로 시작하는 6~20자 영문자(소문자만 가능)
    const reg = /^[a-z]{5,19}$/g;
    if (reg.test(debounceCheckUserId)) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/member/validate-login-id/${debounceCheckUserId}`
        )
        .then((res) => {
          // 유저아이디가 중복이면
          if (!res.data.data.valid) {
            setErrorUserId(false);
            errorUserIdRef.current = false;
            setDuplicatedUserId(true);
            duplicatedUserIdRef.current = true;
            setSuccessUserId(false);
          } else if (debounceCheckUserId === '') {
            setErrorUserId(false);
            errorUserIdRef.current = false;
            setDuplicatedUserId(false);
            duplicatedUserIdRef.current = false;
            setSuccessUserId(false);
          } else {
            // 유저아이디가 중복이 아니면
            setErrorUserId(false);
            errorUserIdRef.current = false;
            setDuplicatedUserId(false);
            duplicatedUserIdRef.current = false;
            setSuccessUserId(true);
          }
        })
        .catch((err) => {
          setErrorUserId(false);
          errorUserIdRef.current = false;
          setDuplicatedUserId(true);
          duplicatedUserIdRef.current = true;
          setSuccessUserId(false);
        });
    } else {
      setErrorUserId(true);
      errorUserIdRef.current = true;
      setDuplicatedUserId(false);
      duplicatedUserIdRef.current = false;
      setSuccessUserId(false);
    }
  }, [debounceCheckUserId]);

  // debounce를 이용한 유저닉네임 중복검사, 0.2초마다 서버에 요청보내서 중복검사 실시간으로 시행
  useEffect(() => {
    if (debounceCheckNickname === '') {
      setErrorNickname(false);
      errorNicknameRef.current = false;
      setDuplicatedNickname(false);
      duplicatedNicknameRef.current = false;
      setSuccessNickname(false);
      return;
    }
    // 2자 이상 8자 이하, 영어 또는 숫자 또는 한글로 구성
    // 특이사항 : 한글 초성 및 모음은 허가하지 않는다.
    const reg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    if (reg.test(debounceCheckNickname)) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/member/validate-nickname/${debounceCheckNickname}`
        )
        .then((res) => {
          if (!res.data.data.valid) {
            setErrorNickname(false);
            errorNicknameRef.current = false;
            setDuplicatedNickname(true);
            duplicatedNicknameRef.current = true;
            setSuccessNickname(false);
          } else if (debounceCheckNickname === '') {
            setErrorNickname(false);
            errorNicknameRef.current = false;
            setDuplicatedNickname(false);
            duplicatedNicknameRef.current = false;
            setSuccessNickname(false);
          } else {
            setErrorNickname(false);
            errorNicknameRef.current = false;
            setDuplicatedNickname(false);
            duplicatedNicknameRef.current = false;
            setSuccessNickname(true);
          }
        })
        .catch((err) => {
          setErrorNickname(false);
          errorNicknameRef.current = false;
          setDuplicatedNickname(true);
          duplicatedNicknameRef.current = true;
          setSuccessNickname(false);
        });
    } else {
      setErrorNickname(true);
      errorNicknameRef.current = true;
      setDuplicatedNickname(false);
      duplicatedNicknameRef.current = false;
      setSuccessNickname(false);
    }
  }, [debounceCheckNickname]);

  // debounce를 이용한 비밀번호 검사, 영문 숫자 조합 8자리 이상
  useEffect(() => {
    if (debouncePw === '') {
      setErrorPw(false);
      errorPwRef.current = false;
      setSuccessPw(false);
      return;
    }
    // 영문 숫자 조합 4자리 이상
    const reg = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{4,20}$/;
    if (reg.test(debouncePw)) {
      setErrorPw(false);
      errorPwRef.current = false;
      setSuccessPw(true);
    } else {
      setErrorPw(true);
      errorPwRef.current = true;
      setSuccessPw(false);
    }
  }, [debouncePw]);

  // 회원가입 요청
  const postSignup = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/member/signup`, {
        loginId: userIdRef.current,
        password: pwRef.current,
        nickname: nicknameRef.current,
      })
      .then((res) => {
        // 회원가입 성공 시 로그인 페이지로 라우팅, 로그인 페이지에서 다시 로그인 할 수 있게 하기!
        setIsToggled(true);
        isToggledRef.current = true;
        setModalData({
          data: {
            title: '😆',
            message: `환영합니다! ${res.data.data.nickname}님, 다시 한번 로그인 해주세요`,
          },
          yesBtnClick: () => {
            navigate('/login');
          },
        });
      })
      .catch((err) => {
        // 회원가입 실패 시 모달 띄우고, 다시 입력할 수 있도록 아이디,비밀번호,닉네임 빈칸으로 초기화
        setIsToggled(true);
        isToggledRef.current = true;
        setModalData({
          data: { title: '😥', message: '회원가입에 실패하였습니다' },
          yesBtnClick: () => {
            setIsToggled(false);
            isToggledRef.current = false;
          },
        });
        setUserId('');
        setNickname('');
        setPw('');
      });
  };

  const checkSignupCondition = async () => {
    if (userIdRef.current === '') {
      setIsToggled(true);
      isToggledRef.current = true;
      setModalData({
        data: {
          title: '😥',
          message: '아이디를 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
          isToggledRef.current = false;
        },
      });
    } else if (errorUserIdRef.current || duplicatedUserIdRef.current) {
      setIsToggled(true);
      isToggledRef.current = true;
      setModalData({
        data: {
          title: '😥',
          message: '아이디를 올바르게 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
          isToggledRef.current = false;
        },
      });
    } else if (pwRef.current === '') {
      setIsToggled(true);
      isToggledRef.current = true;
      setModalData({
        data: {
          title: '😥',
          message: '비밀번호를 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
          isToggledRef.current = false;
        },
      });
    } else if (errorPwRef.current) {
      setIsToggled(true);
      isToggledRef.current = true;
      setModalData({
        data: {
          title: '😥',
          message: '비밀번호를 올바르게 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
          isToggledRef.current = false;
        },
      });
    } else if (nicknameRef.current === '') {
      setIsToggled(true);
      isToggledRef.current = true;
      setModalData({
        data: {
          title: '😥',
          message: '닉네임을 적어주세요',
        },
        yesBtnClick: () => {
          setIsToggled(false);
          isToggledRef.current = false;
        },
      });
    } else if (duplicatedNicknameRef.current) {
      setIsToggled(true);
      isToggledRef.current = true;
      setModalData({
        data: {
          title: '😥',
          message: '닉네임이 중복입니다',
        },
        yesBtnClick: () => {
          setIsToggled(false);
          isToggledRef.current = false;
        },
      });
    } else {
      await postSignup();
    }
  };

  // 엔터키로 회원가입
  useEffect(() => {
    const handleKeyUp = async (e: any) => {
      if (e.key === 'Enter' && !isToggledRef.current) {
        await checkSignupCondition();
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
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <S.Container>
        <S.LogoContainer>
          <Logo size="sm" />
        </S.LogoContainer>
        <S.LoginContainer>
          <h1>Signup</h1>
          <LoginInput
            labelId="userId"
            labelContent="아이디"
            placeholder=""
            isSuccess={successUserId}
            successMessage="올바른 아이디입니다"
            isError={errorUserId}
            errorMessage="5~20자 영문자만 가능합니다"
            isDuplicate={duplicatedUserId}
            duplicatedMessage="아이디가 중복입니다"
            inputValue={userId}
            setInputValue={setUserId}
            inputRef={userIdRef}
          />
          <LoginInput
            labelId="userPwd"
            labelContent="비밀번호"
            isSuccess={successPw}
            successMessage="올바른 비밀번호입니다"
            isError={errorPw}
            errorMessage="영문 숫자 조합 4자리 이상이어야 합니다"
            inputValue={pw}
            setInputValue={setPw}
            inputRef={pwRef}
          />
          <LoginInput
            labelId="nickname"
            labelContent="닉네임"
            isSuccess={successNickname}
            successMessage="올바른 닉네임입니다"
            isError={errorNickname}
            errorMessage="2자 이상 8자 이하, 영어 숫자 한글만 허용"
            isDuplicate={duplicatedNickname}
            duplicatedMessage="닉네임이 중복입니다"
            inputValue={nickname}
            setInputValue={setNickname}
            inputRef={nicknameRef}
          />
          <LoginBtn
            content="signup"
            isDisabled={false}
            handleClick={async () => {
              await checkSignupCondition();
            }}
          />
          <S.signupText>
            이미 계정이 있다면,
            <Link to="/login" className="link">
              로그인
            </Link>
          </S.signupText>
        </S.LoginContainer>
      </S.Container>
    </motion.div>
  );
};
