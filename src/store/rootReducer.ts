import { combineReducers } from 'redux';
import accountSlice from './services/accountSlice';
import authSlice from './services/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  account: accountSlice,
});

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
