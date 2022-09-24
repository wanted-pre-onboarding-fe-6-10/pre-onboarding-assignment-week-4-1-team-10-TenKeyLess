import React, { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from '../../store/usersSlice';
import { BROKERS, ACCOUNT_STATUS, filterDataForm } from '../../const';
import { userNameMasking } from '../../utils/masking';
import UserFilter from './UserFilter';

import 'antd/dist/antd.css';
import { Table, Pagination } from 'antd';

const UserList = () => {
  const dispatch = useDispatch();
  const {
    users: { data },
    users: { totalCount },
  } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  console.log(data);

  return (
    <div>
      <UserFilter COUNT_PER_PAGE={COUNT_PER_PAGE} />

      <Table
        columns={columns}
        dataSource={makeTableData(data)}
        pagination={{
          total: 10,
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />

      {/* <Pagination
        className="mt-6 flex justify-center"
        current={current}
        onChange={onPageChange}
        total={totalCount}
        showSizeChanger={false}
      /> */}
    </div>
  );
};

export default UserList;

const makeTableData = data => {
  const tableData = [];

  if (!data) {
    return tableData;
  }

  for (let i = 0; i < data.length; i += 1) {
    console.log(typeof data[i].setting.is_active);
    tableData.push({
      id: data[i].id,
      key: data[i].id,
      userName: data[i].name,
      gender: data[i].gender_origin,
      birthDate: data[i].birth_date,
      phoneNumber: data[i].phone_number,
      email: data[i].email,
      createdAt: data[i].created_at,
      lastLogin: data[i].last_login,
      allowMarketing: data[i].setting.allow_marketing_push,
      // isStaff: data[i].setting.is_staff, // 🍒
      isActive: data[i].setting.is_active,
      accountNum: data[i].accounts.length,
    });
  }

  return tableData;
};

const columns = [
  {
    title: '고객명',
    dataIndex: 'userName',
    render: (text, record) => (
      <a href={`/user-detail/${record.id}`}>{`${userNameMasking(text)} - ${record.id}`}</a>
      // [TODO] id 지우기
    ),
  },
  // 🍒
  // {
  //   title: '임직원여부',
  //   dataIndex: 'staff',
  //   render: text => <div>{`${Boolean(text) ? '임직원' : '일반인'}`}</div>,
  // },
  {
    title: '성별',
    dataIndex: 'gender',
    render: text => <div>{`${text === 1 || text === 3 ? '남' : '여'}`}</div>,
  },
  {
    title: '생년월일',
    dataIndex: 'birthDate',
    render: text => <div>{`${text.slice(0, 10)}`}</div>, // yyyy-mm-dd
  },
  {
    title: '휴대폰 번호',
    dataIndex: 'phoneNumber',
    render: text => <div>{`${text.split('-')[0]}-****-${text.split('-')[2]}`}</div>, // [TODO] 다시 코드 정리하기
  },
  {
    title: '이메일 주소',
    dataIndex: 'email',
  },
  {
    title: '가입일',
    dataIndex: 'createdAt',
    render: text => <div>{`${new Date(text).toLocaleString()}`}</div>,
  },
  {
    title: '최근로그인',
    dataIndex: 'lastLogin',
    render: text => <div>{`${new Date(text).toLocaleString()}`}</div>,
  },
  {
    title: '혜택 수신 동의',
    dataIndex: 'allowMarketing',
    align: 'center',
    render: text => <div>{`${text ? 'O' : 'X'}`}</div>,
  },
  {
    title: '활성화 여부',
    dataIndeX: 'isActive',
    align: 'center',
    render: text => {
      console.log(text); // 객체가 나오는데 이건 버그???
      return <div>{`${text.isActive ? 'on' : 'off'}`}</div>;
    },
  },
  {
    title: '보유중인 계좌수',
    dataIndex: 'accountNum',
    align: 'center',
  },
];

const COUNT_PER_PAGE = 10;
