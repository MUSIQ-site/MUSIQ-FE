import React, { useState } from 'react';
import {
  ReportButtonDiv,
  ModalDiv,
  ModalOverlay,
  StyledContents,
  CloseButton,
} from './BugReportButton.styled';
import reportIcon from '../../../assets/svgs/reportButton.svg';
import exitIcon from '../../../assets/svgs/MultiLobby/exitButtonIcon.svg';

type ReportType = 'Suggestion' | 'Bug';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState<ReportType>('Suggestion');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const accessToken = window.localStorage.getItem('UAT');
    if (!accessToken) {
      console.error('Access token not found');
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

    const data = await response.json(); // 응답처리(콘솔 확인용)
  };

  return (
    <ModalOverlay>
      <ModalDiv>
        <CloseButton onClick={onClose}><img src={exitIcon} alt="" /></CloseButton>
        <input
          type="radio"
          name="reportType"
          value="Suggestion"
          checked={reportType === 'Suggestion'}
          onChange={() => setReportType('Suggestion')}
        />{' '}
        건의 사항
        <input
          type="radio"
          name="reportType"
          value="Bug"
          checked={reportType === 'Bug'}
          onChange={() => setReportType('Bug')}
        />{' '}
        버그 신고
        <StyledContents
          maxLength={200}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          제출
        </button>
      </ModalDiv>
    </ModalOverlay>
  );
};

export const BugReportButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ReportButtonDiv>
      <button type="button" onClick={handleOpenModal}>
        <img src={reportIcon} alt="report icon" width="120px" />
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </ReportButtonDiv>
  );
};
