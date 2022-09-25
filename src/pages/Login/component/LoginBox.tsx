import LoginInput from './LoginInput';
import LoginTitle from './LoginTitle';

const LoginBox = () => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <LoginTitle />
      <LoginInput />
    </div>
  );
};

export default LoginBox;
