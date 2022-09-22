import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sider from '../../components/Sider/Sider';
import UserList from './UserList/UserList';

const UserContent = () => {
  return (
    <>
      <Header />
      <div className="w-[1440px] flex  p-10 my-0 mx-auto">
        <Sider />
        <UserList />
      </div>
      <Footer />
    </>
  );
};

export default UserContent;
