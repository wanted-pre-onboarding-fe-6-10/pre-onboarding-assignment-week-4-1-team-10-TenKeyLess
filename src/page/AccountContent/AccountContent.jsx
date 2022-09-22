import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sider from '../../components/Sider/Sider';
import AccountList from './AccountLIst/AccountList';

const AccountContent = () => {
  return (
    <>
      <Header />
      <div className="w-[1440px] flex  p-10 my-0 mx-auto">
        <Sider />
        <AccountList />
      </div>
      <Footer />
    </>
  );
};

export default AccountContent;
