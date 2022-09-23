import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/';
import { ReducerType } from '../../../store/rootReducer';
import { updateParams } from '../../../store/services/paramSlice';
import { getUserList } from '../../../store/services/userSlice';

const PageButton = () => {
  const { params, userPages } = useSelector((state: ReducerType) => state.param);
  const dispatch = useDispatch<AppDispatch>();

  const changePage: React.MouseEventHandler<HTMLButtonElement> = async e => {
    const { name, value } = e.target as HTMLButtonElement;
    const newParam = { [name]: value };
    dispatch(updateParams(newParam));
    dispatch(getUserList(params));
  };

  return (
    <>
      {userPages.map(page => {
        return (
          <button key={page} value={page} name="_page" onClick={changePage}>
            {page}
          </button>
        );
      })}
    </>
  );
};

export default PageButton;
