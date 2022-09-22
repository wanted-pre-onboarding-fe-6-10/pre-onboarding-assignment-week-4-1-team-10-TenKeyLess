import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import AccountList from './AccountLIst/AccountList';
import AccountSider from './AccountSider/AccountSider';

const AccountContent = () => {
  return (
    <>
      <Header />
      <div className="w-[1440px] flex p-10 justify-center">
        <AccountSider />
        <AccountList />
      </div>
      <Footer />
    </>
  );
};

export default AccountContent;
