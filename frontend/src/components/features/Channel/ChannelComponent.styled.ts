import styled from 'styled-components';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

export const ChannelItemsWrapper = styled.div`
  width: 38rem;
  height: 32rem;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  gap: 0.3rem;
  flex-wrap: wrap;
  flex-direction: column;

  :hover {
    background-color: rgba(255, 78, 131, 1);
    transition: all 0.3s ease-in-out;
    color: #fff;
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;

    & .channel {
      color: #fff;
    }
  }
`;

export const ChannelItem = styled.button`
  width: 18rem;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  gap: 1rem;

  & .channel {
    color: rgba(255, 78, 131, 1);
    font-size: 28px;
  }
`;
