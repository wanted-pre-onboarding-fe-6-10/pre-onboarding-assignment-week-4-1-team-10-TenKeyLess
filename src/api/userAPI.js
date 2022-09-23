import { instance } from './customAxios';

export const userPage = async page => {
  try {
    const response = await instance.get(`/users?_page=${page}&_limit=20`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const userTotalList = async () => {
  try {
    const response = await instance.get('/users');
    return response.data;
  } catch (e) {
    throw e;
  }
};
