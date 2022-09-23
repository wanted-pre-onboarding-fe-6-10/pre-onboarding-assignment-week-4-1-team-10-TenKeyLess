import { useState, useEffect } from 'react';
import useMutation from './../../../hooks/useMutation';
import { useRecoilState } from 'recoil';
import { accountListAtom } from 'src/atoms';
import SearchBar from './../../../components/common/SearchBar';

const AccountSearch = () => {
  const [accounts, setAccounts] = useRecoilState(accountListAtom);
  const [query, setQuery] = useState('');
  const [search, { data }] = useMutation(`/accounts?_expand=user&q=${query}`);
  const enterToSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };
  useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data]);

  return <SearchBar onSubmit={enterToSearch} setFunc={setQuery} />;
};

export default AccountSearch;
