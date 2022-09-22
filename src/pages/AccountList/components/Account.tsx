import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountList } from '../../../store/services/accountSlice';
import { GetToken } from '../../../repository/TokenRepository';
import { AppDispatch } from '../../../store/';

const Account = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = GetToken();
    token ? dispatch(getAccountList()) : nav('/');
  }, [GetToken()]);

  return <div>list</div>;
};

export default Account;
