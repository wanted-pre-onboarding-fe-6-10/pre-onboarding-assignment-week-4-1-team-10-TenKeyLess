import AccountList from './pages/AccountList/AccountList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList/UserList';
import Login from './pages/Login/Login';
import UserDetail from './pages/UserDetail/UserDetail';
import AccountDetail from './pages/AccountDetail/AccountDetail';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/account" element={<AccountList />} />
        <Route path="/user/:idx" element={<UserDetail />} />
        <Route path="/account/:idx" element={<AccountDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
