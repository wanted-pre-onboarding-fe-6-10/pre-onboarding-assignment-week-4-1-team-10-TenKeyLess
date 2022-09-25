import FilterBar from 'components/common/FilterBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accountListAtom } from 'src/atoms';
import { accountsStatus, brokers } from 'utils/constant';
import { makeComma } from 'utils/utils';
import { masking } from 'utils/utils';
import { Account } from '../Accounts';
import AccountSearch from './AccountSearch';

const AccountTable = () => {
  const accounts = useRecoilValue(accountListAtom);
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="flex flex-col">
      {accounts ? (
        <div className="overflow-x-auto">
          <div className="flex justify-between py-3 pl-2">
            <AccountSearch />
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                  onClick={() => setOpenFilter(true)}
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
          {openFilter && <FilterBar isOpen={openFilter} setIsOpen={setOpenFilter} />}

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
                      브로커명
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      계좌번호
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      계좌상태
                    </th>{' '}
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      계좌명
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      <span className="inline-flex items-center">
                        평가금액
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      <span className="inline-flex items-center">
                        입금금액
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-center text-gray-500  "
                    >
                      계좌활성화여부
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-xs font-bold text-right text-gray-500  "
                    >
                      계좌개설일
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {accounts.map((account: Account, index: number) => (
                    <tr key={index}>
                      <td className="px-5 py-4 text-sm text-sky-500 whitespace-nowrap text-center">
                        <Link to={`/user/${account.userId}`} state={{ user: account.user }}>
                          {account.user.name}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {brokers[account.broker_id]}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        <Link to={`/account/${account.id}`}>{masking(account.number)}</Link>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {accountsStatus[account.status]}
                        {/* {account.status} */}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {account.name}
                      </td>
                      <td
                        className={`px-5 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap ${
                          parseInt(account.assets) - parseInt(account.payments) > 0
                            ? parseInt(account.assets) - parseInt(account.payments) === 0
                              ? 'text-black'
                              : 'text-red-700'
                            : 'text-blue-700'
                        } text-right`}
                      >
                        {makeComma(account.assets)}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-right">
                        {makeComma(account.payments)}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {account.is_active ? '활성화' : '비활성화'}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                        {account.created_at.split('').slice(0, 10)}
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

export default AccountTable;
