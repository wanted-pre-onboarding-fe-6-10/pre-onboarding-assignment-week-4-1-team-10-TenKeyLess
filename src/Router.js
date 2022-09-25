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
        <Route
          path="/account_list/page=:pageNum/sort=:sortTag/filter=:filterTag"
          element={<AccountContent />}
        />
        <Route
          path="/users_list/page=:pageNum/sort=:sortTag/filter=:filterTag"
          element={<UserContent />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
