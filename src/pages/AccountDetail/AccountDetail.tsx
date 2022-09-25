import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Account } from 'src/types/types';
import { handleGender } from '../../utils/handleGender';
import { AppDispatch } from '../../store/';
import { ReducerType } from '../../store/rootReducer';
import { getAccountDetail } from '../../store/services/accountSlice';
import { handleStatus } from '../../utils/handleStatus';
import handleBrokers from '../../utils/handleBroker';
import addComma from '../../utils/addComma';
import handleDate from '../../utils/handleDate';

const AccountDetail = () => {
  const { idx } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { detail } = useSelector((state: ReducerType) => state.account);

  useEffect(() => {
    dispatch(getAccountDetail(parseInt(idx as string)));
  }, []);

  const account = detail as Account;
  console.log(account.user?.age);

  return (
    <div>
      <div>
        account-detail
        <div>
          <span>브로커명</span>
          <span>{handleBrokers(account.broker_id)}</span>
        </div>
        <div>{account.number}</div>
        <div>{account.name}</div>
        <div>{handleStatus(account.status)}</div>
        <div>{addComma(account.assets)}</div>
        <div>{addComma(account.payments)}</div>
        <div>{account.is_active}</div>
        <div>{handleDate(account.created_at)}</div>
        <div>{handleDate(account.updated_at)}</div>
      </div>
      <div>
        user-detail
        <div>{account.user?.age}</div>
        <div>{account.user?.address}</div>
        <div>{account.user?.detail_address}</div>
        <div>{handleDate(account.user?.birth_date)}</div>
        <div>{handleDate(account.user?.created_at)}</div>
        <div>{account.user?.email}</div>
        <div>{handleGender(account.user?.gender_origin)}</div>
        <div>{handleDate(account.user?.last_login)}</div>
      </div>
    </div>
  );
};

export default AccountDetail;
