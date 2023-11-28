import styled from 'styled-components';
import hoverCursorIcon from '../../assets/img/hoverCursorIcon.png';

export const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .startIcon {
    :hover,
    :active {
      cursor:
        url(${hoverCursorIcon}) 2 2,
        auto !important;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

export const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  gap: 3rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: max-content;

  & li {
    text-align: left;
    font-size: 1.7rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  & li:nth-child(1) {
    padding-bottom: 5.5rem;
  }

  & li:nth-child(2) {
    padding-bottom: 16.5rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: max-content;
  gap: 3rem;
  height: 30rem;
`;
