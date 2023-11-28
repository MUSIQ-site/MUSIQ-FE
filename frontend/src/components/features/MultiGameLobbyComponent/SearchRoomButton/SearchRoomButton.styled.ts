import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PasswordModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 30vw;
  height: 30vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 118, 120, 1);
  position: absolute;
  z-index: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`;

export const ButtonsWrapper = styled.div`
  width: 10vw;
  height: 11vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const StyledInput = styled.input`
  width: 14vw;
  height: 7vh;
  border-radius: 8px;
`;

export const SubmitButton = styled.button`
  width: 8vw;
  height: 6vh;
  border: 5px solid rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  background: rgba(255, 203, 21, 0.9);
  box-shadow:
    4px 4px 4px 0px rgba(0, 0, 0, 0.1) inset,
    0px 4px 4px 0px rgba(179, 179, 179, 0.25);
  font-size: 18px;
  font-weight: bold;
  margin-top: 4%;
`
