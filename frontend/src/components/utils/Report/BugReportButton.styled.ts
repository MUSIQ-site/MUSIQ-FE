import styled from 'styled-components';

export const ReportButtonDiv = styled.div`
  position: absolute;
  bottom: 8%;
  right: 3.3%;
  z-index: 3;

  button {
    img {
      transition: filter 0.3s ease; // 부드러운 효과를 위한 transition 추가

      &:hover {
        filter: brightness(0) saturate(100%) invert(93%) sepia(92%)
          saturate(1357%) brightness(101%);
      }
    }
  }
`;

export const ModalDiv = styled.div`
  width: 25rem;
  height: 25rem;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(46, 178, 234, 1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const StyledContents = styled.textarea`
  width: 20rem;
  height: 8rem;
  padding: 15px;
  border: 5px solid rgba(200, 191, 191, 0.7);
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경 설정
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
  flex-direction: row;
  margin: 20px 0;
  label {
    margin-right: 20px;
    font-weight: bold;

    &:last-child {
      margin-right: 0;
    }
    input[type='radio'] {
      transform: scale(1.5);
    }
  }
`;

export const StyledReportSubmitButton = styled.button`
  width: 114px;
  height: 65px;
  flex-shrink: 0;
  border-radius: 45px;
  border: 5px solid #f3ce6d;

  background: #f9c10c;

  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset,
    0px 4px 4px 0px rgba(179, 179, 179, 0.25);
  text-align: center;
  font-family: Galmuri11;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: white;
  margin-top: 30px;
`;

export const ReportTitleDiv = styled.div`
  font-size: 30px;
  font-weight: 1000;
`;
