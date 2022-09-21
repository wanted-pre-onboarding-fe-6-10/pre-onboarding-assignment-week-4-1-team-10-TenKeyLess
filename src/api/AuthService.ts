import { instance } from './axios';

const authService = async () => {
  const response = await instance.post('/login');
  return response;
};
