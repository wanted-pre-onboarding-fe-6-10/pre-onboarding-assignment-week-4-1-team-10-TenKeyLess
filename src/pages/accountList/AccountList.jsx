import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsRequest, getFullAccountRequest } from '../../store/accountSlice';
import { getUserDetailRequest } from '../../store/userDetailSlice';
import { BROKERS, BROKER_FORMAT, ACCOUNT_STATUS } from '../../const';
import Filter from './Filter';
import 'antd/dist/antd.css';
import { Table, Pagination, Button } from 'antd';
import { EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// < 컴포넌트 시작 >
const AccountList = () => {
  // const { page } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accounts, totalCount } = useSelector(state => state.accounts);
  // const { userDetails } = useSelector(state => state.userDetails);
  // console.log('userDetails', userDetails);

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(getFullAccountRequest({ _page: '', _limit: '' })); // 🍒 get api
    dispatch(getAccountsRequest({ _page: current, _limit: COUNT_PER_PAGE })); // 🍒 get api
    dispatch(getUserDetailRequest());
    navigate(`/accounts/${current}`);
  }, [current, dispatch, navigate]);

  const onChange = pageNum => {
    setCurrent(pageNum);
  };

  return (
    <div>
      <Filter current={current} COUNT_PER_PAGE={COUNT_PER_PAGE} />

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
    render: (text, record) => <div>{text}</div>,
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
