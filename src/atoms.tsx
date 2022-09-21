import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const toggleThemeAtom = atom({
  key: 'theme',
  default: false,
});

export const toggleSidebarAtom = atom({
  key: 'sidebar',
  default: false,
});

export const tokenAtom = atom({
  key: 'accessToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userListAtom = atom({
  key: 'userList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const AccountListAtom = atom({
  key: 'accountList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
