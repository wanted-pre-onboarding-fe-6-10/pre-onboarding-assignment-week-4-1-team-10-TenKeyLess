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
    <form className="w-1/4">
      <div>{errorMessage}</div>
      <label className="block w-full mb-2 text-mg font-medium text-gray-900 mx-2 my-10">
        E-mail
        <input
          className="block bg-gray-50 border border-gray-300 text-gray-900 rounded-lg min-w-full focus:ring-blue-500 h-11 p-2 my-1"
          type="email"
          name="email"
          placeholder="email@sample.com"
          onChange={handleInputChange}
        />
      </label>
      <label className="block mb-2 w-full text-md font-medium text-gray-900 mx-2 my-10">
        Password
        <input
          className="block bg-gray-50 border border-gray-300 text-gray-900 rounded-lg min-w-full focus:ring-blue-500 h-11 p-2 my-1"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          onChange={handleInputChange}
        />
      </label>
      <button
        className="block w-full h-11 mx-2 my-10 bg-blue-300 rounded-lg text-md font-medium hover:bg-blue-400 cursor-pointer disabled:bg-gray-500"
        disabled={!isValid}
        onClick={handleLogin}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginInput;
