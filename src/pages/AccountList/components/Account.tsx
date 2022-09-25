import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountList } from '../../../store/services/accountSlice';
import { GetToken } from '../../../repository/TokenRepository';
import { AppDispatch } from '../../../store/';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { getFullAccountList } from '../../../store/services/paramSlice';
import toDetail from '../../../utils/toDetail';
import { handleStatus } from '../../../utils/handleStatus';
import handleBrokers from '../../../utils/handleBroker';
import handleDate from '../../../utils/handleDate';
import addComma from '../../../utils/addComma';

const Account = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: ReducerType) => state.account);
  const { params } = useSelector((state: ReducerType) => state.param);

  useEffect(() => {
    if (GetToken()) {
      dispatch(getAccountList(params));
      dispatch(getFullAccountList(params));
    }
    if (!GetToken()) nav('/');
  }, [params]);

  return (
    <ul className="border-solid border-gray-500 ">
      {list.map((account, index) => {
        return (
          <li
            className="m-auto grid grid-cols-9 gap-4 text-center w-10/12 my-3 text-center"
            key={account.uuid}
          >
            <div onClick={() => toDetail(nav, '/user/', account.userId)}>{account.user.name}</div>
            <div>{handleBrokers(account.broker_id)}</div>
            <div onClick={() => toDetail(nav, '/account/', account.id)}>{account.number}</div>
            <div>{handleStatus(account.status)}</div>
            <div>{account.name}</div>
            <div>{addComma(account.assets)}원</div>
            <div>{addComma(account.payments)}원</div>
            {account.is_active ? <div>활성화</div> : <div>비활성화</div>}
            <div>{handleDate(account.created_at)}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default Account;
