import styled from 'styled-components';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2.3rem;

  & .secondUl {
    margin-bottom: 2.5rem;
  }

  & ul {
    padding: 1rem;
    border: 1px solid #fff;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 37rem;
  }

  & li:hover {
    background-color: #5024ff;

    label {
      color: #fff;
    }
  }

  & .selected {
    width: 7rem;
    height: 3rem;
    border-radius: 1rem;
    background-color: #5024ff;
    margin-right: 1rem;

    :hover,
    :active {
      cursor:
        url(${hoverCursorIcon}) 2 2,
        auto !important;
    }

    & label {
      padding: 1rem;
      line-height: 3rem;
      font-size: 1.2rem;
      font-weight: bold;
      color: #fff;
    }
  }

  & .checkbox {
    width: 7rem;
    height: 3rem;
    border-radius: 1rem;
    background-color: #fff;
    margin-right: 1rem;

    :hover,
    :active {
      cursor:
        url(${hoverCursorIcon}) 2 2,
        auto !important;
    }

    & label {
      padding: 1rem;
      line-height: 3rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  & [type='checkbox'] {
    appearance: none;
  }

  & .selectYear {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  & .selectList {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
    width: 43rem;
    line-height: 2.5rem;
    margin-top: 0.8rem;

    & p {
      font-size: 1.4rem;
      font-weight: bold;
      color: #fcff5d;
    }
  }
`;
