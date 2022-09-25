import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUsersRequest } from '../../store/usersSlice';
import makeFilterData from '../../utils/makeFilterData';
import MakeSelectBox from '../../components/MakeSelectBox';
import MakeInput from '../../components/MakeInput';

const UserFilter = ({ COUNT_PER_PAGE }) => {
  const [putData, setPutData] = useState({
    _page: 1,
    _limit: COUNT_PER_PAGE,
    is_staff: '',
    is_active: '',
    q: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="grid grid-flow-col justify-items-center place-items-center h-24 mb-2 px-10  border-zinc-900 border-2">
      <MakeSelectBox
        list={ActiveArr}
        value={putData.is_active}
        label="활성화여부"
        id="is_active"
        onChange={value => setPutData(prev => ({ ...prev, is_active: value.value }))}
      />

      <MakeSelectBox
        list={StaffArr}
        value={putData.is_staff}
        label="임직원 여부"
        id="is_staff"
        onChange={value => setPutData(prev => ({ ...prev, is_staff: value.value }))}
      />
      <MakeInput
        id="q"
        label="전체 검색"
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
              is_staff: '',
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
              pathname: '/users',
              search: `${createSearchParams(putData)}`,
            });

            dispatch(getUsersRequest());
          }}
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default UserFilter;

const ActiveArr = makeFilterData({ true: 'on', false: 'off' });
const StaffArr = makeFilterData({ true: '직원', false: '일반인' });
