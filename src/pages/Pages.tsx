import useMutation from 'hooks/useMutation';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenAtom } from './../atoms';

const Pages = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { data: signupData, loading: signupLoading }] = useMutation<any>(
    `${process.env.REACT_APP_BASE_URL}/users/signup`
  );
  const [login, { data: loginData, loading: loginLoading }] = useMutation<any>(
    `${process.env.REACT_APP_BASE_URL}/login`
  );
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
    <div className="bg-red-600">
      <h1 className="text-blue-600">Pages</h1>
      <button onClick={onSignup}>signup</button>
      <button onClick={onLogin}>login</button>
      <Link to="/test">hi</Link>
    </div>
  );
};

export default Pages;
