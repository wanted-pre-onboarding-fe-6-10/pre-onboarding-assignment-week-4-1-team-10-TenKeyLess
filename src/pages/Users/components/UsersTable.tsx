import { User } from 'pages/Accounts/Accounts';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userListAtom } from 'src/atoms';
import UserSearch from './UserSearch';

const UsersTable = () => {
  const users = useRecoilValue(userListAtom);
  console.log(users);
  return (
    <div>
      {users.length >= 0 ? (
        <div className="overflow-x-auto">
          <div className="flex justify-between py-3 pl-2">
            <UserSearch />
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                  // onClick={() => setOpenFilter(true)}
                >
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </div>
                    <div className="hidden sm:block">정렬</div>
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* {openFilter && <FilterBar isOpen={openFilter} setIsOpen={setOpenFilter} />} */}

          <div className="p-1.5 w-full inline-block align-middle">
            <div className="border rounded-lg overflow-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      고객명
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      보유중인 계좌수
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      이메일 주소
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      주민등록상 성별코드
                    </th>{' '}
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      생년월일
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      휴대폰 번호
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      최근로그인
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      혜택 수신 동의 여부
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-right text-gray-500  "
                    >
                      활성화 여부
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-right text-gray-500  "
                    >
                      가입일
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user: User, index: number) => (
                    <tr key={index}>
                      <td className="px-5 py-4 texthsm text-sky-500 whitespace-nowrap text-center">
                        <Link to={`/user/${user.id}`} state={{ user: user }}>
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {'계좌수'}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {user.email}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {user.gender_origin}
                        {/* {account.status} */}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {user.birth_date}
                      </td>
                      <td
                        className={`px-5 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap`}
                      >
                        {user.phone_number}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-right">
                        {/* {user.last_login.split('').slice(0, 10)} */}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {'혜택 수신 동의 여부'}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {'활성화 여부'}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {/* {user.created_at.split('').slice(0, 10)} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default UsersTable;
