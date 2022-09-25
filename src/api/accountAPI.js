import { instance } from './customAxios';

export const Account = async (page, sort, show) => {
  try {
    const response = await instance.get(
      `/accounts?_expand=user&_page=${page}&_limit=20&_sort=${sort}&_order=${show}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const AccountTotal = async () => {
  try {
    const response = await instance.get(`/accounts`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
