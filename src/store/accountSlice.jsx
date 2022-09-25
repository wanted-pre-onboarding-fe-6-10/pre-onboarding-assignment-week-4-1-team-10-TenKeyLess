import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accountsRequest } from '../api/axios';
import { accountsDataForm } from '../const';

export const getAccountsRequest = createAsyncThunk('GET_ACCOUNTS', async (_, thunkApi) => {
  const queryParams = new URLSearchParams(window.location.search);
  let pageNationData = '';
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
    }));
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: { accounts: [], totalCount: 0 },

  reducers: {},

  // [TODO] rejected일떄 처리
  extraReducers: builder => {
    builder.addCase(getAccountsRequest.fulfilled, (state, action) => {
      return { ...state, accounts: action.payload.data, totalCount: action.payload.totalCount };
    });

    builder.addCase(getAccountsRequest.rejected, state => {
      alert('accounts 데이터 요청 오류');
      return state;
    });
  },
});

export default accountSlice.reducer;
