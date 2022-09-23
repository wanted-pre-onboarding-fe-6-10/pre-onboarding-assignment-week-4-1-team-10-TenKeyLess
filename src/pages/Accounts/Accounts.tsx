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
  const [getAccounts, { data, loading }] = useMutation<any>(`/accounts`);
  const removeList = () => {
    setAccounts([]);
  };
  useEffect(() => {
    if (accounts.length !== 0) return;
    if (loading && accessToken) {
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
  console.log(accessToken);
  console.log(accounts);
  return (
    <div>
      <button onClick={removeList}>remove</button>
      {loading ? (
        accounts.length !== 0 ? (
          <div>
            {accounts.map((account: Account, index: number) => (
              <div key={index}>
                <div>{account.uuid}</div>
                <div>{account.name}</div>
                <div>{account.assets}</div>
                <div>{account.payments}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading</div>
        )
      ) : (
        <div>
          {accounts.map((account: Account, index: number) => (
            <div key={index}>
              <div>{account.uuid}</div>
              <div>{account.name}</div>
              <div>{account.assets}</div>
              <div>{account.payments}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accounts;
