import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AccountList from './pages/accountList/AccountList';
import AccountDetail from './pages/accountDetail/AccountDetail';
import UserList from './pages/userList/userList';
import UserDetail from './pages/userDetail/UserDetail';
import Auth from './components/Auth';

const AppRouter = () => {
  return (
    <Auth>
      <MainLayout>
        <Routes>
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/accounts/:id" element={<AccountDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </MainLayout>
    </Auth>
  );
};

export default AppRouter;
