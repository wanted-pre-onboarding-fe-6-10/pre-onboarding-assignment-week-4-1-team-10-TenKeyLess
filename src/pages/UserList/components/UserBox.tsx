import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFullUserList } from '../../../store/services/paramSlice';
import { GetToken } from '../../../repository/TokenRepository';
import { AppDispatch } from '../../../store/';
import { ReducerType } from '../../../store/rootReducer';
import { getUserList } from '../../../store/services/userSlice';
import toDetail from '../../../utils/toDetail';
import { getuserSetting } from '../../../store/services/settingSlice';
import { handleGender } from '../../../utils/handleGender';
import handleDate from '../../../utils/handleDate';

const UserBox = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useSelector((state: ReducerType) => state.param);
  const { list } = useSelector((state: ReducerType) => state.user);
  const { userSetting } = useSelector((state: ReducerType) => state.setting);

  useEffect(() => {
    if (GetToken()) {
      dispatch(getUserList(params));
      dispatch(getuserSetting(params));
      dispatch(getFullUserList(params));
    }
    if (!GetToken()) nav('/');
  }, [params]);

  const getSetting = (id: string) => {
    return userSetting.filter(setting => setting.uuid === id);
  };

  return (
    <ul>
      {list.map(user => {
        return (
          getSetting(user.uuid) && (
            <li
              className="m-auto grid grid-cols-10 gap-4 text-center w-10/12 my-3 text-center"
              key={user.uuid}
            >
              <div onClick={() => toDetail(nav, '/user/', user.id)}>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.accounts.length}</div>
              <div>{handleGender(user.gender_origin)}</div>
              <div>{handleDate(user.birth_date)}</div>
              <div>{user.phone_number}</div>
              <div>{handleDate(user.last_login)}</div>
              <div>{handleDate(user.created_at)}</div>
              {getSetting(user.uuid)[0]?.allow_marketing_push ? <div>동의</div> : <div>비동의</div>}
              {getSetting(user.uuid)[0]?.is_active ? <div>활성화</div> : <div>비활성화</div>}
            </li>
          )
        );
      })}
    </ul>
  );
};

export default UserBox;
