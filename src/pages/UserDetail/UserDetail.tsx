import useMutation from 'hooks/useMutation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UserDetail = () => {
  const { user } = useLocation().state;
  const [getUserAccountInfo, { data, loading }] = useMutation(
    `/accounts?_expand=user&userId=${user.id}`
  );

  useEffect(() => {
    getUserAccountInfo();
  }, []);
  return <>UserDetail</>;
};

export default UserDetail;
