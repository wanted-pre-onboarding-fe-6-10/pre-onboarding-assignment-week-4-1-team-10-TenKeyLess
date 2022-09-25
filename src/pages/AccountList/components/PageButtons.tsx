import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateParams } from '../../../store/services/paramSlice';
import { ReducerType } from '../../../store/rootReducer';
import { getAccountList } from '../../../store/services/accountSlice';
import { AppDispatch } from '../../../store/';

const PageButton = () => {
  const { params, accountPages } = useSelector((state: ReducerType) => state.param);
  const dispatch = useDispatch<AppDispatch>();

  const changePage: React.MouseEventHandler<HTMLButtonElement> = e => {
    const { name, value } = e.target as HTMLButtonElement;
    const newParam = { [name]: value };
    dispatch(updateParams(newParam));
    dispatch(getAccountList(params));
  };

  return (
    <>
      {accountPages.map(page => {
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
