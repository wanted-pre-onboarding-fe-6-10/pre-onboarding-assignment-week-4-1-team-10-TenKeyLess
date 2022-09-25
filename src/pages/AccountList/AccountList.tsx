import Account from './components/Account';
import AccountControl from './components/AccountControl';
import AccountTitle from './components/AccountTitle';
import PageButton from './components/PageButtons';

const AccountList = () => {
  return (
    <div className="text-sm">
      <AccountControl />
      <AccountTitle />
      <Account />
      <PageButton />
    </div>
  );
};

export default AccountList;
