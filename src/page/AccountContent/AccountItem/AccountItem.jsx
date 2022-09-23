import React from 'react';
import addComma from '../../../utils/addComma';
import accountStatus from '../../../utils/data/accountStatus.json';
import broker from '../../../utils/data/broker.json';
import getKeyByValue from '../../../utils/findKey';

const AccountItem = ({ account }) => {
  return (
    <div className="w-full flex justify-between p-4">
      <div>{account.user_id}</div>
      <div>{broker[account.broker_id]}</div>
      <div>{account.number}</div>
      <div>{getKeyByValue(accountStatus, account.status)}</div>
      <div>{account.name}</div>
      <div>{addComma(parseInt(account.assets))}</div>
      <div>{addComma(parseInt(account.payments))}</div>
      {account.is_active ? <div>활성화</div> : <div>비활성화</div>}
      <div>{account.created_at}</div>
    </div>
  );
};

export default AccountItem;
