import React, { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAccountsRequest } from '../../store/accountSlice';
import { BROKERS, ACCOUNT_STATUS } from '../../const';
import Filter from './Filter';
import 'antd/dist/antd.css';
import { Table, Pagination } from 'antd';

// < 컴포넌트 시작 >
const AccountList = () => {
  const { accounts, totalCount } = useSelector(state => state.accounts);
  const [current, setCurrent] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let pageNationData = {}; // &_page=1&_limit=10 제외한 그 뒤에 필터조건 쿼리

    Object.entries(filterDataForm).forEach(data => {
      const key = data[0];
      const value = queryParams.get(key);

      if (value !== '' && value !== null) {
        pageNationData[key] = value;
      }
    });

    // 1. 라우터 변경하고
    // 페이지네이션 버튼 클릭시 "_page=3&_limit=10" 쿼리만 변경 <- 필터조건은 유지되야 함
    navigate({
      pathname: '/accounts',
      search: `${createSearchParams({
        _page: current,
        _limit: COUNT_PER_PAGE,
        ...pageNationData,
      })}`,
      // 🥝 page번호만 바뀌고, 필터된 데이터가 뒤에 쿼리로 고정되야 함.
    });

    // 2. api호출 > store 업데이트
    dispatch(getAccountsRequest()); //  get api - 10개만 get요청
  }, [current, dispatch, navigate]);

  const onPageChange = pageNum => {
    setCurrent(pageNum);
  };

  return (
    <div>
      <Filter COUNT_PER_PAGE={COUNT_PER_PAGE} />

      <Table
        columns={columns}
        dataSource={makeTableData(accounts)}
        pagination={{
          total: 10,
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />
      <Pagination
        className="mt-6 flex justify-center"
        current={current}
        onChange={onPageChange}
        total={totalCount}
        showSizeChanger={false}
      />
    </div>
  );
};

export default AccountList;

// < 상수데이터 >
const COUNT_PER_PAGE = 10;

const makeTableData = DATA => {
  const tableData = [];

  for (let i = 0; i < DATA.length; i += 1) {
    tableData.push({
      key: DATA[i].uuid,
      id: DATA[i].id,
      broker: BROKERS[DATA[i].broker_id],
      userId: DATA[i].userId,
      userName: `${DATA[i].user.name}`, //  사용자 상세로 이동 - userId로 user detail 검색하기
      acountName: DATA[i].name,
      accountNum: DATA[i].number, // [TODO]앞 뒤 두글자 제외하고 다 *마스킹 처리 ,
      assets: Math.floor(+DATA[i].assets).toLocaleString(),
      payments: Math.floor(+DATA[i].payments).toLocaleString(),
      createdAt: DATA[i].created_at,
      status: ACCOUNT_STATUS[DATA[i].status],
      isActive: DATA[i].is_active ? 'on' : 'off',
    });
  }

  return tableData;
};

const columns = [
  {
    title: '브로커',
    dataIndex: 'broker',
  },
  {
    title: '고객명',
    dataIndex: 'userName',
    render: (text, record) => <a href={`/user-detail/${record.userId}`}>{text}</a>,
  },
  {
    title: '계좌명',
    dataIndex: 'acountName',
    render: text => <div>{text}</div>,
  },
  {
    title: '계좌번호',
    dataIndex: 'accountNum',
    render: (text, record) => <a href={`/account-detail/${record.key}`}>{text}</a>, // uuid로 계좌디테일 페이지 이동
  },
  {
    title: '평가금액',
    dataIndex: 'assets',
  },
  {
    title: '입금금액',
    dataIndex: 'payments',
  },
  {
    title: '수익률',
    dataIndex: 'returnRate',
  },
  {
    title: '계좌개설일',
    dataIndex: 'createdAt',
  },
  {
    title: '계좌상태',
    dataIndex: 'status',
  },
  {
    title: '활성화여부',
    dataIndex: 'isActive',
    align: 'center',
  },
];

const filterDataForm = {
  broker_id: '',
  status: '',
  is_active: '',
  q: '',
};
