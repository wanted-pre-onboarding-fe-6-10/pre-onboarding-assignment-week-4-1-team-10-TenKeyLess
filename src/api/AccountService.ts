import instance from './axios';

export const getAccountService = async () => {
  const response = await instance.get('/accounts');
  return response;
};
