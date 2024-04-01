import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../../../hooks/api/userApis';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ButtonsWrapper,
  PasswordModalOverlay,
  StyledInput,
  SubmitButton,
} from './SearchRoomButton.styled';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

interface Room {
  gameRoomNo: number;
  isPrivate: boolean;
  roomTitle: string;
  years: number[];
  quizAmount: number;
}

interface SearchRoomButtonProps {
  channelNumber: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      {children}
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

const PasswordModal: React.FC<{
  onSubmit: (password: string) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(password);
  };

  return (
    <PasswordModalOverlay>
      <ModalContent>
        <StyledInput
          value={password}
          placeholder="&nbsp;비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <SubmitButton type="button" onClick={handleSubmit}>
          확인
        </SubmitButton>
        <CloseButton onClick={onClose}>&times;</CloseButton>{' '}
      </ModalContent>
    </PasswordModalOverlay>
  );
};

export const SearchRoomButton: React.FC<SearchRoomButtonProps> = ({
  channelNumber,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const navigate = useNavigate();

  const enterRoom = async (password: string) => {
    if (!selectedRoom) return;
    const enterResponse = await userApis.get(
      `${process.env.REACT_APP_BASE_URL}/game/main/enter/${selectedRoom.gameRoomNo}`
    );

    if (enterResponse.data.code === 200) {
      const gameState = {
        channelNo: parseInt(channelNumber, 10),
        roomName: selectedRoom.roomTitle,
        musicYear: selectedRoom.years,
        quizAmount: selectedRoom.quizAmount,
        data: enterResponse.data.data,
        password,
      };
      navigate(`/multi/${channelNumber}/game/${selectedRoom.gameRoomNo}`, {
        state: { requestBody: gameState },
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '' || (value.match(/^[0-9]+$/) && value.length <= 5)) {
      setRoomNumber(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const roomsResponse = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/main/${channelNumber}`
      );

      if (roomsResponse.data.code === 200) {
        const { rooms } = roomsResponse.data.data;
        const foundRoom = rooms.find(
          (room: any) => room.gameRoomNo === parseInt(roomNumber, 10)
        );

        setSelectedRoom(foundRoom);

        if (!foundRoom) {
          alert('해당 번호의 방이 없습니다.');
          return;
        }

        if (foundRoom.isPlay) {
          alert('게임 중 입니다.');
          return;
        }

        if (foundRoom.isPrivate) {
          setIsPasswordModalOpen(true);
          setIsModalOpen(false);
        } else {
          enterRoom(''); // 비밀번호가 없는 경우
        }
      } else {
        alert('방 목록을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error entering room:', error);
      alert('방에 입장하는 동안 오류가 발생했습니다.');
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!selectedRoom) return;
    setIsPasswordModalOpen(false);
    try {
      const passwordResponse = await userApis.post(
        `${process.env.REACT_APP_BASE_URL}/game/main/password`,
        {
          gameRoomNo: selectedRoom.gameRoomNo,
          password,
        }
      );
      if (
        passwordResponse.data.code === 200 &&
        passwordResponse.data.data.isCorrectPassword
      ) {
        enterRoom(password);
      } else {
        alert('잘못된 비밀번호입니다.');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
    }
  };

  return (
    <ButtonsWrapper>
      <button type="button" onClick={handleOpenModal}>
        방 찾기
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <StyledInput
            placeholder="&nbsp;방 번호 입력"
            value={roomNumber}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <SubmitButton type="button" onClick={handleSubmit}>
            입장
          </SubmitButton>
        </Modal>
      )}
      {isPasswordModalOpen && (
        <PasswordModal
          onSubmit={handlePasswordSubmit}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </ButtonsWrapper>
  );
};
