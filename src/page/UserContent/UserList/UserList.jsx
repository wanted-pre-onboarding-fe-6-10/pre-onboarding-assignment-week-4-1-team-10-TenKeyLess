import React from 'react';
import { useUserTotalHook } from '../../../hoc/useUserTotalHook';
import UserItem from '../UserItem/UserItem';

const UserList = () => {
  const { userTotal } = useUserTotalHook();
  return (
    <div className="border flex-1 w-full">
      <div className="w-full flex p-4 bg-gray-100">
        <div className="w-1/10">고객명</div>
        <div className="w-1/10">보유중인 계좌</div>
        <div className="w-1/10">이메일</div>
        <div className="w-1/10">성별</div>
        <div className="w-1/10">생년월일</div>
        <div className="w-1/10">휴대폰 번호</div>
        <div className="w-1/10">최근 로그인</div>
        <div className="w-1/10">수신 동의</div>
        <div className="w-1/10">활성화</div>
        <div className="w-1/10">가입일</div>
      </div>
      {userTotal && userTotal.map((user, index) => <UserItem key={index} user={user} />)}
    </div>
  );
};

export default UserList;
