import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersRequest } from '../api/axios';
import { usersDataForm } from '../const';

export const getUsersRequest = createAsyncThunk('GET_USERS', async (_, thunkApi) => {
  const queryParams = new URLSearchParams(window.location.search);
  let pageNationData = ''; // &_page=1&_limit=10

  Object.entries(usersDataForm).forEach(data => {
    const key = data[0];
    const value = queryParams.get(key);

    if (value !== '' && value !== null) {
      if (key.includes('is')) {
        pageNationData += `&setting.${key}=${value}`;
      } else {
        pageNationData += `&${key}=${value}`;
      }
    }
  });
  console.log(pageNationData);

  try {
    return await usersRequest(pageNationData).then(response => ({
      totalCount: response.headers['x-total-count'],
      data: response.data,
    }));
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], totalCount: 0 },

  reducers: {},

  extraReducers: builder => {
    // 3. reducer로 action캐치함
    builder.addCase(getUsersRequest.fulfilled, (state, action) => {
      return { ...state, users: action.payload, totalCount: action.payload.totalCount };
    });
  },
});

export default usersSlice.reducer;
