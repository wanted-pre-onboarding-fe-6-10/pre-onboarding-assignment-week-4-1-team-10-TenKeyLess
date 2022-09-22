import { InitialParams } from '../store/services/pageSlice';
import instance from './axios';

export const getAccountService = async (parameter?: InitialParams) => {
  const response = await instance.get(`/accounts`, { params: parameter });
  return response;
};
