import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { oneUsersRequest } from '../../api/axios';
import { BROKERS, ACCOUNT_STATUS } from '../../const';

const UserDetail = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    oneUsersRequest(id).then(res => setUserData(res.data));
  }, []);

  /*
   [BUG] store에 접근하여 해당 user에 대한 데이터만 가져오기 - 접근이 안됨
     const { users, totalCount } = useSelector(state => state.users);
     console.log(
       'store',
       users.find(obj => obj.id === id)
     );
  */

  return (
    // [TODO] - 하드코딩 한 부분 map으로 리팩토링
    <div>
      {userData.id && (
        <div className="ml-10 mt-10">
          <h1 className="mb-10 mt-[-5px] text-2xl font-semibold text-gray-400">
            General Information
          </h1>
          <div className="flex">
            <div className="mr-10">
              <img src={userData.photo} alt="userImg" className="rounded-[50%]" />
            </div>
            <div>
              <ul className="grid w-full grid-cols-6 pb-12 gap-10">
                <li>
                  <p className="font-extrabold">name</p>
                  <p>{userData.name}</p>
                </li>
                <li>
                  <p className="font-extrabold">email</p>
                  <p>{userData.email}</p>
                </li>
                <li>
                  <p className="font-extrabold">age</p>
                  <p>{userData.age}</p>
                </li>
                <li>
                  <p className="font-extrabold">gender</p>
                  <p>
                    {userData.gender_origin === 1 || userData.gender_origin === 3 ? '남' : '여'}
                  </p>
                </li>
                <li>
                  <p className="font-extrabold">birth date</p>
                  <p>{new Date(userData.birth_date).toLocaleDateString()}</p>
                </li>
                <li>
                  <p className="font-extrabold">phone number</p>
                  <p>{userData.phone_number}</p>
                </li>
              </ul>

              <ul className="grid w-full grid-cols-4 pb-12 gap-10">
                <li>
                  <p className="font-extrabold">address</p>
                  <p>
                    {userData.address} ,{userData.detail_address}
                  </p>
                </li>
                <li>
                  <p className="font-extrabold">last_login</p>
                  <p>{userData.last_login}</p>
                </li>
                <li>
                  <p className="font-extrabold">created_at</p>
                  <p>{userData.created_at}</p>
                </li>
                <li>
                  <p className="font-extrabold">updated_at</p>
                  <p>{userData.updated_at}</p>
                </li>
              </ul>

              <ul className="grid w-full grid-cols-4 pb-12 gap-10">
                <li>
                  <p className="font-extrabold">allow marketing</p>
                  <p>{userData.setting.allow_marketing_push ? '동의' : '거부'}</p>
                </li>
                <li>
                  <p className="font-extrabold">allow invest</p>
                  <p>{userData.setting.allow_invest_push ? '허용' : '거부'}</p>
                </li>
                <li>
                  <p className="font-extrabold">active</p>
                  <p>{userData.setting.is_active ? '활성' : '비활성'}</p>
                </li>
                <li>
                  <p className="font-extrabold">staff</p>
                  <p>{userData.setting.is_staff ? '임직원' : '일반인'}</p>
                </li>
              </ul>
            </div>
          </div>

          <h1 className="mb-4 mt-[-15px] text-2xl font-semibold text-gray-400">계좌 목록</h1>
          <h3 className="font-semibold text-lg mb-5">
            보유 계좌 갯수:{userData.accounts.length}개
          </h3>
          <table border="1" width="90%" height="200" cellSpacing="5">
            <thead>
              <tr className="text-center bg-slate-300">
                <th>증권사</th>
                <th>계좌번호</th>
                <th>임금금액</th>
                <th>평가금액</th>
                <th>활성화</th>
              </tr>
            </thead>

            <tbody>
              {userData.accounts.map(accountData => (
                <tr className="text-center bg-slate-50" key={accountData.id}>
                  <th> {BROKERS[accountData.broker_id]}</th>
                  <td> {accountData.number}</td>
                  <td>{accountData.assets}</td>
                  <td> {accountData.payments}</td>
                  <td> {ACCOUNT_STATUS[accountData.status]} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
