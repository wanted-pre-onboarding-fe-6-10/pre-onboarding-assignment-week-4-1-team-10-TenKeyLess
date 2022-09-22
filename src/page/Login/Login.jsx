import React from 'react';
import { useLoginHook } from '../../hoc/useLoginHook';

const Login = () => {
  const { email, password, onChange, onLogin } = useLoginHook();

  return (
    <div className="bg-gray-200 w-full h-screen flex items-center justify-center">
      <div className="bg-white w-[360px] p-8 rounded-md">
        <h3 className="mb-4 text-lg font-bold">로그인</h3>
        <form onSubmit={onLogin}>
          <input
            className="w-full outline-0 border-b-2 border-sky-300 p-2 mb-1"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="이메일을 입력해주세요"
          />
          <input
            className="w-full outline-0 border-b-2 border-sky-300 p-2 mb-1"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <button className="w-full mt-3 bg-sky-300 p-2 rounded-md text-white font-bold">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
