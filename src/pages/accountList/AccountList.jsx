import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountsRequest } from '../../store/accountSlice';

const AccountList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountsRequest());
  }, []);

  return <div>AccountList 내용</div>;
};

export default AccountList;
