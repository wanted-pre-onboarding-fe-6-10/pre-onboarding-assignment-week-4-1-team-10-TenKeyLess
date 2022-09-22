import instance from './axios';

export const getAccountService = async (
  page?: string,
  limit?: string,
  sort?: string | null,
  order?: 'desc' | 'asc' | null
) => {
  const response = await instance.get(
    `/accounts?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  return response;
};
