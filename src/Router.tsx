import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Sidebar from 'components/sidebar/sidebar';
import AccountDetail from 'pages/AccountDetail/AccountDetail';
import Accounts from 'pages/Accounts/Accounts';
import Login from 'pages/Auth/Login';
import UserDetail from 'pages/UserDetail/UserDetail';
import Users from 'pages/Users/Users';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from 'src/atoms';

const Router = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userInfo?.accessToken.includes(' ')) {
      setUserInfo({ accessToken: '', email: '' });
      alert('로그인 유효 기간이 만료됐습니다. 다시 로그인 해주세요.');
      navigate('/');
    }
  }, [location]);
  console.log(userInfo);
  return (
    <div>
      {location.pathname === '/' ? null : (
        <>
          <Sidebar />
          <Header path={location.pathname} />
        </>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/accounts"
          element={userInfo?.accessToken ? <Accounts /> : <Navigate replace to="/" />}
        />
        <Route
          path="/users"
          element={userInfo?.accessToken ? <Users /> : <Navigate replace to="/" />}
        />
        <Route
          path="/account/:accountId"
          element={userInfo?.accessToken ? <AccountDetail /> : <Navigate replace to="/" />}
        />
        <Route
          path="/user/:userId"
          element={userInfo?.accessToken ? <UserDetail /> : <Navigate replace to="/" />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Router;
