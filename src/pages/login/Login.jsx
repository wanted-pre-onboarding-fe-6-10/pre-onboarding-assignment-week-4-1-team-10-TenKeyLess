import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// newface@dco.com
// super-strong-password

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/login',
      data: {
        email: 'newface@dco.com',
        password: 'super-strong-password',
        // email: data.email,
        // password: data.password,
      },
    }).then(res => console.log(res));
  };

  useEffect(() => {
    fetch('http://localhost:4000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'newface@dco.com',
        password: 'super-strong-password',
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      });
  }, []);

  return (
    <div className="bg-slate-500 w-full h-screen flex flex-col items-center">
      <h1 className="text-4xl mt-32 mb-10">December &amp; Company</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col boreder-2  w-7/12">
        <label htmlFor="email" className="py-3">
          Email
        </label>
        <input
          className="p-2 rounded-md"
          placeholder="이메일을 입력하세요"
          type="email"
          {...register('email', {
            required: true,
            validate: value => value.length > 0,
          })}
        />
        {errors.email && <p className="text-red-900">이메일을 입력하세요.</p>}

        <label htmlFor="password" className="py-3">
          password
        </label>
        <input
          className="p-2 rounded-md"
          placeholder="8글자 이상(1개이상의 영문, 숫자, 특수문자 포함)"
          {...register('password', {
            required: true,
            validate: {
              positiveLength: value => value.length >= 8,
              lessThanHundred: value => pwIsValid(value),
            },
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p className="boreder-2 text-red-900">비밀번호를 입력하세요!</p>
        )}
        {errors.password && errors.password.type === 'positiveLength' && (
          <p className="boreder-2 text-red-900">8자리 이상 입력하세요!</p>
        )}
        {errors.password && errors.password.type === 'lessThanHundred' && (
          <p className="boreder-2 text-red-900"> 영문 , 숫자, 특수문자 최소 1개 이상 포함</p>
        )}

        <input type="submit" className="boreder-2" />
      </form>
    </div>
  );
};

export default Login;

const pwIsValid = txt => {
  // const reg = new RegExp(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/);
  const reg = new RegExp(/^(?=.*[a-zA-z]).{8,}$/);
  return reg.test(txt) ? true : false;
};
