import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFullUserList } from '../../../store/services/pageSlice';
import { GetToken } from '../../../repository/TokenRepository';
import { AppDispatch } from '../../../store/';
import { ReducerType } from '../../../store/rootReducer';
import { getUserList } from '../../../store/services/userSlice';

const UserBox = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useSelector((state: ReducerType) => state.page);
  const { list } = useSelector((state: ReducerType) => state.user);

  useEffect(() => {
    const token = GetToken();
    if (token) {
      dispatch(getUserList(params));
      dispatch(getFullUserList(parseInt(params._limit)));
    } else {
      nav('/');
    }
  }, []);
  return (
    <>
      {list.map(user => {
        return <li key={user.uuid}>{user.id}</li>;
      })}
    </>
  );
};

export default UserBox;
