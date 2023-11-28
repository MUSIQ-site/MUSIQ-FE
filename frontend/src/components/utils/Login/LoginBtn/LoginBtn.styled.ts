import styled from 'styled-components';
import LoginBtnPng from '../../../../assets/img/Login/loginBtn.png';
import clickLoginBtn from '../../../../assets/img/Login/clickLoginBtn.png';
import SignupBtnPng from '../../../../assets/img/Signup/signupBtn.png';
import clickSignupBtnPng from '../../../../assets/img/Signup/clickSignupBtn.png';

export const LoginButtonContainer = styled.button<{
  isDisabled: boolean;
  content: string;
}>`
  width: 310px;
  height: 56px;
  background-image: ${(props) =>
    props.content === 'login' ? `url(${LoginBtnPng})` : `url(${SignupBtnPng})`};
  background-size: cover;

  &:active {
    background-image: ${(props) =>
      props.content === 'login'
        ? `url(${clickLoginBtn})`
        : `url(${clickSignupBtnPng})`};
    background-position: 0;
  }
`;
