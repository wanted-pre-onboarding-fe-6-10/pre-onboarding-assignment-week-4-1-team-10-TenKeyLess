import useMutation from 'hooks/useMutation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserAccountList from './components/UserAccountList';
import UserInfoTable from './components/UserInfoTable';

const UserDetail = () => {
  const { user } = useLocation().state;
  const [getUserAccountInfo, { data, loading }] = useMutation(
    `/accounts?_expand=usersetting&userId=${user.id}`
  );
  const [getUserSetting, { data: userSetting, loading: userSettingLoading }] = useMutation(
    `/userSetting?&uuid=${user.uuid}`
  );

  useEffect(() => {
    getUserAccountInfo();
    getUserSetting();
  }, []);
  console.log(user, data, userSetting);
  return (
    <div className="px-32 pb-16 w-full bg-gray-100">
      {loading || userSettingLoading ? (
        <div>loading...</div>
      ) : (
        <div className="w-[95%]">
          <UserInfoTable user={user} userSetting={userSetting} dataLength={data.length} />
          <UserAccountList data={data} />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
