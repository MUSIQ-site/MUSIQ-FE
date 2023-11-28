import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { userApis } from '../../../../hooks/api/userApis';
import {
  ButtonsWrapper,
  StyledModal,
  StyledCreateRoomButton,
  StyledRoomPasswordInput,
  StyledRoomTitleInput,
  SelectQuizAmoutWrapper,
  SelectYearWrapper,
  StyledExitButton,
  StyledCheckbox,
  StyledRadio,
  StyledAmountLabel,
  StyledYearLabel,
  StyledIsPrivateRoomCheckBoxDiv,
  ModalOverlay,
} from './LobbyCreateRoomButton.styled';
import exitButtonIcon from '../../../../assets/svgs/MultiLobby/exitButtonIcon.svg';
import musiqLogo from '../../../../assets/svgs/logo.svg';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    roomName: string,
    password: string,
    musicYear: string,
    quizAmount: number
  ) => void;
}

const LobbyCreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [musicYear, setMusicYear] = useState<string[]>([]);
  const [quizAmount, setQuizAmount] = useState<number>(0);
  const quizAmountOptions = [3, 10, 20, 30];
  const [passwordError, setPasswordError] = useState('');
  const [roomNameError, setRoomNameError] = useState('');
  const [isPrivate, setIsPrivate] = useState(false); // 비공개방 체크박스 상태
  const yearsOptions = [
    '1970',
    '1980',
    '1990',
    '2000',
    '2010',
    '2015',
    '2020',
    '2021',
    '2022',
    '2023',
  ];

  // 비공개 여부 체크박스 상태 변경 핸들러
  const handlePrivateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.target.checked);
    if (!e.target.checked) {
      setPassword(''); // 체크박스가 해제되면 비밀번호를 초기화
    }
  };

  // 연도 선택 핸들러
  const toggleYearSelection = (year: string) => {
    setMusicYear((prevYears) => {
      if (prevYears.includes(year)) {
        // 이미 연도가 선택되어 있다면 제거
        return prevYears.filter((y) => y !== year);
      }
      // 연도가 선택되어 있지 않다면 추가
      return [...prevYears, year];
    });
  };

  // 퀴즈 개수 선택 핸들러
  const handleQuizAmountChange = (amount: number) => {
    setQuizAmount(amount);
  };

  // 방 생성 핸들러
  const handleCreateRoom = () => {
    // 입력 검증 로직
    if (roomName.trim() === '') {
      alert('방 제목을 입력해주세요.');
      return;
    }

    if (musicYear.length === 0) {
      alert('연도를 선택해주세요.');
      return;
    }

    if (quizAmount === 0) {
      alert('문제 개수를 선택해주세요.');
      // eslint-disable-next-line no-useless-return
      return;
    }
    onCreate(roomName, password, musicYear.join(' '), quizAmount);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <StyledModal className="modal">
        <img src={musiqLogo} alt="logo" width={200} />
        <StyledExitButton type="button" onClick={onClose}>
          <img src={exitButtonIcon} alt="창 닫기" width={50} />
        </StyledExitButton>
        <StyledRoomTitleInput
          placeholder="&nbsp;방 제목"
          value={roomName}
          onChange={(e) => {
            const currentValue = e.target.value;
            if (currentValue.length <= 18) {
              setRoomName(currentValue);
              setRoomNameError(''); // 에러 메시지 초기화
            } else {
              setRoomNameError('18자까지 입력 가능합니다.'); // 에러 메시지 설정
            }
          }}
          autoComplete="off"
          maxLength={18} // 방 제목 길이 제한 추가
        />

        {roomNameError && (
          <div style={{ color: 'yellow' }}>{roomNameError}</div> // 에러 메시지 표시
        )}
        <StyledIsPrivateRoomCheckBoxDiv>
          <label style={{ fontSize: '18px' }}>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={handlePrivateChange}
              style={{ transform: 'scale(1.5)' }}
            />
            &nbsp;비공개
          </label>
        </StyledIsPrivateRoomCheckBoxDiv>
        {isPrivate && (
          <>
            <StyledRoomPasswordInput
              placeholder="&nbsp;비밀번호"
              value={password}
              onChange={(e) => {
                const currentValue = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(currentValue) || currentValue === '') {
                  setPassword(currentValue);
                  setPasswordError('');
                } else {
                  setPasswordError('숫자만 최대 4자리 입력 가능합니다.');
                }
              }}
              autoComplete="off"
              maxLength={4}
            />

            {passwordError && (
              <div style={{ color: 'yellow' }}>{passwordError}</div>
            )}
          </>
        )}

        <SelectYearWrapper>
          <div style={{ fontSize: '18px' }}>노래의 연도를 선택 해주세요</div>
          {yearsOptions.map((year) => (
            <StyledYearLabel key={year} style={{ fontSize: '20px' }}>
              <StyledCheckbox
                type="checkbox"
                value={year}
                checked={musicYear.includes(year)}
                onChange={() => toggleYearSelection(year)}
              />
              &nbsp;{year}
            </StyledYearLabel>
          ))}
        </SelectYearWrapper>
        <SelectQuizAmoutWrapper
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCreateRoom();
            }
          }}
        >
          <div style={{ fontSize: '18px' }}>문제 개수를 선택 해주세요</div>
          {quizAmountOptions.map((amount) => (
            <StyledAmountLabel key={amount} style={{ fontSize: '20px' }}>
              <StyledRadio
                type="radio"
                name="quizAmount"
                value={amount}
                checked={quizAmount === amount}
                onChange={() => handleQuizAmountChange(amount)}
              />
              &nbsp;{amount}
            </StyledAmountLabel>
          ))}
        </SelectQuizAmoutWrapper>
        <StyledCreateRoomButton type="button" onClick={handleCreateRoom}>
          방 만들기
        </StyledCreateRoomButton>
      </StyledModal>
    </ModalOverlay>
  );
};

