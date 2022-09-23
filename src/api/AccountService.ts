import { Params } from 'src/types/types';
import instance from './axios';

export const getAccountService = async (parameter?: Params) => {
  const response = await instance.get(`/accounts`, { params: parameter });
  return response;
};
