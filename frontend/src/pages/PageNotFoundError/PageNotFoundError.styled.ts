import styled from 'styled-components';

export const StyledPageNotFoundErrorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  & img {
    z-index: 9999;
  }

  & button {
    z-index: 9999;
    width: 13rem;
    height: 5rem;
    border: 3px solid rgba(255, 173, 174, 0.6);
    border-radius: 16px;
    background-color: rgba(226, 61, 65, 0.6);
    font-family: 'Galmuri11', 'sans-serif';
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;

    &:hover {
      border: 3px solid rgba(226, 61, 65, 1);
      background-color: rgba(226, 61, 65, 1);
      transition: all 0.3s ease-in-out;
    }
  }
`;

export const StyledBg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 99;
`;
