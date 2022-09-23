import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountList } from '../../../store/services/accountSlice';
import { GetToken } from '../../../repository/TokenRepository';
import { AppDispatch } from '../../../store/';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { getFullAccountList } from '../../../store/services/pageSlice';

const Account = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: ReducerType) => state.account);
  const { params } = useSelector((state: ReducerType) => state.page);

  useEffect(() => {
    const token = GetToken();
    if (token) {
      dispatch(getAccountList(params));
      dispatch(getFullAccountList(parseInt(params._limit)));
    } else {
      nav('/');
    }
  }, []);

  return (
    <>
      {list.map(account => {
        return <li key={account.uuid}>{account.id}</li>;
      })}
    </>
  );
};

export default Account;
