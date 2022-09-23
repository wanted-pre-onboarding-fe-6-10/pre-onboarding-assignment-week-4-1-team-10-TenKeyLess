import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import useMutation from 'hooks/useMutation';
import { useState } from 'react';
import { accountListAtom } from './../../atoms';
import AccountTable from './components/AccountTable';
import { Pagination } from './components/Pagination';

export interface User {
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
export interface Account {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: string;
  status: number;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

const Accounts = () => {
  const [accounts, setAccounts] = useRecoilState(accountListAtom);
  const [page, setPage] = useState(1);
  const [getAccounts, { data, loading }] = useMutation<any>(
    `/accounts?_expand=user&_page=${page}&_limit=10`
  );
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
    getAccounts();
  }, [page]);

  useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data]);
  return (
    <div className="px-32 py-16 w-full">
      {loading && accounts.length === 0 ? (
        <div>Loading</div>
      ) : (
        <div>
          <AccountTable />
          <Pagination page={page} data={data} getLastPage={getLastPage} getNextPage={getNextPage} />
        </div>
      )}
    </div>
  );
};

export default Accounts;
