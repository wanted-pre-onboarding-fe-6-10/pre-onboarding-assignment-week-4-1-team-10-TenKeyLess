import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, userListAtom } from './../../atoms';
import { useState, useEffect } from 'react';
import useMutation from './../../hooks/useMutation';

interface User {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: Date;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
}

const Users = () => {
  const accessToken = useRecoilValue(userInfoAtom);
  const [users, setUsers] = useRecoilState(userListAtom);
  const [userList, setUserList] = useState([]);
  const [getUsers, { data, loading }] = useMutation<any>(`/users`);
  const removeList = () => {
    setUsers([]);
  };
  useEffect(() => {
    if (users.length !== 0) return;
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
  console.log(accessToken);
  console.log(users);
  return (
    <div>
      <button onClick={removeList}>remove</button>
      {loading ? (
        users.length !== 0 ? (
          <div>
            {users.map((user: User, index: number) => (
              <div key={index}>
                <div>{user.name}</div>
                <div>{user.age}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading</div>
        )
      ) : (
        <div>
          {users.map((user: User, index: number) => (
            <div key={index}>
              <div>{user.name}</div>
              <div>{user.age}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
