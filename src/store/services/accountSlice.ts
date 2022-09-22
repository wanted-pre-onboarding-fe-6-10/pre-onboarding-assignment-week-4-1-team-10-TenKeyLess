import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccountService } from '../../api/AccountService';
import { Account } from 'src/types/types';
import { AxiosError } from 'axios';

const initialState: Account[] | null = [];

export const getAccountList = createAsyncThunk(
  'accounts/getList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAccountService();
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
    builder.addCase(getAccountList.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAccountList.fulfilled, (state, action) => {
      return { ...state, list: action.payload, isLoading: false };
    });
    builder.addCase(getAccountList.rejected, (state, action) => {
      const err = action.payload;
      console.error(err);
    });
  },
});

export default accountSlice.reducer;