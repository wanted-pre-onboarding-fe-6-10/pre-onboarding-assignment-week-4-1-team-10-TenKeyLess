export const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const token = localStorage.getItem('accessToken');

// const noTokenAxios = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
// });

// const tokenAxios = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// export const signUp = async () => {
//   return await noTokenAxios.post(`/users/signup`);
// };

// export const login = async () => {
//   return await noTokenAxios.post(`/login`);
// };

// export const getAccounts = async () => {
//   return await tokenAxios.get(`/accounts`);
// };

// export const searchUsers = async (query: string) => {
//   return await tokenAxios.get(`/users?q=${query}`);
// };

// export const userPagination = async (page: number, limit: number) => {
//   return await tokenAxios.get(`/users?\\_page=${page}\\_limit=${limit}`);
// };

// export const searchAccounts = async (query: string) => {
//   return await tokenAxios.get(`/accounts?q=${query}`);
// };

// export const accountPagination = async (page: number, limit: number) => {
//   return await tokenAxios.get(`/accounts?\\_page=${page}\\_limit=${limit}`);
// };
