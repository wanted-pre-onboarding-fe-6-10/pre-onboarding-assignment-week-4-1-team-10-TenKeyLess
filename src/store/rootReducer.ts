import { combineReducers } from 'redux';
import accountSlice from './services/accountSlice';
import authSlice from './services/authSlice';
import paramSlice from './services/paramSlice';
import userSlice from './services/userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  account: accountSlice,
  user: userSlice,
  param: paramSlice,
});

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
