import { userListAtom } from 'src/atoms';
import { useRecoilState } from 'recoil';
import useMutation from 'hooks/useMutation';
import { useEffect, useState } from 'react';
import { RecordWithTtl } from 'dns';
import SearchBar from 'components/common/SearchBar';

const UserSearch = () => {
  const [users, setUsers] = useRecoilState(userListAtom);
  const [query, setQuery] = useState('');
  const [search, { data }] = useMutation(`/users?q=${query}`);
  const enterToSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };
  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  return <SearchBar onSubmit={enterToSearch} setFunc={setQuery}></SearchBar>;
};

export default UserSearch;
