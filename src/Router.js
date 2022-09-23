import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountContent from './page/AccountContent/AccountContent';
import Login from './page/Login/Login';
import UserContent from './page/UserContent/UserContent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account_list" element={<AccountContent />} />
        <Route path="/users_list" element={<UserContent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
