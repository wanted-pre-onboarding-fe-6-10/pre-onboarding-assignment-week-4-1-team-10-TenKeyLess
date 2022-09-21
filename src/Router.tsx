import Accounts from 'pages/Accounts/Accounts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './pages/Pages';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="/test" element={<Accounts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
