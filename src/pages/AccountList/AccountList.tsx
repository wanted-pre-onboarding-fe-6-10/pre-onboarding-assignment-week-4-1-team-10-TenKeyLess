import Account from './components/Account';
import AccountControl from './components/AccountControl';
import PageButton from './components/PageButtons';

const AccountList = () => {
  return (
    <>
      <AccountControl />
      <Account />
      <PageButton />
    </>
  );
};

export default AccountList;
