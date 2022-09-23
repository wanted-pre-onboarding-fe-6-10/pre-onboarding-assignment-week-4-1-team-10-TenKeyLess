import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsRequest, getFullAccountRequest } from '../../store/accountSlice';
import { getUserDetailRequest } from '../../store/userDetailSlice';
import { BROKERS, BROKER_FORMAT, ACCOUNT_STATUS } from '../../const';

import 'antd/dist/antd.css';
import { Table, Pagination, Button } from 'antd';
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons';

// < 컴포넌트 시작 >
const AccountList = () => {
  // const { page } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accounts, totalCount } = useSelector(state => state.accounts);
  // const { userDetails } = useSelector(state => state.userDetails);
  // console.log('userDetails', userDetails);
  console.log(accounts);

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(getFullAccountRequest({ currentPage: '', count: '' })); // 전체 get
    dispatch(getAccountsRequest({ currentPage: current, count: COUNT_PER_PAGE })); // 1페이지에 10개씩 get
    dispatch(getUserDetailRequest());
    navigate(`/accounts/${current}`);
  }, [current, dispatch, navigate]);

  const onChange = pageNum => {
    setCurrent(pageNum);
  };

  return (
    <div>
      <div className="h-24 mb-10 border-zinc-900 border-2">filter</div>
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
        current={current}
        onChange={onChange}
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
    // const maskingAccount = DATA[i].number;

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
      isActive: DATA[i].isActive ? 'on' : 'off',
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
    render: (text, record) => <AccountName text={text} record={record} />,
  },
  {
    title: '계좌번호',
    dataIndex: 'accountNum',
    render: (text, record) => <a href={`/account-detail/${record.key}`}>{text}</a>,
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

// [TODO]컴포넌트 분리
const AccountName = ({ text, record }) => {
  let [isDisable, setIsDisable] = useState(true);
  const [nameValue, setNameValue] = useState(text);

  const accountInputEL = useRef();

  return (
    <div className="flex mr-[-3rem]">
      <input
        type="text"
        value={nameValue}
        ref={accountInputEL}
        disabled={isDisable}
        onChange={e => setNameValue(e.target.value)}
        className={`w-30 mr-3 pl-2 ${isDisable ? 'bg-inherit' : 'bg-lime-200'}`}
      />
      <button
        type="button"
        className="pr-5"
        onClick={() => {
          setIsDisable(false);
          accountInputEL.current.focus();
        }}
      >
        <EditOutlined className="text-rose-400" />
      </button>
      <button
        type="button"
        className="pr-5"
        onClick={() => {
          setIsDisable(true);
          // [TODO] put api처리 (nameValue)
        }}
      >
        <CheckCircleOutlined className="text-green-500" />
      </button>
    </div>
  );
};
