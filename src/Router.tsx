import Accounts from 'pages/Accounts/Accounts';
import Users from 'pages/Users/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './pages/Pages';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="/test" element={<Accounts />} />
          <Route path="/test2" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
