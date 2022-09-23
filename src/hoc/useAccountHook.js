import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Account } from '../api/accountAPI';
import { setAccount } from '../features/account/accountSlice';

export function useAccountHook() {
  const account = useSelector(state => state.account.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccount = async () => {
      const accountRes = await Account();
      dispatch(setAccount(accountRes));
    };

    getAccount();
  }, [dispatch]);

  return { account };
}
