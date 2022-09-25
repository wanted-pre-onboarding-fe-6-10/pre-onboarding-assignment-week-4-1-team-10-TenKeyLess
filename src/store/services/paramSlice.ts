import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserService } from '../../api/UserService';
import { Params } from 'src/types/types';
import { getAccountService } from '../../api/AccountService';

export const getFullAccountList = createAsyncThunk(
  'page/accounts',
  async (params: Params, { rejectWithValue }) => {
    const newParams = { ...params, _page: null, _limit: null };
    const { data } = await getAccountService(newParams);
    const pages =
      params._limit &&
      Array.from({ length: Math.ceil(data.length / parseInt(params._limit)) }, (v, i) =>
        (i + 1).toString()
      );
    return pages;
  }
);

export const getFullUserList = createAsyncThunk(
  'page/users',
  async (params: Params, { rejectWithValue }) => {
    const newParams = { ...params, _page: null, _limit: null, _expand: null };
    const { data } = await getUserService(newParams);
    const pages =
      params._limit &&
      Array.from({ length: Math.ceil(data.length / parseInt(params._limit)) }, (v, i) =>
        (i + 1).toString()
      );
    return pages;
  }
);

const initialParams: Params = {
  _expand: 'user',
  _embed: null,
  _page: '1',
  _limit: '10',
  _sort: null,
  _order: null,
  broker_id: null,
  status: null,
  is_active: null,
  q: null,
  allow_marketing_push: null,
};

const paramSlice = createSlice({
  name: 'page',
  initialState: { input: '', params: initialParams, accountPages: [''], userPages: [''] },
  reducers: {
    updateParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
    resetParams: state => {
      state.params = initialParams;
    },
    search: (state, action) => {
      state.input = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getFullAccountList.fulfilled, (state, action) => {
      state.accountPages = action.payload as string[];
    });
    builder.addCase(getFullUserList.fulfilled, (state, action) => {
      state.userPages = action.payload as string[];
    });
  },
});

export const { updateParams, search } = paramSlice.actions;
export default paramSlice.reducer;
