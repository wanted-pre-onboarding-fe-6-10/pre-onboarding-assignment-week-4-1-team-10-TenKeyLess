import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountsRequest } from '../api/axios';

export const getAccountsRequest = createAsyncThunk('GET_COMMENT', async (_, thunkApi) => {
  try {
    const { data } = await accountsRequest(); // 2. store 밖에서 비동기 코드 만들고
    return data;
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const accountSlice = createSlice({
  name: 'accounts',
  initialState: { accounts: [] },

  reducers: {},

  extraReducers: builder => {
    // 3. reducer로 action캐치함
    builder.addCase(getAccountsRequest.fulfilled, (state, action) => {
      // console.log(action.payload);
      return { accounts: action.payload };
    });
  },
});

export default accountSlice.reducer;
