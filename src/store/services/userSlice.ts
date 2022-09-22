import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserService } from 'api/UserService';
import { AxiosError } from 'axios';
import { Params } from 'src/types/types';

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

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoading: false, list: [] },
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
