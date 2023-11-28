import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userApis } from '../../../../hooks/api/userApis';
import {
  RoomsWrapper,
  Room,
  PreviousButton,
  NextButton,
  RoomManagerDiv,
  RoomNumberDiv,
  RoomPeopleDiv,
  RoomTitleDiv,
  RoomYearsDiv,
  IsPrivateimg,
  RoomQuizAmountDiv,
  NoRoomImg,
  PasswordModalWrapper,
  StyledModalInput,
  StyledExitButton,
  StyledSubmitButton,
  StyledModalForm,
  ModalOverlay,
} from './LobbyRooms.styled';
import previousButton from '../../../../assets/svgs/modeSelectSvgs/nextButton.svg';
import roomLockIcon from '../../../../assets/svgs/MultiLobby/roomLock.svg';
import roomUnlockIcon from '../../../../assets/svgs/MultiLobby/roomUnlock.svg';
import noRoomIcon from '../../../../assets/svgs/MultiLobby/noRoomIcon.svg';
import exitIcon from '../../../../assets/svgs/MultiLobby/exitButtonIcon.svg';
import logoIcon from '../../../../assets/svgs/logo.svg';

interface Room {
  roomTitle: string;
  roomManager: string;
  currentMembers: number;
  gameRoomNo: number;
  isPrivate: boolean;
  years: number[];
  quizAmount: number;
  isPlay: boolean;
}

interface PasswordModalProps {
  onClose: () => void;
  onSubmit: (password: string, data: object) => void;
  selectedRoomNumber: number | null;
}

