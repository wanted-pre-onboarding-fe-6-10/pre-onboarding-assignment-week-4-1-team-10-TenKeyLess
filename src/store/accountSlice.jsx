import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountsRequest } from '../api/axios';

export const getAccountsRequest = createAsyncThunk('GET_COMMENT', async (_, thunkApi) => {
  try {
    const { data } = await accountsRequest(); // 2. api 사용, 비동기 코드 만들고
    return data;
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const accountSlice = createSlice({
  name: 'accounts',
  initialState: [],

  reducers: {},

  extraReducers: builder => {
    // 3. reducer로 acrion캐치함
    builder.addCase(getAccountsRequest.fulfilled, (state, action) => {
      console.log('action', action);
      return {
        ...state,
      };
    });
  },
});
