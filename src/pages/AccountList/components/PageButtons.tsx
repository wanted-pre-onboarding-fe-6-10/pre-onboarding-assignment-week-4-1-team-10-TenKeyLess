import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePage } from '../../../store/services/pageSlice';
import { ReducerType } from '../../../store/rootReducer';
import { getAccountList } from '../../../store/services/accountSlice';
import { AppDispatch } from '../../../store/';

const PageButton = () => {
  const { params, accountPages } = useSelector((state: ReducerType) => state.page);
  const dispatch = useDispatch<AppDispatch>();

  const changePage: React.MouseEventHandler<HTMLButtonElement> = e => {
    const { value } = e.target as HTMLButtonElement;
    dispatch(updatePage(value));
    dispatch(getAccountList(params));
  };

  return (
    <>
      {accountPages.map(page => {
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
