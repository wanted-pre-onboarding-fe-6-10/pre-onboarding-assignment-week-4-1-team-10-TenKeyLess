import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenAtom, userListAtom } from './../../atoms';
import { useState, useEffect } from 'react';
import useMutation from './../../hooks/useMutation';
const Users = () => {
  const accessToken = useRecoilValue(tokenAtom);
  const [users, setUsers] = useRecoilState(userListAtom);
  const [userList, setUserList] = useState([]);
  const [getUsers, { data, loading }] = useMutation<any>(
    `${process.env.REACT_APP_BASE_URL}/users`,
    accessToken
  );
  useEffect(() => {
    if (accessToken && !users) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserList(data);
      setUsers(data);
    }
  }, [data]);
  return <>Users</>;
};

export default Users;
