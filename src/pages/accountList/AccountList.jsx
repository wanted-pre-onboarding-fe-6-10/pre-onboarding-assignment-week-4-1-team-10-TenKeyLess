import React, { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsRequest } from '../../store/accountSlice';
import { BROKERS, ACCOUNT_STATUS, accountFilterDataForm } from '../../const';
import AccountFilter from './AccountFilter';
import 'antd/dist/antd.css';
import { Table, Pagination } from 'antd';

const AccountList = () => {
  const { accounts, totalCount } = useSelector(state => state.accounts);
  const [current, setCurrent] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let pageNationData = {};
    Object.entries(accountFilterDataForm).forEach(data => {
      const key = data[0];
      const value = queryParams.get(key);

      if (value !== '' && value !== null) {
        pageNationData[key] = value;
      }
    });

    navigate({
      pathname: '/accounts',
      search: `${createSearchParams({
        _page: current,
        _limit: COUNT_PER_PAGE,
        ...pageNationData,
      })}`,
    });

    dispatch(getAccountsRequest());
  }, [current, dispatch, navigate]);

  const onPageChange = pageNum => {
    setCurrent(pageNum);
  };

  return (
    <div>
      <AccountFilter COUNT_PER_PAGE={COUNT_PER_PAGE} />

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

// 상수데이터
const COUNT_PER_PAGE = 10;

const makeTableData = DATA => {
  const tableData = [];

  for (let i = 0; i < DATA.length; i += 1) {
    const rate = (((+DATA[i].assets - +DATA[i].payments) / +DATA[i].payments) * 100)
      .toString()
      .slice(0, 5);

    tableData.push({
      key: DATA[i].uuid,
      id: DATA[i].id,
      broker: BROKERS[DATA[i].broker_id],
      userId: DATA[i].userId,
      userName: `${DATA[i].user.name}`,
      acountName: DATA[i].name,
      accountNum: DATA[i].number,
      assets: Math.floor(+DATA[i].assets).toLocaleString(),
      payments: Math.floor(+DATA[i].payments).toLocaleString(),
      createdAt: DATA[i].created_at,
      status: ACCOUNT_STATUS[DATA[i].status],
      isActive: DATA[i].is_active ? 'on' : 'off',
      returnRate: `${rate}`,
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
    render: (text, record) => <a href={`/users/${record.userId}`}>{text}</a>,
  },
  {
    title: '계좌명',
    dataIndex: 'acountName',
    render: text => <div>{text}</div>,
  },
  {
    title: '계좌번호',
    dataIndex: 'accountNum',
    render: (text, record) => <a href={`/accounts/${record.key}`}>{text}</a>, // uuid로 계좌디테일 페이지 이동
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
    render: text => <div className={`${+text > 0 ? 'text-sky-600' : 'text-red-700'}`}>{text}%</div>,
  },
  {
    title: '계좌개설일',
    dataIndex: 'createdAt',
    render: text => <div>{`${new Date(text).toLocaleString()}`}</div>,
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
