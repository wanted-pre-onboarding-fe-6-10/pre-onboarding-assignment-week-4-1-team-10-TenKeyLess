import PageButton from './components/PageButton';
import UserBox from './components/UserBox';
import UserControl from './components/UserControl';
import UserTitle from './components/UserTitle';

const UserList = () => {
  return (
    <div className="text-sm">
      <UserControl />
      <UserTitle />
      <UserBox />
      <PageButton />
    </div>
  );
};

export default UserList;
