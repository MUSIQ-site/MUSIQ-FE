import React from 'react';
import { Navigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const PrivateRoute = ({ authenticated, component: Component }) =>
  authenticated ? (
    Component
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Navigate to="/login" {...alert('로그인이 필요한 서비스입니다.')} />
  );

export default PrivateRoute;
