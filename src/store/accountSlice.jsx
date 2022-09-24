import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountsRequest } from '../api/axios';
import { accountsDataForm } from '../const';

// action1
export const getAccountsRequest = createAsyncThunk('GET_ACCOUNTS', async (_, thunkApi) => {
  const queryParams = new URLSearchParams(window.location.search);
  let pageNationData = ''; // &_page=1&_limit=10

  Object.entries(accountsDataForm).forEach(data => {
    const key = data[0];
    const value = queryParams.get(key);

    if (value !== '' && value !== null) {
      pageNationData += `&${key}=${value}`;
    }
  });

  try {
    return await accountsRequest(pageNationData).then(response => ({
      totalCount: response.headers['x-total-count'],
      data: response.data,
    })); // 2. store 밖에서 비동기 코드 만들고
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const accountSlice = createSlice({
  name: 'accounts',
  initialState: { accounts: [], totalCount: 0 },

  reducers: {},

  // [TODO] rejected일떄 처리
  extraReducers: builder => {
    // 3. reducer로 action캐치함
    builder.addCase(getAccountsRequest.fulfilled, (state, action) => {
      return { ...state, accounts: action.payload.data, totalCount: action.payload.totalCount };
    });
  },
});

export default accountSlice.reducer;
