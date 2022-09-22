import React from 'react';
import { useLocation } from 'react-router-dom';

const textMap = {
  account_list: '계좌목록',
};
const Header = () => {
  const location = useLocation();
  const text = textMap[location.pathname.slice(1)];

  return (
    <div className="bg-gray-100 w-full p-4 flex items-center justify-between">
      <span>{text}</span>
      <span>사용자</span>
    </div>
  );
};

export default Header;
