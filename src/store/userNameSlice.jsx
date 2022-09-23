import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../api/axios';

// acion함수
export const postLoginRequest = createAsyncThunk('POST_LOGIN', async (userData, thunkApi) => {
  try {
    const { data } = await loginRequest(userData); // 2. api 사용, 비동기 코드 만들고
    // console.log('data', data); // {accessToken : "eeeee", user : {email:"",id:104} }
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    const userName = data.user.email.split('@')[0];

    return userName; // reducer의 action이 이 값을 캐치하게 됨.
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const userNameSlice = createSlice({
  name: 'userName',
  initialState: { userName: '' },
  reducers: {},

  extraReducers: builder => {
    // 3. reducer로 acrion캐치함
    builder.addCase(postLoginRequest.fulfilled, (state, action) => {
      // console.log('action', action);
      return { ...state, userName: action.payload };
    });
  },
});

export default userNameSlice.reducer;
