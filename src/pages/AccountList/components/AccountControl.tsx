import SearchForm from '../../../components/searchform/SearchForm';
import AccountFilters from './AccountFilters';

const AccountControl = () => {
  return (
    <div className="flex justify-between w-10/12 m-auto my-3">
      <SearchForm />
      <AccountFilters />
    </div>
  );
};

export default AccountControl;
