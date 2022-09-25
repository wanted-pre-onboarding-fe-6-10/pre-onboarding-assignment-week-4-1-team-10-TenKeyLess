import React from 'react';
import { useAccountHook } from '../../../hoc/useAccountHook';
import { Select } from 'antd';
import { Table } from 'antd';
import { Pagination } from 'antd';
import broker from '../../../utils/data/broker.json';
import accountStatus from '../../../utils/data/accountStatus.json';
import getKeyByValue from '../../../utils/findKey';
import addComma from '../../../utils/addComma';
import { useNavigate } from 'react-router-dom';

const AccountList = () => {
  const { account, accountTotal, pageNum, sortTag, filterTag } = useAccountHook();
  const navigate = useNavigate();
  const { Option } = Select;

  const onChange = page => {
    navigate(`/account_list/page=${page}/sort=${sortTag}/filter=${filterTag}`);
  };

  const handleChange = value => {
    if (SORT.includes(value)) {
      window.location.replace(`/account_list/page=${pageNum}/sort=${value}/filter=${filterTag}`);
    } else {
      window.location.replace(`/account_list/page=${pageNum}/sort=${sortTag}/filter=${value}`);
    }
  };

  return (
    accountTotal &&
    account && (
      <div className="border flex-1 w-full">
        <div className="m-4 flex justify-end items-center">
          <Select
            defaultValue={sortTag}
            style={{
              width: 120,
              marginRight: '1rem',
            }}
            onChange={handleChange}
          >
            <Option value="broker_id">브로커명</Option>
            <Option value="is_active">계좌 활성화</Option>
            <Option value="status">계좌상태</Option>
          </Select>
          <Select
            defaultValue={filterTag}
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="asc">오름차순</Option>
            <Option value="desc">내림차순</Option>
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={account}
          pagination={{
            total: 20,
            pageSize: 20,
            hideOnSinglePage: true,
          }}
          rowKey={render => render.uuid}
        />
        <div className="m-4 flex justify-end items-center">
          <Pagination
            current={pageNum}
            onChange={onChange}
            total={accountTotal.length}
            defaultPageSize={20}
          />
        </div>
      </div>
    )
  );
};

export default AccountList;

const SORT = ['broker_id', 'is_active', 'status'];
const columns = [
  {
    title: '고객명',
    dataIndex: 'user',
    key: 'user',
    render: user => <span>{user.name}</span>,
  },
  {
    title: '브로커명',
    dataIndex: 'broker_id',
    key: 'broker_id',
    render: brokerId => <span>{broker[brokerId]}</span>,
  },
  {
    title: '계좌번호',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '계좌상태',
    dataIndex: 'status',
    key: 'status',
    render: status => <span>{getKeyByValue(accountStatus, status)}</span>,
  },
  {
    title: '계좌명',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '평가금액',
    dataIndex: 'assets',
    key: 'assets',
    render: assets => <span>{addComma(parseInt(assets))}</span>,
  },
  {
    title: '입금금액',
    dataIndex: 'payments',
    key: 'payments',
    render: payments => <span>{addComma(parseInt(payments))}</span>,
  },
  {
    title: '활성화 여부',
    dataIndex: 'is_active',
    key: 'is_active',
    render: active => (active ? <div>활성화</div> : <div>비활성화</div>),
  },
  {
    title: '개설일',
    dataIndex: 'created_at',
    key: 'created_at',
    // render: created => <span>{created.slice(0, 10)}</span>,
  },
];
