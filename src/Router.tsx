import Footer from 'components/footer/Footer';
import Sidebar from 'components/sidebar/sidebar';
import Accounts from 'pages/Accounts/Accounts';
import Login from 'pages/Auth/Login';
import Pages from 'pages/Pages';
import Users from 'pages/Users/Users';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'src/atoms';

const Router = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.accessToken === 'jwt expired') {
      alert('로그인 유효 기간이 만료됐습니다. 다시 로그인 해주세요.');
      navigate('/');
    }
  }, [userInfo]);
  console.log(userInfo);
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accounts" element={userInfo?.accessToken ? <Accounts /> : <Login />} />
        <Route path="/users" element={userInfo?.accessToken ? <Users /> : <Login />} />
        <Route path="/test" element={userInfo?.accessToken ? <Pages /> : <Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Router;
