import axios from 'axios';
import { getCookie } from '../utils/cookie';

export const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const accessToken = getCookie('myToken');
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => response,
  err => Promise.resolve(err.response)
);
