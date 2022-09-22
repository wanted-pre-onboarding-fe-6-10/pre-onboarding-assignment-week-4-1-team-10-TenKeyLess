import { useState } from 'react';
import { signIn } from '../api/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { setCookie } from '../utils/cookie';

export function useLoginHook() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = e => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onLogin = async e => {
    e.preventDefault();

    const loginRes = await signIn(email, password);
    dispatch(setUser(loginRes.user.email));
    if (user) {
      window.location.replace('/account_list');
    }
    setCookie('myToken', loginRes.accessToken);
  };

  return { email, password, onChange, onLogin };
}
