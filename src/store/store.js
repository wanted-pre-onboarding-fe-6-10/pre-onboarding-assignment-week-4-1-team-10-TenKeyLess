import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist'; // 📍
import storage from 'redux-persist/lib/storage'; // 📍

import accountReducer from './accountSlice';
import userNameReducer from './userNameSlice';
import userDetailReducer from './userDetailSlice';

// 📍
const persistConfig = {
  key: 'root',
  storage: storage, // localStorage에 저장합니다.
};

const persistedReducer = persistReducer(persistConfig, userNameReducer); //  userName은 userNameReducer가 아닌 persistedReducer가 reducer값이 됨.

export const store = configureStore({
  reducer: { userName: persistedReducer, accounts: accountReducer, userDetails: userDetailReducer },
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
  userId: {userId : 104} ,
  accounts : { accounts : [{},{},{}...] }
  userDetails : {userDetails : [{},{},{}...]}
}
*/
