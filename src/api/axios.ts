import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GetToken } from '../repository/TokenRepository';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const instance: AxiosInstance = axios.create(axiosConfig);

instance.interceptors.request.use(config => {
  const token = GetToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});
