import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userTotal: null,
  userPageNum: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserTotal: (state, action) => {
      state.userTotal = action.payload;
    },
    setUserPageNum: (state, action) => {
      state.userPageNum = action.payload;
    },
  },
});

export const { setUser, setUserTotal, setUserPageNum } = userSlice.actions;

export default userSlice.reducer;
