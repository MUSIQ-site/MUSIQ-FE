import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const ChannelWrapper = styled.div`
  min-width: 40rem;
  height: 40rem;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.4);
  flex-direction: column;
`;
