import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Breadcrumb, Layout } from 'antd';
import { SIDER } from '../const';

const { Header, Content, Footer, Sider } = Layout;

const HeaderLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname, search } = useLocation();

  const userName = useSelector(state => state.userName.userName);

  const secondRoute = search.split('&')[0].slice(-1); // _page=1&_limit=10
  const firstRoute = pathname.slice(1).toUpperCase(); // /accounts ?

  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <ul
          className="ant-menu ant-menu-root ant-menu-inline ant-menu-dark"
          role="menu"
          tabIndex="0"
          data-menu-list="true"
        >
          <li style={{ marginTop: '20px' }} className="ant-menu-item pl-6">
            <button type="button" className="ant-menu-title-content text-3xl my-6">
              Preface
            </button>
          </li>

          {SIDER.map(data => {
            return (
              <Link key={data.id} to={`${data.url}?`}>
                <li
                  className={`ant-menu-item pl-6 bg-[${
                    pathname.slice(1) === data.url ? '#198fff' : ''
                  }]`}
                  style={{
                    marginTop: '20px',
                  }}
                >
                  {data.icon}
                  <button
                    type="button"
                    className="ant-menu-title-content"
                    onClick={() => {
                      if (data.id === 9999) {
                        alert('로그아웃 되었습니다');
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
        <Header className="header h-1/8 bg-sky-600  flex justify-between pr-10">
          <p className="my-5 font-bold text-base text-stone-50">
            <span>{firstRoute}</span>
            <span className="mx-5">/</span>
            <span>{secondRoute}</span>
          </p>
          <div className="mt-1">
            <span className="text-lg mr-2">{userName}</span>님
          </div>
        </Header>

        <Content className="bg-slate-200 pt-5 px-3">
          <div>{children}</div>
        </Content>
        <Footer className="w-full fixed bottom-0 py-4 pl-0 pr-14 flex justify-center bg-sky-700">
          Copyright © December and Company Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HeaderLayout;
