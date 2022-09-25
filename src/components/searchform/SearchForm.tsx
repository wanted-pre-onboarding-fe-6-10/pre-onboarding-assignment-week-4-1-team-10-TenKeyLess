import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ReducerType } from '../../store/rootReducer';
import { getAccountList } from '../../store/services/accountSlice';
import { getFullAccountList, search, updateParams } from '../../store/services/paramSlice';
import { AppDispatch } from '../../store/';

const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { input, params } = useSelector((state: ReducerType) => state.param);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(search(value));
  };

  const handleSearch: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    const { name } = e.target as HTMLButtonElement;
    const select = { [name]: input };

    dispatch(updateParams(select));
    dispatch(getAccountList(params));
    dispatch(getFullAccountList(params));
  };

  return (
    <form>
      <input type="text" onChange={handleInputChange} />
      <button name="q" onClick={handleSearch}>
        검색
      </button>
    </form>
  );
};

export default SearchForm;
