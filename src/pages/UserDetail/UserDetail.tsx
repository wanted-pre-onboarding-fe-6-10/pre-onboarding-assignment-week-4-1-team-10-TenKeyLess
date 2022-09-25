import useMutation from 'hooks/useMutation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserAccountList from './components/UserAccountList';
import UserInfoTable from './components/UserInfoTable';
import { userInfoAtom } from 'src/atoms';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const UserDetail = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
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
  useEffect(() => {
    if (data === 'jwt expired') {
      setUserInfo({ accessToken: '', email: '' });
      alert('로그인 유효 기간이 만료됐습니다. 다시 로그인 해주세요.');
      navigate('/');
    }
  }, [data]);

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
