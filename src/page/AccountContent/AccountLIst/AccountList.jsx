import React from 'react';
import { useAccountHook } from '../../../hoc/useAccountHook';
import AccountItem from '../AccountItem/AccountItem';

const AccountList = () => {
  const { account } = useAccountHook();
  return (
    <div className="border flex-1 w-full">
      <div className="w-full flex p-4 bg-gray-100">
        <div className="w-1/10">고객명</div>
        <div className="w-1/10">브로커명</div>
        <div className="w-1/10">계좌번호</div>
        <div className="w-1/10">계좌상태</div>
        <div className="w-1/10">계좌명</div>
        <div className="w-1/10">평가금액</div>
        <div className="w-1/10">입금금액</div>
        <div className="w-1/10">활성화 여부</div>
        <div className="w-1/10">개설일</div>
      </div>
      {account && account.map((acc, index) => <AccountItem key={index} account={acc} />)}
    </div>
  );
};

export default AccountList;