// 비밀번호가 있는 비공개방에 접근했을 때 생성되는 비밀번호 입력 modal
const PasswordModal: React.FC<PasswordModalProps> = ({
  onClose,
  onSubmit,
  selectedRoomNumber,
}) => {
  const [password, setPassword] = useState('');
  const location = useLocation();
  const channelNumber = location.pathname.split('/').slice(-2)[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 비밀번호 검증
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 비밀번호 검증
      const passwordResponse = await userApis.post(
        `${process.env.REACT_APP_BASE_URL}/game/main/password`,
        {
          password,
          gameRoomNo: selectedRoomNumber,
        }
      );

      if (
        passwordResponse.data.code === 200 &&
        passwordResponse.data.data.isCorrectPassword
      ) {
        // 비밀번호가 맞으면 토큰 보냄
        const userInfoResponse = await userApis.get(
          `${process.env.REACT_APP_BASE_URL}/game/main/enter/${selectedRoomNumber}`
        );

        if (userInfoResponse.data.code === 200) {
          const data = {
            ...userInfoResponse.data.data,
          };
          onSubmit(password, data);
        }
      } else {
        alert('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error('통신 에러', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <ModalOverlay>
      <PasswordModalWrapper>
        <img src={logoIcon} alt="logo" width={200} />
        <StyledModalForm onSubmit={handleSubmit}>
          <StyledModalInput
            value={password}
            onChange={handleChange}
            placeholder="방 비밀번호 입력"
            autoComplete="off"
            maxLength={4}
          />
          <StyledSubmitButton type="submit" onClick={handleSubmit}>
            확인
          </StyledSubmitButton>
          <StyledExitButton type="button" onClick={onClose}>
            <img src={exitIcon} alt="나가기" width={50} />
          </StyledExitButton>
        </StyledModalForm>
      </PasswordModalWrapper>
    </ModalOverlay>
  );
};

export const LobbyRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 한 페이지에 표시할 방의 수
  const location = useLocation();
  const navigate = useNavigate();
  const channelNumber = location.pathname.split('/').slice(-2)[0];
  const accessToken = window.localStorage.getItem('userAccessToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await userApis.get(
          `${process.env.REACT_APP_BASE_URL}/game/main/${channelNumber}`
        );

        if (response.data.code === 200) {
          setRooms(
            Array.isArray(response.data.data.rooms)
              ? response.data.data.rooms
              : []
          );
        }
      } catch (error) {
        console.error('Fetching rooms failed: ', error);
      }
    };

    fetchRooms();
  }, []);

  // 페이지네이션을 위한 시작점과 끝점 계산
  const indexOfFirstRoom = (currentPage - 1) * pageSize;
  const indexOfLastRoom = Math.min(currentPage * pageSize, rooms.length);
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // 방의 years 배열에서 최소값과 최대값을 계산하는 함수
  const getYearsRange = (years: number[]) => {
    if (years.length === 1) return `${years[0]}년`;
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return `${minYear}년 ~ ${maxYear}년`;
  };

  // 이전 버튼 핸들러
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(rooms.length / pageSize))
    );
  };

  const handleRoomClick = async (room: any) => {
    if (room.isPrivate) {
      setSelectedRoomNumber(room.gameRoomNo);
      setIsModalOpen(true);
    } else {
      try {
        const userInfoResponse = await userApis.get(
          `${process.env.REACT_APP_BASE_URL}/game/main/enter/${room.gameRoomNo}`
        );
        if (userInfoResponse.data.code === 200) {
          const requestBody = {
            channelNo: parseInt(channelNumber, 10),
            roomName: room.roomTitle,
            password: '',
            musicYear: room.years,
            quizAmount: room.quizAmount,
            data: userInfoResponse.data.data,
          };
          navigate(`/multi/${channelNumber}/game/${room.gameRoomNo}`, {
            state: { requestBody },
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
    }
  };

  if (rooms.length === 0) {
    return (
      <RoomsWrapper>
        <NoRoomImg src={noRoomIcon} alt="방이 없음" width={500} />
      </RoomsWrapper>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <RoomsWrapper>
        {currentRooms.map((room) => (
          <Room
            key={room.gameRoomNo}
            onClick={() => !room.isPlay && handleRoomClick(room)}
            style={{
              backgroundColor: room.isPlay
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
              pointerEvents: room.isPlay ? 'none' : 'auto',
            }}
          >
            <RoomNumberDiv>{room.gameRoomNo}</RoomNumberDiv>
            <RoomTitleDiv>&nbsp;{room.roomTitle}</RoomTitleDiv>
            <RoomManagerDiv>{room.roomManager}님의 방</RoomManagerDiv>
            <RoomYearsDiv>{getYearsRange(room.years)}</RoomYearsDiv>
            <RoomPeopleDiv
              style={{
                color: room.currentMembers === 6 ? 'red' : 'inherit',
              }}
            >
              {room.currentMembers}/6
            </RoomPeopleDiv>
            <IsPrivateimg
              src={room.isPrivate ? roomLockIcon : roomUnlockIcon}
              alt="Room is private?"
              width={30}
            />
            <RoomQuizAmountDiv>&nbsp;{room.quizAmount}문제</RoomQuizAmountDiv>
          </Room>
        ))}
        <PreviousButton
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1 || rooms.length === 0}
        >
          <img
            src={previousButton}
            alt="이전 버튼"
            style={{ rotate: '180deg', opacity: 1 }}
            width={60}
          />
        </PreviousButton>
        <NextButton type="button" onClick={handleNext}>
          <img
            src={previousButton}
            alt="다음 버튼"
            style={{ opacity: 1 }}
            width={60}
          />
        </NextButton>
        {isModalOpen && (
          <PasswordModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={(password, data) => {
              const room = rooms.find(
                (r) => r.gameRoomNo === selectedRoomNumber
              );
              if (!room) return;

              const gameState = {
                channelNo: parseInt(channelNumber, 10),
                roomName: room.roomTitle,
                password,
                musicYear: room.years,
                quizAmount: room.quizAmount,
                data,
              };
              navigate(`/multi/${channelNumber}/game/${selectedRoomNumber}`, {
                state: { requestBody: gameState },
              });

              setIsModalOpen(false);
            }}
            selectedRoomNumber={selectedRoomNumber}
          />
        )}
      </RoomsWrapper>
    </motion.div>
  );
};
