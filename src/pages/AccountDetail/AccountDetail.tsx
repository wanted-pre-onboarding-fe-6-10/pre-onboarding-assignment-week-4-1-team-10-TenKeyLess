import useMutation from 'hooks/useMutation';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { accountsStatus, brokers } from 'utils/constant';
import { makeComma } from 'utils/utils';

const AccountDetail = () => {
  const { accountId } = useParams();
  const [getAccountInfo, { data, loading }] = useMutation(`/accounts/${accountId}?_expand=user`);
  useEffect(() => {
    getAccountInfo();
  }, []);
  console.log(data);
  return (
    <div className="flex flex-col">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mt-8 mb-2 font-bold">계좌 정보</div>
          <div className="flex h-16 text-sm">
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">고객명</div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {data.user.name}
              </div>
              <div className="flex items-center"></div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                브로커명
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {brokers[data.broker_id]}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                계좌번호
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {data.number}
              </div>
            </div>
          </div>
          <div className="flex h-16 text-sm">
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                계좌상태
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {accountsStatus[data.status]}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">계좌명</div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {data.name}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                평가금액
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {makeComma(data.assets)}
              </div>
            </div>
          </div>
          <div className="flex h-16 text-sm">
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                입금금액
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {makeComma(data.payments)}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                계좌 활성화 여부
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {data.is_active}
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-4 flex items-center w-[35%] border-2 border-gray-300 ">
                계좌개설일
              </div>
              <div className="p-4 flex items-center w-[65%] border-2 border-gray-300  bg-white">
                {/* {data.create_at.split('').slice(0, 10)} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
