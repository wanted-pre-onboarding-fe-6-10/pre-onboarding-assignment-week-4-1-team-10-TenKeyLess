import { combineReducers } from 'redux';
import authSlice from './services/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
