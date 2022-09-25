import { Account } from 'pages/Accounts/Accounts';
import { Link } from 'react-router-dom';
import { accountsStatus, brokers } from 'utils/constant';
import { makeComma, masking } from 'utils/utils';

interface DataProps {
  data: Account[];
}

const UserAccountList = ({ data }: DataProps) => {
  return (
    <div className="mt-8">
      <div className="ml-4 font-semibold">계좌 목록</div>
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="border rounded-lg overflow-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
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
                {data.map((account: Account, index: number) => (
                  <tr key={index}>
                    <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                      {brokers[account.broker_id]}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                      {masking(account.number)}
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
    </div>
  );
};

export default UserAccountList;
