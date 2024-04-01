import styled from 'styled-components';
import { motion } from 'framer-motion';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

export const GreyBackground = styled.div`
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const ModalContainer = styled(motion.div)`
  position: absolute;
  top: 13%;
  left: 50%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 566px;
  min-height: 450px;
  background-color: #f67576;
  border: 5px solid rgba(235, 226, 255, 0.8);
  border-radius: 12px;
  text-align: center;
  padding: 24px 32px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: 900;
    font-size: 2rem;
    padding-bottom: 2rem;
  }

  & .cancelBtn {
    position: absolute;
    top: 4%;
    right: 4%;

    :hover {
      cursor:
        url(${hoverCursorIcon}) 2 2,
        auto !important;
    }
  }

  & .loadingContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-top: 100px;

    & .loadingSppinerText p {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`;

export const TitleChangeStyle = styled.div`
  position: relative;
  margin-bottom: 0.5rem;

  & .roomTitleStyle {
    width: 344px;
    height: 50px;
    padding: 1rem;
    border-radius: 8px;
    border: 3px solid #363636;
  }

  & .errorTitle {
    position: absolute;
    bottom: -1.2rem;
    right: 0;
    left: 0;
    color: #f11c1c;
    font-weight: bold;
  }
`;

export const YearListStyle = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 24.5rem;
  border: 5px solid rgba(242, 160, 173, 1);
  border-radius: 8px;
  text-align: center;
  padding: 1rem;

  & h2 {
    font-size: 1.5rem;
    padding-bottom: 0.7rem;
  }

  & .yearList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 0.2rem;
  }

  & label {
    width: 5rem;
  }
`;

export const QuizAmountMaxUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 24.5rem;
  border: 5px solid rgba(242, 160, 173, 1);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;

  & .whiteLine {
    width: 4px;
    background-color: rgba(242, 160, 173, 1);
    margin-left: 10px;
  }
`;

export const QuizAmountStyle = styled.div`
  & h2 {
    font-size: 1.5rem;
    padding-bottom: 0.7rem;
  }
`;

export const MaxUserNumberInputStyle = styled.div`
  flex: 1;

  & h2 {
    font-size: 1.5rem;
    padding-bottom: 0.7rem;
  }

  & button {
    width: 1.5rem;
  }

  & input {
    width: 3rem;
  }

  .maxUserNumberInput::-webkit-outer-spin-button,
  .maxUserNumberInput::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

export const UpdateBtnStyle = styled.button`
  width: 8rem;
  height: 3rem;
  border: 3px solid rgba(243, 206, 109, 1);
  border-radius: 100px;
  background-color: rgba(249, 193, 12, 0.6);
  font-family: 'Galmuri11', 'sans-serif';
  font-weight: bold;
  font-size: 1.3rem;
  color: #fff;

  &:hover {
    border: 3px solid rgba(243, 206, 109, 1);
    background-color: rgba(249, 193, 12, 1);
    transition: all 0.2s ease-in-out;
  }
`;
