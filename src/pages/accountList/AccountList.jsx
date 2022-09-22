import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsRequest } from '../../store/accountSlice';

const AccountList = () => {
  const dispatch = useDispatch();
  // const result = useSelector(state => console.log(state));
  // console.log(result);

  useEffect(() => {
    dispatch(getAccountsRequest());
  }, []);

  return <div>AccountList 내용</div>;
};

export default AccountList;
