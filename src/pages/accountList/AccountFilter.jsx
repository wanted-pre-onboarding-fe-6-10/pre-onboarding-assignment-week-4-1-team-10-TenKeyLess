import React, { useState } from 'react';
import { getAccountsRequest } from '../../store/accountSlice';
import MakeSelectBox from '../../components/MakeSelectBox';
import MakeInput from '../../components/MakeInput';
import { BROKERS, ACCOUNT_STATUS } from '../../const';
import makeFilterData from '../../utils/makeFilterData';
import { useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

const AccountFilter = ({ COUNT_PER_PAGE }) => {
  const [putData, setPutData] = useState({
    _page: 1,
    _limit: COUNT_PER_PAGE,
    broker_id: '',
    status: '',
    is_active: '',
    q: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="grid grid-flow-col justify-items-center place-items-center h-24 mb-5 px-10  border-zinc-900 border-2">
      <MakeSelectBox
        list={BrokerArr}
        value={putData.broker_id}
        label="증권사"
        id="broker_id"
        onChange={value => setPutData(prev => ({ ...prev, broker_id: value.value }))}
      />

      <MakeSelectBox
        list={StatusArr}
        value={putData.status}
        label="계좌상태"
        id="status"
        onChange={value => setPutData(prev => ({ ...prev, status: value.value }))}
      />

      <MakeSelectBox
        list={ActiveArr}
        value={putData.is_active}
        label="활성화여부"
        id="is_active"
        onChange={value => setPutData(prev => ({ ...prev, is_active: value.value }))}
      />

      <MakeInput
        id="q"
        label="계좌명 검색"
        value={putData.q}
        onChange={value => setPutData(prev => ({ ...prev, q: value }))}
      />
      <div className="flex justify-center align-middle">
        <button
          className="mr-10 ml-[-5rem]"
          onClick={() => {
            setPutData({
              _page: 1,
              _limit: COUNT_PER_PAGE,
              broker_id: '',
              status: '',
              is_active: '',
              q: '',
            });
          }}
        >
          초기화
        </button>
        <button
          onClick={() => {
            navigate({
              pathname: '/accounts',
              search: `${createSearchParams(putData)}`,
            });

            dispatch(getAccountsRequest());
          }}
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default AccountFilter;

const BrokerArr = makeFilterData(BROKERS);
const StatusArr = makeFilterData(ACCOUNT_STATUS);
const ActiveArr = makeFilterData({ true: 'on', false: 'off' });
