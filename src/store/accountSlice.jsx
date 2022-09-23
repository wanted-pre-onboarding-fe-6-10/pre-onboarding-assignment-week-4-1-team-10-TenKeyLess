import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountsRequest } from '../api/axios';

export const getAccountsRequest = createAsyncThunk(
  'GET_ACCOUNTS',
  async (pageNationData, thunkApi) => {
    try {
      const { data } = await accountsRequest(pageNationData); // 2. store 밖에서 비동기 코드 만들고
      return data;
    } catch {
      return thunkApi.rejectWithValue('err');
    }
  }
);

export const getFullAccountRequest = createAsyncThunk(
  'GET_ACCOUNTS_Full',
  async (pageNationData, thunkApi) => {
    try {
      const { data } = await accountsRequest(pageNationData); // 2. store 밖에서 비동기 코드 만들고
      return data;
    } catch {
      return thunkApi.rejectWithValue('err');
    }
  }
);

// <store>
export const accountSlice = createSlice({
  name: 'accounts',
  initialState: { accounts: [], totalCount: 0 },

  reducers: {},

  // [TODO] rejected일떄 처리
  extraReducers: builder => {
    // 3. reducer로 action캐치함
    builder.addCase(getAccountsRequest.fulfilled, (state, action) => {
      return { ...state, accounts: action.payload };
    });

    // 3. reducer로 action캐치함
    builder.addCase(getFullAccountRequest.fulfilled, (state, action) => {
      return { ...state, totalCount: action.payload.length };
    });
  },
});

export default accountSlice.reducer;
