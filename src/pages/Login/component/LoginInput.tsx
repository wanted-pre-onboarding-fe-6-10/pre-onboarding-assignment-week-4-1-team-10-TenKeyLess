import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ReducerType } from 'store/rootReducer';
import {
  handleValidation,
  initialInput,
  inputChage,
  loginRequest,
} from '../../../store/services/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { GetToken } from '../../../repository/TokenRepository';

const LoginInput = () => {
  const nav = useNavigate();
  const { input, errorMessage, isValid } = useSelector((state: ReducerType) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const checkValidInput = () => {
    const idCheck = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
    const passwordCheck = /^.{8,}$/g;
    const validation = idCheck.test(input.email) && passwordCheck.test(input.password);
    dispatch(handleValidation(validation));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(inputChage({ ...input, [name]: value }));
    checkValidInput();
  };

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    await dispatch(loginRequest(input));
    if (GetToken()) nav('/account');
    dispatch(inputChage(initialInput));
  };

  return (
    <form>
      <div>{errorMessage}</div>
      <label>
        email1
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <label>
        password
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <button disabled={!isValid} onClick={handleLogin}>
        로그인
      </button>
    </form>
  );
};

export default LoginInput;
