import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASEURL,
  timeout: 30000,
  headers: { 'Content-type': 'application/json' },
});

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

instance.interceptors.response.use(
  response => {
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

export const accountsRequest = pageNationData => {
  return instance.get(`/accounts?_expand=user&_start=1&_limit=10${pageNationData}`);
};

export const usersRequest = pageNationData => {
  return instance.get(`/users?_embed=accounts&_start=1&_limit=10${pageNationData}`);
};

export const oneUsersRequest = userId => {
  return instance.get(`/users/${userId}?_embed=accounts`);
};

export const nameModifyRequest = ({ userId, modifiedName }) => {
  return instance.patch(`/users/${userId}`, {
    name: modifiedName,
  });
};

export const userDeleteRequest = userId => {
  return instance.delete(`/users/${userId}`);
};
