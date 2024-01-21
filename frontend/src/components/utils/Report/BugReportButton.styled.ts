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
  width: 25vw;
  height: 55vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 118, 120, 1);
  position: absolute;
  z-index: 1;
`;

export const StyledContents = styled.textarea`
  width: 20vw;
  height: 10vh;
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
`;
