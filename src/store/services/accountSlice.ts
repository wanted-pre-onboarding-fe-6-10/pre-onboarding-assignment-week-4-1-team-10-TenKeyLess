import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Account } from 'src/types/types';

const initialState: Account[] | null = [];

const getAccountList = createAsyncThunk(
  'accounts/getList',
  async (list: Account[], { rejectWithValue }) => {
    try {
      const response = 's';
    } catch {}
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState: { isLoading: false, list: initialState },
  reducers: {},
  //   extraReducers: builder => {},
});

export default accountSlice.reducer;
