import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';

function getItem(label, key) {
  return {
    key,
    label,
  };
}

const items = [getItem('계좌목록', '1'), getItem('사용자', '2'), getItem('로그아웃', '3')];

const Sider = () => {
  return (
    <div className="w-[256px] mr-8">
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  );
};

export default Sider;
