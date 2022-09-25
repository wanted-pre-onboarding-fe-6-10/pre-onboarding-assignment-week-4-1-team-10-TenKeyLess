import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserSettingService } from '../../api/UserService';
import { Params, UserSetting } from 'src/types/types';

const initialUserSetting: UserSetting[] = [];

export const getuserSetting = createAsyncThunk(
  'userSetting/get',
  async (params: Params, { rejectWithValue }) => {
    const settingParams = { ...params, _page: null, _limit: null, _expand: null };
    const { data } = await getUserSettingService(settingParams);
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
