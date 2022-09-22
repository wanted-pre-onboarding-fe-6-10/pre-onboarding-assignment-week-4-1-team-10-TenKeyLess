import authService from '../../../api/AuthService';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ReducerType } from 'store/rootReducer';
import { inputChage } from '../../../store/services/authSlice';
import { SetToken } from '../../../repository/TokenRepository';
import { useNavigate } from 'react-router-dom';

const LoginInput = () => {
  const nav = useNavigate();
  const input = useSelector((state: ReducerType) => state.auth.input);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(inputChage({ ...input, [name]: value }));
  };

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async e => {
    try {
      e.preventDefault();
      const { data } = await authService(input);
      const token = data.accessToken;
      SetToken(token);
      nav('/account');
    } catch {
      console.error('error');
    }
  };

  return (
    <form>
      <label>
        email1
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <label>
        password
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <button onClick={handleLogin}>로그인</button>
    </form>
  );
};

export default LoginInput;
