import styled from 'styled-components';

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

export const StyledModal = styled.div`
  width: 40vw;
  height: 60vh;
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

export const StyledRoomTitleInput = styled.input`
  width: 20vw;
  height: 6vh;
  border-radius: 8px;
  margin-bottom: 1%;
  margin-top: 1%;
`;

export const StyledRoomPasswordInput = styled.input`
  width: 20vw;
  height: 6vh;
  border-radius: 8px;
`;

export const StyledCreateRoomButton = styled.button`
  width: 14vw;
  height: 8vh;
  border: 5px solid rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  background: rgba(255, 203, 21, 0.9);
  box-shadow:
    4px 4px 4px 0px rgba(0, 0, 0, 0.1) inset,
    0px 4px 4px 0px rgba(179, 179, 179, 0.25);
  font-size: 20px;
  font-weight: bold;
  margin-top: 2%;
`;

export const StyledExitButton = styled.button`
  width: 5vw;
  height: 6vh;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  top: 3%;
  right: 2%;
`;
export const SelectYearWrapper = styled.div`
  display: block;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  border: 5px solid rgba(235, 226, 255, 0.4);
  border-radius: 8px;
  margin-top: 1%;
  padding: 1%;
  width: 20vw;
`;

export const SelectQuizAmoutWrapper = styled.div`
  display: block;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  border: 5px solid rgba(235, 226, 255, 0.4);
  border-radius: 8px;
  margin-top: 1%;
  padding: 1%;
  width: 20vw;
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  transform: scale(2);
`;

export const StyledRadio = styled.input.attrs({ type: 'radio' })`
  transform: scale(2);
`;

export const StyledYearLabel = styled.label`
  display: inline-flex;
  align-items: center;
  text-align: center;
  margin: 1%;
`;

export const StyledAmountLabel = styled.label`
  display: inline-flex;
  align-items: center;
  text-align: center;
  margin: 1%;
`;

export const StyledIsPrivateRoomCheckBoxDiv = styled.div`
  position: absolute;
  top: 24%;
  right: 10%;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경 설정
  z-index: 1000; 
`;
