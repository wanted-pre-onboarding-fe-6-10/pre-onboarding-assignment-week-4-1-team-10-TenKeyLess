import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { getFullUserList, updateParams } from '../../../store/services/paramSlice';
import { getuserSetting } from '../../../store/services/settingSlice';
import { AppDispatch } from '../../../store/';
import { getUserList } from '../../../store/services/userSlice';

const UserFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useSelector((state: ReducerType) => state.param);

  const selectFilter: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const { name, value } = e.target;
    const select = value !== '0' ? { [name]: value } : { [name]: null };
    dispatch(updateParams(select));
    dispatch(getuserSetting(params));
    dispatch(getFullUserList(params));
  };

  return (
    <div>
      <select onChange={selectFilter} name="is_active">
        <option value="0">계정 활성화 여부</option>
        <option value="true">활성화</option>
        <option value="false">비활성화</option>
      </select>
      <select onChange={selectFilter} name="is_staff">
        <option value="0">임직원 여부</option>
        <option value="true">임직원</option>
        <option value="false">일반고객</option>
      </select>
    </div>
  );
};

export default UserFilter;
