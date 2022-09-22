import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';

import { Breadcrumb, Layout } from 'antd';
import { SIDER } from '../../const';
import { useSelector } from 'react-redux';

const Sidebar = ({ children }) => {
  const { pathname } = useLocation();
  const { Header, Content, Sider } = Layout;
  const userName = useSelector(state => state.userName.userName);
  console.log(userName);

  return (
    <Layout className="h-screen">
      <Header className="header h-1/8 bg-slate-400 flex pr-20">
        {/* <Layout className="bg-inherit h-full ">
          <Breadcrumb className="my-5">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
        <div>{userName}님</div> */}
      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background  h-7/8">
          <ul
            className="ant-menu ant-menu-root ant-menu-inline ant-menu-light h-full bg-mainColor"
            role="menu"
            tabIndex="0"
            data-menu-list="true"
            mode="inline"
          >
            {SIDER.map(data => {
              return (
                <Link key={data.id} to={data.url}>
                  <li
                    className="ant-menu-item pl-6"
                    style={{
                      backgroundColor: `${pathname.slice(1).includes(data.url) ? 'white' : ''}`,
                    }}
                  >
                    <button
                      type="button"
                      className="ant-menu-title-content"
                      onClick={() => {
                        if (data.id === 9999) {
                          localStorage.removeItem('accessToken');
                        }
                      }}
                    >
                      {data.name}
                    </button>
                  </li>
                </Link>
              );
            })}
          </ul>
        </Sider>

        {/* <Layout className="px-6">
          <Content className="site-layout-background h-7/8 p-6 max-h-full">
            <div>{children}</div>
          </Content>
        </Layout> */}
      </Layout>
    </Layout>
  );
};

export default Sidebar;
