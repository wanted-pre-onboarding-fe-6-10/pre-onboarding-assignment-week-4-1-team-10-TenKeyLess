import { instance } from './customAxios';

export const user = async () => {
  try {
    const response = await instance.get('/users');
    return response.data;
  } catch (e) {
    throw e;
  }
};
