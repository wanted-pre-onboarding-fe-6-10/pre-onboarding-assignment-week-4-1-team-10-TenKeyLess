import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'src/atoms';

interface PathProps {
  path: string;
}

const Header = ({ path }: PathProps) => {
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <div className="flex justify-center w-full px-36 pt-8 h-20">
      <div className="flex w-[100%] justify-between">
        <div>
          <h1>현재 페이지</h1>
        </div>
        <div className="text-right">
          <h3>{userInfo.email}님</h3>
        </div>
      </div>
    </div>
  );
};
export default Header;
