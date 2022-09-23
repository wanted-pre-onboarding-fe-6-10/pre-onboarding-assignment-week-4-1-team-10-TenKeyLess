import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { user } from '../api/userAPI';
import { setUserTotal } from '../features/user/userSlice';

export function useUserTotalHook() {
  const userTotal = useSelector(state => state.user.userTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserTotal = async () => {
      const userRes = await user();
      dispatch(setUserTotal(userRes));
    };

    getUserTotal();
  }, [dispatch]);

  return { userTotal };
}
