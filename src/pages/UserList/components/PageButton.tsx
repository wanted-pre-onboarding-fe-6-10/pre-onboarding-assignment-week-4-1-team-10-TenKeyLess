import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/';
import { ReducerType } from '../../../store/rootReducer';
import { updatePage } from '../../../store/services/pageSlice';
import { getUserList } from '../../../store/services/userSlice';

const PageButton = () => {
  const { params, userPages } = useSelector((state: ReducerType) => state.page);
  const dispatch = useDispatch<AppDispatch>();

  const changePage: React.MouseEventHandler<HTMLButtonElement> = async e => {
    const { value } = e.target as HTMLButtonElement;
    dispatch(updatePage(value));
    console.log(params._page);
    dispatch(getUserList(params));
  };

  return (
    <>
      {userPages.map(page => {
        return (
          <button key={page} value={page} onClick={changePage}>
            {page}
          </button>
        );
      })}
    </>
  );
};

export default PageButton;
