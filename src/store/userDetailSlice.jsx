import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userDetailRequest } from '../api/axios';

export const getUserDetailRequest = createAsyncThunk('GET_USERS', async (_, thunkApi) => {
  try {
    const { data } = await userDetailRequest(); // 2. store 밖에서 비동기 코드 만들고

    return data;
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const userDetailSlice = createSlice({
  name: 'userDetails',
  initialState: { userDetails: [] },

  reducers: {},

  extraReducers: builder => {
    // 3. reducer로 action캐치함
    builder.addCase(getUserDetailRequest.fulfilled, (state, action) => {
      return { ...state, userDetails: action.payload };
    });
  },
});

export default userDetailSlice.reducer;
