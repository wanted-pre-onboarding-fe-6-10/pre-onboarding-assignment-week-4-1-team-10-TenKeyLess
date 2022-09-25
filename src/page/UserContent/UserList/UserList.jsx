import React from 'react';
import { useUserHook } from '../../../hoc/useUserHook';
import { Table } from 'antd';
import { Pagination } from 'antd';
import phoneMasking from '../../../utils/phoneMasking';
import { useNavigate } from 'react-router-dom';
import { useAccountHook } from '../../../hoc/useAccountHook';

const UserList = () => {
  const { userTotal, userPageNum, pageNum } = useUserHook();
  const { account } = useAccountHook();
  const navigate = useNavigate();

  const onChange = page => {
    navigate(`/users_list/page=${page}`);
  };
  return (
    userPageNum &&
    userTotal && (
      <div className="border flex-1 w-full">
        <Table
          columns={columns}
          dataSource={userPageNum}
          pagination={{
            total: 20,
            pageSize: 20,
            hideOnSinglePage: true,
          }}
          rowKey={render => render.uuid}
        />
        <div className="m-4 flex justify-end">
          <Pagination
            current={pageNum}
            onChange={onChange}
            total={userTotal.length}
            defaultPageSize={20}
          />
        </div>
      </div>
    )
  );
};

export default UserList;

const columns = [
  {
    title: '고객명',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '성별',
    dataIndex: 'gender_origin',
    key: 'gender_origin',
  },
  {
    title: '생년월일',
    dataIndex: 'birth_date',
    key: 'bitrh_date',
    // render: date => <span>{date.slice(0, 10)}</span>,
  },
  {
    title: '핸드폰 번호',
    dataIndex: 'phone_number',
    key: 'phone_number',
    render: phone => <span>{phoneMasking(phone)}</span>,
  },
  {
    title: '최근 로그인',
    dataIndex: 'last_login',
    key: 'last_login',
    // render: login => <span>{login.slice(0, 10)}</span>,
  },
  {
    title: '가입일',
    dataIndex: 'created_at',
    key: 'created_at',
    // render: created => <span>{created.slice(0, 10)}</span>,
  },
];
