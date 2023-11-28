/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PublicRoute = ({
  authenticated,
  restricted,
  component: Component,
  ...rest
}) =>
  // restricted = false 로그인 여부와 관계없이 접근 가능 페이지
  // restricted = true 로그인한 상태에선 접근 불가능: 로그인, 회원가입
  !authenticated && restricted ? <Navigate to="/select-mode" /> : Component;
export default PublicRoute;
