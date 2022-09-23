import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserService } from '../../api/UserService';
import { AxiosError } from 'axios';
import { Params, User } from 'src/types/types';

export const getUserList = createAsyncThunk(
  'user/get',
  async (params: Params, { rejectWithValue }) => {
    try {
      const { data } = await getUserService(params);
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
      state.list = action.payload;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      const err = action.payload;
      console.error(err);
    });
  },
});

export default userSlice.reducer;
