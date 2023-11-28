import styled from 'styled-components';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  & h2 {
    font-size: 2rem;
    font-weight: bold;
  }

  & ul {
    position: relative;
    display: flex;
    gap: 2rem;

    & p {
      position: absolute;
      left: 15%;
      bottom: -2.5rem;
      font-weight: bold;

      & span {
        color: #fcff5d;
        font-size: 1.5rem;
      }
    }

    & li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      & label {
        display: flex;
        padding: 0.2em 0.4em;

        & [type='radio'],
        span {
          font-size: 1.7rem;
          font-weight: bold;
        }

        & [type='radio'] {
          appearance: none;
        }
      }
    }
  }
`;

export const SelectRadioStyle = styled.div`
  position: relative;

  & .circle {
    position: absolute;
    top: 20%;
    left: 28%;
    width: 1.2rem;
    height: 1.2rem;
    background-color: #fff;
    border-radius: 50%;
  }
`;
