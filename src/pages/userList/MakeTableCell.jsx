import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { patchNameRequest, deleteRequest } from '../../store/usersSlice';
import { userNameMasking } from '../../utils/masking';
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export const ModifyUserName = ({ text, record }) => {
  const maskingName = userNameMasking(text);
  let [isDisable, setIsDisable] = useState(true);
  const [nameValue, setNameValue] = useState(maskingName);

  const accountInputEL = useRef();
  const dispatch = useDispatch();

  return (
    <div className="flex mr-[1rem]">
      <Link to={{ pathname: `/users/${record.id}` }}>
        <input
          type="text"
          value={nameValue}
          ref={accountInputEL}
          disabled={isDisable}
          onChange={e => setNameValue(e.target.value)}
          className={` mr-2 ${isDisable ? 'bg-inherit' : 'bg-lime-200'}`}
        />
      </Link>
      <div className="w-10">
        {isDisable ? (
          <button
            type="button"
            className="pr-5"
            onClick={() => {
              setIsDisable(false);
              accountInputEL.current.focus();
            }}
          >
            <EditOutlined className="text-rose-400" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className="mr-3"
              onClick={() => {
                setIsDisable(true);
                setNameValue(maskingName);
              }}
            >
              <CloseCircleOutlined className="text-gray-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsDisable(true);
                dispatch(patchNameRequest({ userId: record.id, modifiedName: nameValue })); // put요청
              }}
            >
              <CheckCircleOutlined className="text-green-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="mr-[-30px]"
      value={id}
      id="delButton"
      onClick={e => {
        const result = window.confirm('삭제하시겠습니까?');
        if (result) {
          const userId = e.target.closest('#delButton').value;
          dispatch(deleteRequest(userId));
        }
      }}
    >
      <CloseCircleOutlined />
    </button>
  );
};
