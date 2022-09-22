import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist'; // 📍
import storage from 'redux-persist/lib/storage'; // 📍

import accountReducer from './accountSlice';
import userReducer from './userSlice';

// 📍
const persistConfig = {
  key: 'root',
  storage: storage, // localStorage에 저장합니다.
};

const persistedReducer = persistReducer(persistConfig, userReducer); //  userName은 userReducer가 아닌 persistedReducer가 reducer값이 됨.

export const store = configureStore({
  reducer: { userName: persistedReducer, accounts: accountReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

/*
store형태
{
  userId: {userId : 104} ,
  accounts : { accounts : [{},{},{}...] }
}
*/
