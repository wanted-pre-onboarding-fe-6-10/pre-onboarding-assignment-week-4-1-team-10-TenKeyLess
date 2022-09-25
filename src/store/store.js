import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import accountReducer from './accountSlice';
import userNameReducer from './userNameSlice';
import userDetailReducer from './usersSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, userNameReducer);

export const store = configureStore({
  reducer: { userName: persistedReducer, accounts: accountReducer, users: userDetailReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['persist/PERSIST'],
      },
    }).concat(logger),
});
