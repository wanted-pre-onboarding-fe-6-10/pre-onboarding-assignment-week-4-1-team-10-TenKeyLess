import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { brokerList, brokers } from 'utils/constant';
import { useRecoilState } from 'recoil';
import { accountListAtom } from 'src/atoms';
import { getKeyByValue } from '../../../utils/utils';
import useMutation from 'hooks/useMutation';

interface OpenProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AccountFilter = ({ isOpen, setIsOpen }: OpenProps) => {
  const outside = useRef<any>();
  const [accounts, setAccounts] = useRecoilState(accountListAtom);
  const [broker, setBroker] = useState('');
  const [isActive, setIsActive] = useState('');
  const [status, setStatus] = useState('');
  const [originData, setOriginData] = useState([]);
  const [filterAccount, { data }] = useMutation<any>(
    `/accounts?_expand=user${broker ? `&broker_id=${broker}` : ''}${
      isActive ? `&is_active=${isActive}` : ''
    }${status ? `&status=${status}` : ''}`
  );
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  });

  const handlerOutsie = (e: any) => {
    if (!outside.current.contains(e.target)) toggleSide();
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  const onFilter = () => {
    filterAccount();
  };

  const removeFilter = () => {
    setAccounts(originData);
  };

  useEffect(() => {
    setOriginData(accounts);
  }, []);

  useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data]);

  return (
    <div className="flex" ref={outside}>
      <div>
        <svg
          className={`fixed z-30 flex items-center cursor-pointer right-6 top-6 ${
            isOpen ? 'invisible' : 'visible'
          }`}
          fill="#041527"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="70" height="10"></rect>
          <rect y="20" width="70" height="10"></rect>
          <rect y="40" width="70" height="10"></rect>
        </svg>
      </div>
      <div
        className={`fixed top-0 right-0 w-[20rem] h-screen bg-slate-900 text-white z-40 ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center mt-16">
          <img className="w-auto h-12" src={`${process.env.PUBLIC_URL}/DAC.png`} alt="" />
          <div className="ml-4 mr-4 text-white text-4xl font-bold">Filtering</div>
          <div
            className="flex fixed top-5 right-[17.5rem] items-center text-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-4 text-4xl font-semibold text-white gap-4 w-full">
          <div className="flex flex-col w-full mt-3 p-8">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              브로커명
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBroker(e.target.value)}
              value={broker}
            >
              <option value="">-</option>
              {brokerList.map((broker, i) => (
                <option key={i} value={getKeyByValue(brokers, broker)}>
                  {broker}
                </option>
              ))}
            </select>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              계좌 활성화 여부
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value)}
              value={isActive}
            >
              <option value="">-</option>
              <option value="true">활성화</option>
              <option value="false">비활성화</option>
            </select>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              계좌 상태
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
              value={status}
            >
              <option value="">-</option>
              <option value={9999}>관리자확인필요</option>
              <option value={1}>입금대기</option>
              <option value={2}>운용중</option>
              <option value={3}>투자중지</option>
              <option value={4}>해지</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-lg border-2 border-slate-50 rounded w-40 bg-sky-500"
              onClick={onFilter}
            >
              검색
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-lg border-2 border-slate-50 rounded w-40 bg-red-500"
              onClick={removeFilter}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountFilter;
