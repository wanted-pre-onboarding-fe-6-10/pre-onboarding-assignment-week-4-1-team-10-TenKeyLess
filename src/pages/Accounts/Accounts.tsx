import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenAtom } from '../../atoms';
import { useEffect } from 'react';
import useMutation from 'hooks/useMutation';
import { useState } from 'react';
import { AccountListAtom } from './../../atoms';

interface Account {
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
  created_at: Date;
  updated_at: Date;
}

const Accounts = () => {
  const accessToken = useRecoilValue(tokenAtom);
  const [accounts, setAccounts] = useRecoilState(AccountListAtom);
  const [accountList, setAccountList] = useState([]);
  const [getAccounts, { data, loading }] = useMutation<any>(
    `${process.env.REACT_APP_BASE_URL}/accounts`,
    accessToken
  );
  useEffect(() => {
    if (accessToken && !accounts) {
      getAccounts();
    }
  }, []);
  useEffect(() => {
    if (data) {
      setAccountList(data);
      setAccounts(data);
    }
  }, [data]);
  // console.log(list);
  // console.log(accessToken);
  console.log(accounts);
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {accounts.map((account: Account, index: number) => (
            <div key={index}>{account.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accounts;
