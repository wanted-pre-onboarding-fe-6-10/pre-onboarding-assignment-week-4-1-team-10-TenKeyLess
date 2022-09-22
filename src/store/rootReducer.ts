import { combineReducers } from 'redux';
import accountSlice from './services/accountSlice';
import authSlice from './services/authSlice';
import pageSlice from './services/pageSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  account: accountSlice,
  page: pageSlice,
});

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
