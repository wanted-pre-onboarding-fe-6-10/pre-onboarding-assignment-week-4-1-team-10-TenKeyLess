import { Params, User } from 'src/types/types';
import instance from './axios';

export const getUserService = async (params?: Params) => {
  const response = await instance.get('/users', { params: params });
  return response;
};

export const getUserSettingService = async () => {
  const response = await instance.get('/userSetting');
  return response;
};

export const postUserService = async (user: User) => {
  const response = await instance.post('/users', user);
  return response;
};

export const putUserService = async (user: User) => {
  const response = await instance.put('/users', user);
  return response;
};

export const deleteUserService = async (id: string) => {
  const response = await instance.delete('/users');
  return response;
};
