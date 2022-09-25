import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccountDetailService, getAccountService } from '../../api/AccountService';
import { Account, Params } from 'src/types/types';
import { AxiosError } from 'axios';
import { RemoveToken } from '../../repository/TokenRepository';

export const getAccountList = createAsyncThunk(
  'accounts/getList',
  async (params: Params, { rejectWithValue }) => {
    try {
      const { data } = await getAccountService(params);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      throw e;
    }
  }
);

export const getAccountDetail = createAsyncThunk(
  'accounts/getDetail',
  async (number: number, { rejectWithValue }) => {
    try {
      const { data } = await getAccountDetailService(number);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      throw e;
    }
  }
);

const initialState: Account[] | 'jwt expired' | null = [];

const accountSlice = createSlice({
  name: 'accounts',
  initialState: { isLoading: false, list: initialState, detail: {} },
  reducers: {},
  extraReducers: builder => {
    // Account List
    builder.addCase(getAccountList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAccountList.fulfilled, (state, action) => {
      if (action.payload === 'jwt expired') {
        RemoveToken();
      }
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAccountList.rejected, (state, action) => {
      state.isLoading = false;
      const err = action.payload;
      console.error(err);
    });
    // Account Detail
    builder.addCase(getAccountDetail.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAccountDetail.fulfilled, (state, action) => {
      if (action.payload === 'jwt expired') {
        RemoveToken();
      }
      state.detail = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAccountDetail.rejected, (state, action) => {
      state.isLoading = false;
      const err = action.payload;
      console.error(err);
    });
  },
});

export default accountSlice.reducer;
