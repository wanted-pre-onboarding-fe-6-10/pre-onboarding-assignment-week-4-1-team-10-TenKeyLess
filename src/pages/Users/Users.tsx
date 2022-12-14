import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, userListAtom } from './../../atoms';
import { useState, useEffect, ChangeEvent } from 'react';
import useMutation from './../../hooks/useMutation';
import { User } from 'pages/Accounts/Accounts';
import UsersTable from './components/UsersTable';
import { Pagination } from 'pages/Accounts/components/Pagination';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [users, setUsers] = useRecoilState(userListAtom);
  const [page, setPage] = useState(1);
  const [getUsers, { data, loading }] = useMutation<any>(`/users?_page=${page}&_limit=10`);
  const getLastPage = () => {
    if (page === 1) {
      alert('가장 첫 페이지입니다.');
      return;
    }
    setPage(prev => prev - 1);
  };
  const getNextPage = () => {
    setPage(prev => prev + 1);
  };
  useEffect(() => {
    getUsers();
  }, [page]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  useEffect(() => {
    if (data === 'jwt expired') {
      setUserInfo({ accessToken: '', email: '' });
      alert('로그인 유효 기간이 만료됐습니다. 다시 로그인 해주세요.');
      navigate('/');
    }
  }, [data]);

  return (
    <div className="px-32 pb-16 w-full bg-gray-100">
      {loading || users.length === 0 ? (
        <div>Loading</div>
      ) : (
        <div>
          <UsersTable />
          <Pagination page={page} data={data} getLastPage={getLastPage} getNextPage={getNextPage} />
        </div>
      )}
    </div>
  );
};

export default Users;
