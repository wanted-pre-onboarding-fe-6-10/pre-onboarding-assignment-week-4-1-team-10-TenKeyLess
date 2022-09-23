import Account from './components/Account';
import AccountFilter from './components/AccountFilter';
import AccountTitle from './components/AccountTitle';
import PageButton from './components/PageButtons';

const AccountList = () => {
  return (
    <>
      <AccountFilter />
      <Account />
      <PageButton />
    </>
  );
};

export default AccountList;
