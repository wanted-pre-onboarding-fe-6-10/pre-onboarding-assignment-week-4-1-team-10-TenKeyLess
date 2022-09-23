import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccountService } from '../../api/AccountService';
import { Account, Params } from 'src/types/types';
import { AxiosError } from 'axios';
import { RemoveToken } from '../../repository/TokenRepository';

const initialState: Account[] | 'jwt expired' | null = [];

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

const accountSlice = createSlice({
  name: 'accounts',
  initialState: { isLoading: false, list: initialState },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAccountList.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAccountList.fulfilled, (state, action) => {
      if (action.payload === 'jwt expired') {
        RemoveToken();
      }
      return { ...state, list: action.payload, isLoading: false };
    });
    builder.addCase(getAccountList.rejected, (state, action) => {
      const err = action.payload;
      console.error(err);
    });
  },
});

export default accountSlice.reducer;
