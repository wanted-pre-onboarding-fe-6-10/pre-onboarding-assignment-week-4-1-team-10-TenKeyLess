import useMutation from 'hooks/useMutation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from 'src/atoms';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({ mode: 'onSubmit' });
  const [login, { data, loading }] = useMutation<any>(`/login`);

  const onValid = (formData: LoginForm) => {
    login(formData);
  };
  useEffect(() => {
    if (data) {
      const { email } = getValues();
      setUserInfo({ accessToken: data.accessToken, email });
    }
  }, [data]);
  useEffect(() => {
    if (userInfo?.accessToken) {
      navigate('/accounts');
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen pb-16">
      <div className="flex items-center justify-center w-full mb-8">
        <div>
          <img className="w-auto h-12" src={`${process.env.PUBLIC_URL}/DAC.png`} alt="" />
        </div>
        <div>
          <div className="ml-4 mr-4 text-black text-4xl font-bold">PREFACE</div>
        </div>
      </div>
      <div className="text-2xl font-bold mb-2">로그인</div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex items-center justify-center w-[100rem]"
      >
        <div className="border-2 border-slate-900/75 p-8 rounded-lg">
          <div className="mb-4 flex flex-col">
            <h4 className="font-semibold mb-2">이메일</h4>
            <input
              {...register('email', {
                required: '필수 정보입니다.',
                pattern: {
                  value:
                    /^[a-zA-Z]+[!#$%&'*+-/=?^_`(){|}~]*[a-zA-Z0-9]*@[\w]+\.[a-zA-Z0-9-]+[.]*[a-zA-Z0-9]+$/,
                  message: '이메일 형식을 지켜주세요.',
                },
              })}
              className="w-[20rem] border-2 border-gray-300 outline-gray-300 placeholder:text-sm placeholder:text-textGray px-3 py-2 rounded"
              placeholder="이메일을 입력해주세요."
            />
            <span className="text-xs text-[#ff5e57] pl-1">
              {errors ? errors?.email?.message : ''}
            </span>
          </div>
          <div className="mb-4 flex flex-col">
            <h4 className="font-semibold mb-2">비밀번호</h4>
            <input
              {...register('password', {
                required: '필수 정보입니다.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                  message: '8~16자의 영문 대 소문자, 숫자, 특수문자 조합만 사용 가능합니다.',
                },
              })}
              type="password"
              maxLength={16}
              className="w-[20rem] border-2 border-gray-300 outline-gray-300 placeholder:text-sm placeholder:text-textGray px-3 py-2 rounded"
              placeholder="비밀번호를 입력해주세요."
            />
            <span className="text-xs text-[#ff5e57] pl-1">{errors?.password?.message}</span>
          </div>
          <button className="flex w-full border-2 bg-slate-900 items-center justify-center p-3 rounded-lg text-white font-semibold cursor-pointer hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            <span>로그인</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
