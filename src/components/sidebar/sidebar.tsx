import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { accountListAtom, userInfoAtom, userListAtom } from 'src/atoms';
import { useLocation, useNavigate } from 'react-router-dom';

interface TabProps {
  children: ReactNode;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(userInfoAtom);
  const [accounts, setAccounts] = useRecoilState(accountListAtom);
  const [users, setUsers] = useRecoilState(userListAtom);
  const outside = useRef<any>();
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
    setOpen(false);
  };

  const logout = () => {
    setAccessToken({
      accessToken: '',
      email: '',
    });
    setAccounts([]);
    setUsers([]);
  };

  return (
    <div className="flex" ref={outside}>
      <div>
        <svg
          onClick={() => setOpen(!open)}
          className={`fixed z-30 flex items-center cursor-pointer left-6 top-6 ${
            open ? 'invisible' : 'visible'
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
        className={`fixed top-0 left-0 w-[20rem] h-screen bg-slate-900 text-white z-40 ease-in-out duration-300 ${
          open ? 'translate-x-0 ' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center mt-16">
          <img className="w-auto h-12" src={`${process.env.PUBLIC_URL}/DAC.png`} alt="" />
          <div className="ml-4 mr-4 text-white text-4xl font-bold">PREFACE</div>
          <div
            className="flex fixed top-5 left-[17.5rem] items-center text-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-4 text-4xl font-semibold text-white gap-4 w-full">
          <div className="flex flex-col items-center w-full mt-3 p-8">
            <div
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-sky-500 cursor-pointer ${
                pathname === '/' ? 'bg-sky-500' : ''
              }`}
              onClick={() => navigate('/')}
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">대시보드</span>
            </div>

            <div
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-sky-500 cursor-pointer ${
                pathname === '/accounts' ? 'bg-sky-500' : ''
              }`}
              onClick={() => navigate('/accounts')}
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
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <span className="ml-2 text-sm font-medium">계좌 목록</span>
            </div>
            <div
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-sky-500 cursor-pointer ${
                pathname === '/users' ? 'bg-sky-500' : ''
              }`}
              onClick={() => navigate('/users')}
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <span className="ml-2 text-sm font-medium">사용자 목록</span>
            </div>
            <div
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-sky-500 cursor-pointer"
              onClick={logout}
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>

              <span className="ml-2 text-sm font-medium">로그아웃</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
