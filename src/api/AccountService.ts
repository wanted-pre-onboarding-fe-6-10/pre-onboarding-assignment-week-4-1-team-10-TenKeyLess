import { Params } from 'src/types/types';
import instance from './axios';

export const getAccountService = async (parameter?: Params) => {
  const response = await instance.get(`/accounts`, { params: parameter });
  return response;
};

export const getAccountDetailService = async (number: number) => {
  const response = await instance.get(`/accounts/${number}`, { params: { _expand: 'user' } });
  return response;
};
