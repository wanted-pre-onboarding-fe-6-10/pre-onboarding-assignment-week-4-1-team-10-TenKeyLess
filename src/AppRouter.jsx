import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import AccountList from './pages/accountList/AccountList';

const AppRouter = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Footer />
      <Routes>
        <Route path="/accountList" element={<AccountList />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
