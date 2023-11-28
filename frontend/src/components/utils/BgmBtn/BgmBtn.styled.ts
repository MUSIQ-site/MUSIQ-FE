import styled from 'styled-components';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

export const Container = styled.div`
  height: 15rem;
  position: absolute;
  top: 3%;
  right: 3%;
`;

export const StyledBgmBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  .megaphone:hover,
  .megaphone:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

export const ExplainBox = styled.div<{ time: number }>`
  position: absolute;
  top: 80%;
  right: 0;
  opacity: ${(props) => (props.time > 0 ? '1' : '0')};
  padding: 1rem;
  width: 15rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  transition: opacity 0.2s linear;

  & :nth-child(2) {
    font-size: 0.8rem;
  }
`;
