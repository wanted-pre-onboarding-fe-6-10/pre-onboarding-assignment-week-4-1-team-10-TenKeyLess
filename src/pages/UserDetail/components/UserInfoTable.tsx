import useMutation from 'hooks/useMutation';
import { User } from 'pages/Accounts/Accounts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { maskingPhoneNumber } from 'utils/utils';

export interface UserSetting {
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

interface UserProps {
  user: User;
  userSetting: UserSetting;
  dataLength: number;
}

const UserInfoTable = ({ user, userSetting, dataLength }: UserProps) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState('');
  const [changeName, { data }] = useMutation(`/users/${user.id}`);
  const [deleteUser, { data: deleteData }] = useMutation(`/users/${user.id}`, 'DELETE');
  const [getUsers, { data: userData, loading }] = useMutation(`/users/${user.id}`);
  const onChange = () => {
    changeName({ name });
    setIsActive(false);
    setName('');
    getUsers();
  };
  const onDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      // deleteUser();
      navigate('/accounts');
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(user);
  return (
    <div className="flex flex-col">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mt-8 mb-2 font-bold">사용자 정보</div>
          <div className="flex h-16 text-sm">
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">이름</div>
              {isActive ? (
                <div className="flex items-center w-[65%] border-2 border-gray-200">
                  <input
                    type="text"
                    className="w-[70%]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ml-2 text-green-700 cursor-pointer"
                    onClick={onChange}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ml-2 text-red-700 cursor-pointer"
                    onClick={onDelete}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              ) : (
                <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                  {userData.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 ml-2 text-green-700 cursor-pointer"
                    onClick={() => setIsActive(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </div>
              )}

              <div className="flex items-center"></div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                보유중인 계좌수
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {dataLength} 계좌
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                이메일 주소
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {userData.email}
              </div>
            </div>
          </div>
          <div className="flex h-16 text-sm">
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                주민등록상 성별코드
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {userData.gender_origin}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                생년월일
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {userData.birth_date.split('').slice(0, 10)}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                휴대폰 번호
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {maskingPhoneNumber(userData.phone_number)}
              </div>
            </div>
          </div>
          <div className="flex h-16 text-sm">
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                최근로그인
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {userData.last_login.split('').slice(0, 10)}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                혜택 수신 동의 여부
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {userSetting.allow_marketing_push ? '동의' : '비동의'}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                이메일 주소
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {userSetting.is_active ? '활성화' : '비활성화'}
              </div>
            </div>
          </div>
          <div className="flex h-16 text-sm">
            <div className="flex w-[33.5%]">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">가입일</div>
              <div className="p-4 flex items-center w-[64.9%] border-2 border-r-4 border-gray-300 h-16 bg-white">
                {userData.created_at.split('').slice(0, 10)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserInfoTable;
