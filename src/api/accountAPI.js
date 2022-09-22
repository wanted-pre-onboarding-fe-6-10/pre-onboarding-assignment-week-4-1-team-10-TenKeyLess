import { instance } from './customAxios';

export const Account = async () => {
  try {
    const response = await instance.get('/accounts');
    return response.data;
  } catch (e) {
    throw e;
  }
};
