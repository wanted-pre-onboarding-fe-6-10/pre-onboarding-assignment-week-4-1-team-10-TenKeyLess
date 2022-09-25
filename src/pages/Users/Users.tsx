import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, userListAtom } from './../../atoms';
import { useState, useEffect, ChangeEvent } from 'react';
import useMutation from './../../hooks/useMutation';
import { User } from 'pages/Accounts/Accounts';
import UsersTable from './components/UsersTable';

const Users = () => {
  const accessToken = useRecoilValue(userInfoAtom);
  const [users, setUsers] = useRecoilState(userListAtom);
  const [userList, setUserList] = useState([]);
  const [getUsers, { data, loading }] = useMutation<any>(`/users`);

  useEffect(() => {
    if (loading && accessToken) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserList(data);
      setUsers(data);
    }
  }, [data]);
  console.log(data);
  console.log(loading);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <UsersTable />
        </div>
      )}
    </div>
  );
};

export default Users;
