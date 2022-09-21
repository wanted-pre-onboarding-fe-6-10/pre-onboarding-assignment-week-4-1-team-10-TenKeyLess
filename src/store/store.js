import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import accountReducer from './accountSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: { userId: userReducer, accounts: accountReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

/*
store형태
{
  userId: {userId : 104} ,
  accounts : { accounts : [{},{},{}...] }
}
*/
