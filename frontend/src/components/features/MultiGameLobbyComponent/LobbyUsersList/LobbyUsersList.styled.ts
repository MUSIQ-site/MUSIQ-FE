import styled from 'styled-components';

export const UsersListWrapper = styled.div`
  width: 15vw;
  height: 79vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 16.5%;
  left: 4.5%;
`;

export const UserCellWrapper = styled.div`
  width: 13vw;
  height: 70vh;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  bottom: 2%;
  position: absolute;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: pink;
  }
`;

export const UserCell = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

export const ConnectedUserText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 8%;
`;
