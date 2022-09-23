import useMutation from 'hooks/useMutation';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { tokenAtom } from './../atoms';

const Pages = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(tokenAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { data: signupData, loading: signupLoading }] = useMutation<any>(`/users/signup`);
  const [login, { data: loginData, loading: loginLoading }] = useMutation<any>(`/login`);
  const onSignup = () => {
    signup({
      email,
      password,
    });
  };

  const onLogin = () => {
    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (loginData) {
      setAccessToken(loginData.accessToken!);
    }
  }, [loginData]);

  console.log(signupData);
  console.log(loginData);
  console.log(accessToken);

  return (
    <div className="ml-16 mt-16">
      <h1>Pages</h1>
      <div>
        <input
          className="bg-blue-200"
          type="text"
          placeholder="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          className="bg-red-200"
          type="password"
          placeholder="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>
      <button className="w-16 h-8 mt-4 bg-blue-200" onClick={onSignup}>
        signup
      </button>
      <button className="w-16 h-8 bg-red-200" onClick={onLogin}>
        login
      </button>
      <Link to="/test">hi</Link>
    </div>
  );
};

export default Pages;
