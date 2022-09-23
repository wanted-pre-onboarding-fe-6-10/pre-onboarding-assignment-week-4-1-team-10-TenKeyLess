import React, { useState } from 'react';
import { getAccountsRequest, getFullAccountRequest } from '../../store/accountSlice';
import MakeSelectBox from '../../components/MakeSelectBox';
import MakeInput from '../../components/MakeInput';
import { BROKERS, ACCOUNT_STATUS } from '../../const';
import MakeFilterData from '../../utils/makeFilterData';
import { useDispatch, useSelector } from 'react-redux';

const BrokerArr = MakeFilterData(BROKERS);
const StatusArr = MakeFilterData(ACCOUNT_STATUS);
const ActiveArr = MakeFilterData({ true: 'on', false: 'off' });

const Filter = ({ current, COUNT_PER_PAGE }) => {
  const [putData, setPutData] = useState({
    broker_id: '',
    status: '',
    is_active: '',
    q: '',
  });
  const dispatch = useDispatch();

  console.log(putData);
  return (
    <div className="grid grid-flow-col justify-items-center place-items-center h-24 mb-5 px-10  border-zinc-900 border-2">
      <MakeSelectBox
        list={BrokerArr}
        value={putData.broker_id}
        label="Broker"
        id="broker_id"
        onChange={value => setPutData(prev => ({ ...prev, broker_id: value.value }))}
      />

      <MakeSelectBox
        list={StatusArr}
        value={putData.status}
        label="Status"
        id="status"
        onChange={value => setPutData(prev => ({ ...prev, status: value.value }))}
      />

      <MakeSelectBox
        list={ActiveArr}
        value={putData.is_active}
        label="Active"
        id="is_active"
        onChange={value => setPutData(prev => ({ ...prev, is_active: value.value }))}
      />

      <MakeInput
        id="q"
        label="Full search"
        value={putData.q}
        onChange={value => setPutData(prev => ({ ...prev, q: value }))}
      />
      <div className="flex justify-center align-middle">
        <button
          className="mr-10 ml-[-5rem]"
          onClick={() => {
            setPutData({
              broker_id: '',
              status: '',
              is_active: '',
              q: '',
            });
            dispatch(getFullAccountRequest({ _page: '', _limit: '' })); // 🍒 get api - 전체 길이 다시 저장해서 페이지버튼 전체 나오게끔.
          }}
        >
          초기화
        </button>
        <button
          onClick={() => {
            // 🍒 get api
            dispatch(getAccountsRequest({ _page: current, _limit: COUNT_PER_PAGE, ...putData })); // 🍒 get api - 필터된 데이터 10개씩 요청
            dispatch(getFullAccountRequest({ ...putData })); // 🍒 get api - 필터된 데이터 전체 요청 > 전체 길이 저장 > 페이지버튼 출력
          }}
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default Filter;
