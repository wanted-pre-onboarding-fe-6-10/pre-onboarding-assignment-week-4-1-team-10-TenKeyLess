import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import AccountList from './pages/accountList/AccountList';
import AccountDetail from './pages/accountDetail/AccountDetail';
import UserList from './pages/userList/userList';
import UserDetail from './pages/userDetail/UserDetail';

const AppRouter = () => {
  return (
    <div>
      <Header>
        <Sidebar />
        <Footer />
        <Routes>
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/accountDetail/:id" element={<AccountDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/userDetail/:id" element={<UserDetail />} />
        </Routes>
      </Header>
    </div>
  );
};

export default AppRouter;
