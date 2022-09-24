import Filters from './Filters';

const AccountControl = () => {
  return (
    <div className="flex justify-between w-10/12">
      <form>
        <input type="text" />
        <button>검색</button>
      </form>
      <Filters />
    </div>
  );
};

export default AccountControl;
