import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountContent from './page/AccountContent/AccountContent';
import Login from './page/Login/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account_list" element={<AccountContent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
