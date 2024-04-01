import styled from 'styled-components';
import hoverCursorIcon from '../../../assets/img/hoverCursorIcon.png';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  width: 30rem;
  height: 45rem;
  border-radius: 1rem;
  background-color: #ececec;
  box-shadow: 2px 4px 6px 5px rgba(0, 0, 0, 0.3);
`;

export const TopContainer = styled.div`
  position: relative;
  width: 100%;
  height: 6rem;

  & h1 {
    position: absolute;
    top: 30%;
    left: 33%;
    color: #000;
    font-size: 2.5rem;
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }

  & p {
    position: absolute;
    top: 25%;
    right: 6%;
  }

  & img:hover,
  img:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

export const ContentContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
  line-height: 2rem;
  width: 25rem;
  height: 30rem;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: 2px 4px 6px 5px rgba(217, 217, 217, 1);

  & h2 {
    font-family: 'Galmuri11', 'sans-serif';
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  & h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & ul {
    padding-left: 1rem;
  }

  & li {
    list-style: circle;
  }
`;

export const CheckBoxInput = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  padding-left: 2.5rem;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;

  & .musiqLogoPosition {
    margin-left: 8rem;
    line-height: 70px;
  }

  & .dancingChickPosition {
    margin-left: 3rem;
  }
`;
