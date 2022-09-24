import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserSettingService } from '../../api/UserService';
import { UserSetting } from 'src/types/types';

const initialUserSetting: UserSetting[] = [];

export const getuserSetting = createAsyncThunk(
  'userSetting/get',
  async (_, { rejectWithValue }) => {
    const { data } = await getUserSettingService();
    return data;
  }
);

const settingSlice = createSlice({
  name: 'userSetting',
  initialState: { userSetting: initialUserSetting },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getuserSetting.fulfilled, (state, action) => {
      state.userSetting = action.payload;
    });
  },
});

export default settingSlice.reducer;
