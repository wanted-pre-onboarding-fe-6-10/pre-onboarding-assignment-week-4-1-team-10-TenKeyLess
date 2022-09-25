import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userPage, userTotalList } from '../api/userAPI';
import { setUserPageNum, setUserTotal } from '../features/user/userSlice';
import { useParams } from 'react-router-dom';

export function useUserHook() {
  const userTotal = useSelector(state => state.user.userTotal);
  const userPageNum = useSelector(state => state.user.userPageNum);
  const dispatch = useDispatch();
  const { pageNum } = useParams();

  useEffect(() => {
    const getUserPage = async () => {
      const userPageRes = await userPage(pageNum);
      dispatch(setUserPageNum(userPageRes));
    };
    getUserPage();
  }, [dispatch, pageNum]);

  useEffect(() => {
    const getUser = async () => {
      const userRes = await userTotalList();
      dispatch(setUserTotal(userRes));
    };

    getUser();
  }, [dispatch]);

  return { userTotal, userPageNum, pageNum };
}
