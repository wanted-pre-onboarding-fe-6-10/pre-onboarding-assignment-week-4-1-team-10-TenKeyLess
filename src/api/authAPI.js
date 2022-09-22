import { instance } from './customAxios';

export const signIn = async (email, password) => {
  try {
    const response = await instance.post('/login', { email, password });
    return response.data;
  } catch (e) {
    throw e;
  }
};
