import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist'; // 📍
import storage from 'redux-persist/lib/storage'; // 📍

import accountReducer from './accountSlice';
import userNameReducer from './userNameSlice';
import userDetailReducer from './usersSlice';

// 📍
const persistConfig = {
  key: 'root',
  storage: storage, // localStorage에 저장합니다.
};

const persistedReducer = persistReducer(persistConfig, userNameReducer); //  userName은 userNameReducer가 아닌 persistedReducer가 reducer값이 됨.

export const store = configureStore({
  reducer: { userName: persistedReducer, accounts: accountReducer, users: userDetailReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['persist/PERSIST'],
      },
    }).concat(logger),
});

/*
store형태
{
  userName: {userName : amdin} ,
  accounts : { accounts : [{},{},{}...], totalCount : 335 } // 페이지네이션 대상 10개씩 저장
  users : {users : [{},{},{}...], totalCount : 100} // 페이지네이션 대상 10개씩 저장
}
*/
