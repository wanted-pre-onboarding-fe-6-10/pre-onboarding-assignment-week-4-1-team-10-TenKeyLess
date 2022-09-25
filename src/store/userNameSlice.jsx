import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../api/axios';

export const postLoginRequest = createAsyncThunk('POST_LOGIN', async (userData, thunkApi) => {
  try {
    const { data } = await loginRequest(userData);
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    const userName = data.user.email.split('@')[0];

    return userName;
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

export const userNameSlice = createSlice({
  name: 'userName',
  initialState: { userName: '' },
  reducers: {},

  extraReducers: builder => {
    builder.addCase(postLoginRequest.fulfilled, (state, action) => {
      return { ...state, userName: action.payload };
    });

    builder.addCase(postLoginRequest.rejected, state => {
      alert('로그인 실패');
      return state;
    });
  },
});

export default userNameSlice.reducer;
