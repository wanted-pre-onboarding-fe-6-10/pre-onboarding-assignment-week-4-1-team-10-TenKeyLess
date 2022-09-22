const TokenKey = 'ACCESS_TOKEN';
const Repository = sessionStorage;

export const SetToken = (Token: string) => {
  Repository.setItem(TokenKey, Token);
};

export const GetToken = () => {
  const token = Repository.getItem(TokenKey);
  if (token) return token;
};

export const RemoveToken = () => {
  Repository.removeItem(TokenKey);
};
