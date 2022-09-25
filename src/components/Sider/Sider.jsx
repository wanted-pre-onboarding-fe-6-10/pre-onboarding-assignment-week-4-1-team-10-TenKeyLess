import React, { useState } from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';

function getItem(label, key) {
  return {
    key,
    label,
  };
}

const items = [
  getItem('계좌목록', 'account_list'),
  getItem('사용자', 'users_list'),
  getItem('로그아웃', '3'),
];

const Sider = () => {
  const [current, setCurrent] = useState('account_list');
  const navigate = useNavigate();

  const onMovePage = e => {
    setCurrent(e.key);
    navigate(`/${e.key}/page=1/sort=user_id/filter=asc`);
  };
  return (
    <div className="w-[256px] mr-8">
      <Menu
        onClick={onMovePage}
        defaultSelectedKeys={[current]}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  );
};

export default Sider;
