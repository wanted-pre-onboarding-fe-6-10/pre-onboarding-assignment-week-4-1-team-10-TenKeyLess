import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userTotal: null,
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
  },
});

export const { setUser, setUserTotal } = userSlice.actions;

export default userSlice.reducer;
