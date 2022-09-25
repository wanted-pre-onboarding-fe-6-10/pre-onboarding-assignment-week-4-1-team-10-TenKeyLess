import { useForm } from 'react-hook-form';
import { postLoginRequest } from '../../store/userNameSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
  // <회원가입>
  useEffect(() => {
    fetch('http://localhost:4000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@admin.com',
        password: 'admin123!',
      }),
    })
      .then(res => res.json())
      .then(result => console.log(result));
  }, []);
  */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const loginData = { email: data.email, password: data.password };
    dispatch(postLoginRequest(loginData)).then(result => {
      if (result.error) {
        return;
      }
      navigate('/accounts?');
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-300 ">
      <h1 className="text-4xl mt-32 mb-10">December &amp; Company</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center pt-16 border-[1px] border-black w-2/5 h-2/5 bg-gray-200 "
      >
        <label className="py-3 w-full ml-20">
          <p className="w-10">Email</p>
          <input
            className="w-5/6 p-2 rounded-md"
            placeholder="이메일을 입력하세요"
            type="email"
            {...register('email', {
              required: true,
              validate: value => value.length > 0,
            })}
          />
        </label>
        {errors.email && <p className="text-red-400">이메일을 입력하세요.</p>}

        <label className="py-3 w-full ml-20">
          <p>password</p>
          <input
            className="w-5/6 p-2 rounded-md"
            placeholder="8글자 이상(1개이상의 영문, 숫자, 특수문자 포함)"
            type="password"
            {...register('password', {
              required: true,
              validate: {
                positiveLength: value => value.length >= 8,
                lessThanHundred: value => pwIsValid(value),
              },
            })}
          />
        </label>
        {errors.password && errors.password.type === 'required' && (
          <p className="boreder-2 text-red-900">비밀번호를 입력하세요!</p>
        )}
        {errors.password && errors.password.type === 'positiveLength' && (
          <p className="boreder-2 text-red-900">8자리 이상 입력하세요!</p>
        )}
        {errors.password && errors.password.type === 'lessThanHundred' && (
          <p className="boreder-2 text-red-900"> 영문 , 숫자, 특수문자 최소 1개 이상 포함</p>
        )}

        <button type="submit" className="boreder-2 bg-blue-400 w-4/6 rounded-md p-4 my-10">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;

const pwIsValid = txt => {
  const reg = new RegExp(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/);
  return reg.test(txt) ? true : false;
};
