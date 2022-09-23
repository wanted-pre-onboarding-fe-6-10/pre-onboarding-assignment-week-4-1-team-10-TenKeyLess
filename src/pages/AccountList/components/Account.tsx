import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountList } from '../../../store/services/accountSlice';
import { GetToken } from '../../../repository/TokenRepository';
import { AppDispatch } from '../../../store/';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { getFullAccountList } from '../../../store/services/paramSlice';
import AccountTitle from './AccountTitle';

const Account = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: ReducerType) => state.account);
  const { params } = useSelector((state: ReducerType) => state.param);

  const toUserDetail = (id: number) => nav(`/user/${id}`);
  const toAccountDetail = (number: string) => nav(`/account/${number}`);

  useEffect(() => {
    if (GetToken()) {
      dispatch(getAccountList(params));
      dispatch(getFullAccountList(parseInt(params._limit)));
    }
    if (!GetToken()) nav('/');
  }, [params]);

  return (
    <ul className="border-solid border-gray-500">
      <AccountTitle />
      {list.map((account, index) => {
        return (
          <li className="grid grid-cols-10 gap-4 text-center w-10/12" key={account.uuid}>
            <div>{index + 1}</div>
            <div onClick={() => toUserDetail(account.user_id)}>{account.user_id}</div>
            <div>{account.broker_id}</div>
            <div onClick={() => toAccountDetail(account.number)}>{account.number}</div>
            <div>{account.status}</div>
            <div>{account.name}</div>
            <div>{account.assets}</div>
            <div>{account.payments}</div>
            {account.is_active ? <div>활성화</div> : <div>비활성화</div>}
            <div>{account.created_at}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default Account;
