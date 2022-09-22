import React from 'react';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    alert('로그인 정보가 없습니다');
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default Auth;
