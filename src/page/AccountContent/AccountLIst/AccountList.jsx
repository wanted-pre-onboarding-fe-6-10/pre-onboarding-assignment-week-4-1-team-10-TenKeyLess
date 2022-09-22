import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { useAccountHook } from '../../../hoc/useAccountHook';

const { Column } = Table;

const AccountList = () => {
  const { account } = useAccountHook();
  return (
    <div className="border flex-1">
      <Table dataSource={account}>
        <Column title="고객명" dataIndex="id" key="id" />
        <Column title="브로커명" dataIndex="broker_id" key="broker_id" />
        <Column title="계좌번호" dataIndex="number" key="number" />
        <Column title="계좌상태" dataIndex="status" key="status" />
        <Column title="계좌명" dataIndex="name" key="name" />
        <Column title="평가금액" dataIndex="assets" key="assets" />
        <Column title="입금금액" dataIndex="payments" key="payments" />
        <Column title="활성화 여부" dataIndex="is_active" key="is_active" />
        <Column title="개설일" dataIndex="created_at" key="created_at" />
      </Table>
    </div>
  );
};

export default AccountList;
