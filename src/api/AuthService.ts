import { LoginInput } from 'src/types/authTypes';
import instance from './axios';

const authService = async (value: LoginInput) => {
  const response = await instance.post('/login', value);
  return response;
};

export default authService;
