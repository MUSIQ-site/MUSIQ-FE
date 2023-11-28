import styled from 'styled-components';

export const RoomsWrapper = styled.div`
  width: 62rem;
  height: 27rem;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 6%;
  left: 23.5%;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 3px;
`;

export const Room = styled.button`
  width: 30rem;
  height: 8rem;
  padding: 1rem;
  margin: 4px;
  border: 1px solid #ccc;
  border-radius: 15px;
  display: flex;
`;

export const PreviousButton = styled.button`
  display: flex;
  position: absolute;
  left: -9%;
  top: 32%;
`;

export const NextButton = styled.button`
  display: flex;
  position: absolute;
  right: -9%;
  top: 32%;
`;

export const RoomNumberDiv = styled.div`
  position: absolute;
  font-family: 'Galmuri11', 'sans-serif';
  font-weight: bold;
  font-size: 28px;
  margin-top: -0.5%;
`;

export const RoomTitleDiv = styled.div`
  width: 15rem;
  position: absolute;
  font-size: 1.3rem;
  margin-top: -0.3%;
  margin-left: 9.2%;
  font-weight: bold;
  text-align: left;
`;

export const RoomManagerDiv = styled.div`
  position: absolute;
  font-size: 1.2rem;
  margin-top: 7.2%;
  margin-left: 9.2%;

  & span {
    font-size: 1.2rem;
    color: rgba(255, 78, 131, 1);
  }
`;

export const RoomYearsDiv = styled.div`
  position: absolute;
  width: 6rem;
  font-size: 1.2rem;
  margin-top: 4.5%;
  margin-left: 36%;
  color: #666;
`;

export const RoomPeopleDiv = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 7%;
  margin-left: 3.5%;
`;

export const IsPrivateimg = styled.img`
  position: absolute;
  margin-top: 7.2%;
  margin-left: 0;
`;

export const RoomQuizAmountDiv = styled.div`
  position: absolute;
  font-size: 22px;
  margin-left: 35%;
  margin-top: -0.2%;
`;
export const NoRoomImg = styled.img`
  margin: auto;
`;

export const PasswordModalWrapper = styled.div`
  width: 30vw;
  height: 50vh;
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

export const StyledModalInput = styled.input`
  width: 14vw;
  height: 6vh;
  border-radius: 8px;
  margin-bottom: 1%;
  margin-top: 20%;
`;

export const StyledExitButton = styled.button`
  position: absolute;
  top: 3%;
  right: 2%;
`;

export const StyledSubmitButton = styled.button`
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
  margin-top: 10%;
`;
export const StyledModalForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
