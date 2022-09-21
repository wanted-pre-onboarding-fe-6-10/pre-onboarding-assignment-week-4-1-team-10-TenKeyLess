import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosConfig: AxiosRequestConfig = { baseURL: BASE_URL };

export const instance: AxiosInstance = axios.create(axiosConfig);
