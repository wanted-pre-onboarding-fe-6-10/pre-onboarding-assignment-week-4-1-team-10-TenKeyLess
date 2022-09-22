import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Breadcrumb, Layout } from 'antd';
import { SIDER } from '../../const';

const { Header, Content, Footer, Sider } = Layout;

const HeaderApp = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const userName = useSelector(state => state.userName.userName);

  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <ul
          class="ant-menu ant-menu-root ant-menu-inline ant-menu-dark"
          role="menu"
          tabindex="0"
          data-menu-list="true"
        >
          <li style={{ marginTop: '20px' }} className="ant-menu-item pl-6">
            <button type="button" className="ant-menu-title-content text-3xl my-6">
              Perface
            </button>
          </li>

          {SIDER.map(data => {
            return (
              <Link key={data.id} to={data.url}>
                <li
                  className="ant-menu-item pl-6"
                  style={{
                    marginTop: '20px',
                    backgroundColor: `${pathname.slice(1).includes(data.url) ? '#198fff' : ''}`,
                  }}
                >
                  {data.icon}
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

      <Layout className="site-layout">
        <Header className="header h-1/8 bg-slate-400 flex justify-between pr-10">
          <Breadcrumb className="my-5 text-yellow-300">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item className="text-yellow-300">App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="mt-1">
            <span className="text-lg mr-2">{userName}</span>님
          </div>
        </Header>

        <Content className="bg-orange-200 m-4">
          <div>{children}</div>
        </Content>
        <Footer className="text-center bg-slate-300">Copyright © December and Company Inc.</Footer>
      </Layout>
    </Layout>
  );
};

export default HeaderApp;
