import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountTotal } from '../api/accountAPI';
import { setAccountTotal } from '../features/account/accountSlice';
import { Account } from '../api/accountAPI';
import { setAccount } from '../features/account/accountSlice';
import { useParams } from 'react-router-dom';

export function useAccountHook() {
  const account = useSelector(state => state.account.account);
  const accountTotal = useSelector(state => state.account.accountTotal);
  const dispatch = useDispatch();
  const { pageNum, sortTag, filterTag } = useParams();

  useEffect(() => {
    const getAccount = async () => {
      const accountRes = await Account(pageNum, sortTag, filterTag);
      dispatch(setAccount(accountRes));
    };

    getAccount();
  }, [dispatch, pageNum, sortTag, filterTag]);

  useEffect(() => {
    const getAccountTotal = async () => {
      const accountTotalRes = await AccountTotal();
      dispatch(setAccountTotal(accountTotalRes));
    };
    getAccountTotal();
  }, [dispatch]);

  return { account, accountTotal, pageNum, sortTag, filterTag };
}
