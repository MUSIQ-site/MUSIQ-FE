import React, { useState } from 'react';
import {
  ReportButtonDiv,
  ModalDiv,
  ModalOverlay,
  StyledContents,
  CloseButton,
  CheckBoxContainer,
  StyledReportSubmitButton,
  ReportTitleDiv,
} from './BugReportButton.styled';
import reportIcon from '../../../assets/svgs/reportButton.svg';
import exitIcon from '../../../assets/svgs/MultiLobby/exitButtonIcon.svg';

type ReportType = 'Suggestion' | 'Bug';

interface ModalProps {
  onClose: () => void;
}

interface BugReportButtonProps {
  onModalStateChange: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState<ReportType>('Suggestion');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (content.length < 20) {
      alert('내용은 최소 20자 이상이어야 합니다.');
      return;
    }

    const accessToken = window.localStorage.getItem('UAT');
    if (!accessToken) {
      console.error('토큰이 없어요');
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/util/report`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accessToken,
        },
        body: JSON.stringify({ type: reportType, content }),
      }
    );

    const data = await response.json();

    if (data.code === 200) {
      alert('정상적으로 접수되었습니다. 감사합니다.');
      onClose();
    } else {
      alert('로그인 상태가 만료되었습니다. 다시 로그인 해주세요.');
    }

    onClose();
  };

  return (
    <ModalOverlay>
      <ModalDiv>
        <CloseButton onClick={onClose}>
          <img src={exitIcon} alt="exit button" width={30} />
        </CloseButton>
        <ReportTitleDiv>신고 및 건의</ReportTitleDiv>
        <CheckBoxContainer>
          <label>
            <input
              type="radio"
              name="reportType"
              value="Suggestion"
              checked={reportType === 'Suggestion'}
              onChange={() => setReportType('Suggestion')}
            />{' '}
            건의 사항
          </label>
          <label>
            <input
              type="radio"
              name="reportType"
              value="Bug"
              checked={reportType === 'Bug'}
              onChange={() => setReportType('Bug')}
            />{' '}
            버그 신고
          </label>
        </CheckBoxContainer>
        <StyledContents
          maxLength={200}
          minLength={20}
          placeholder="20자 ~ 200자 내외로 유저님의 소중한 의견을 공유해주시면 감사하겠습니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <StyledReportSubmitButton type="button" onClick={handleSubmit}>
          제출
        </StyledReportSubmitButton>
      </ModalDiv>
    </ModalOverlay>
  );
};

export const BugReportButton: React.FC<BugReportButtonProps> = ({
  onModalStateChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalStateChange(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalStateChange(false);
  };

  return (
    <ReportButtonDiv>
      <button type="button" onClick={handleOpenModal} tabIndex={0}>
        <img src={reportIcon} alt="report icon" width="120px" />
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </ReportButtonDiv>
  );
};
