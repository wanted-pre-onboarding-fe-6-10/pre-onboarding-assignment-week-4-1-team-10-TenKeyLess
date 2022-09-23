import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASEURL,
  timeout: 30000,
  headers: { 'Content-type': 'application/json' },
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  response => {
    //  console.log(response); // {data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
    return response;
  },
  error => {
    if (typeof error.response.data === 'string') {
      alert(error.response.data);
    }
    return Promise.reject(error);
  }
);

// [TODO] < CRUD - 파일분리 예정 >
export const loginRequest = userData => {
  return instance.post('/login', userData);
};

// 1. api 메서드 만들고 - 페이지네이션
export const accountsRequest = pageNationData => {
  return instance.get(
    `/accounts?_expand=user&_page=${pageNationData.currentPage}&_limit=${pageNationData.count}`
  );
};

export const userDetailRequest = () => {
  return instance.get('/users');
};

// export const userSettingRequest = () => {
//   //
// };
