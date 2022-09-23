import { useDispatch } from 'react-redux';
import { updateParams } from '../../../store/services/paramSlice';
import { AppDispatch } from '../../../store/';
import { getAccountList } from '../../../store/services/accountSlice';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useSelector((state: ReducerType) => state.param);

  const selectFilter: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const { name, value } = e.target;
    const isSelected = name === 'is_active' ? value === 'true' : value;
    const select = value !== '0' ? { [name]: isSelected } : { [name]: null };
    dispatch(updateParams(select));
    dispatch(getAccountList(params));
  };

  return (
    <div>
      <select onChange={e => selectFilter(e)} name="status">
        <option value="0">계좌 상태</option>
        <option value="9999">관리자확인필요</option>
        <option value="1">입금대기</option>
        <option value="2">운용중</option>
        <option value="3">투자중지</option>
        <option value="4">해지</option>
      </select>
      <select name="broker_id">
        <option>브로커명</option>
      </select>
      <select onChange={e => selectFilter(e)} name="is_active">
        <option value="0">계좌 활성화 여부</option>
        <option value="true">활성화</option>
        <option value="false">비활성화</option>
      </select>
    </div>
  );
};

export default Filters;