export const LobbyCreateRoomButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const channelNo = location.pathname.split('/').slice(-2)[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  type RequestBody = {
    channelNo: number;
    roomName: string;
    password: string;
    musicYear: string;
    quizAmount: number;
  };

  const handleCreateRoom = (
    roomName: string,
    password: string,
    musicYear: string,
    quizAmount: number
  ) => {
    const requestBody = {
      channelNo: parseInt(channelNo, 10),
      roomName,
      password,
      musicYear,
      quizAmount,
    };
    userApis
      .post(`${process.env.REACT_APP_BASE_URL}/game/main/create`, requestBody)
      .then(async (createResponse) => {
        if (createResponse.data.code === 200) {
          const { gameRoomNo } = createResponse.data.data;
          // eslint-disable-next-line prefer-destructuring
          const multiModeCreateGameRoomLogId =
            createResponse.data.data.multiModeCreateGameRoomLogId;

          try {
            const userInfoResponse = await userApis.get(
              `${process.env.REACT_APP_BASE_URL}/game/main/enter/${gameRoomNo}`
            );

            if (userInfoResponse.data.code === 200) {
              const finalRequestBody = {
                ...requestBody,
                musicYear: musicYear.split(' '), // 문자열을 배열로 변환
                data: userInfoResponse.data.data,
                multiModeCreateGameRoomLogId,
              };

              navigate(`/multi/${channelNo}/game/${gameRoomNo}`, {
                state: { requestBody: finalRequestBody },
              });
            } else {
              console.error(
                '사용자 정보 가져오기 실패:',
                userInfoResponse.data.message
              );
            }
          } catch (error) {
            console.error('사용자 정보 가져오기 중 오류 발생:', error);
          }
        } else {
          console.error('방 생성 실패:', createResponse.data.message);
        }
      })
      .catch((error) => {
        console.error('방 생성 중 오류 발생:', error);
      });

    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <ButtonsWrapper onClick={handleOpenModal}>방 만들기</ButtonsWrapper>
      <LobbyCreateRoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};
