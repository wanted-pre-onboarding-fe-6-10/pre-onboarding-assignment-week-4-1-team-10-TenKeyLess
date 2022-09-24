import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserService } from '../../api/UserService';
import { AxiosError } from 'axios';
import { Params, User } from 'src/types/types';
import { RemoveToken } from '../../repository/TokenRepository';

export const getUserList = createAsyncThunk(
  'user/get',
  async (params: Params, { rejectWithValue }) => {
    const userParams = { ...params, _expand: null, _embed: 'accounts' as const };
    try {
      const { data } = await getUserService(userParams);
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      throw e;
    }
  }
);

const initailList: User[] = [];

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoading: false, list: initailList },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      if (action.payload === 'jwt expired') {
        RemoveToken();
      }
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      const err = action.payload;
      console.error(err);
    });
  },
});

export default userSlice.reducer;
