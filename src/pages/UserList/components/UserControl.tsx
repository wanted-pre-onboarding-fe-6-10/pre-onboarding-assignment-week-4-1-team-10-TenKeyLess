import SearchForm from '../../../components/searchform/SearchForm';
import UserFilter from './UserFilter';

const UserControl = () => {
  return (
    <div className="flex justify-between w-10/12 m-auto my-3">
      <SearchForm />
      <UserFilter />
    </div>
  );
};

export default UserControl;
