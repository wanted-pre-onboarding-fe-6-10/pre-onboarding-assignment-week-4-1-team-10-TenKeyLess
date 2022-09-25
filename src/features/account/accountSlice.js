import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: null,
  accountTotal: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setAccountTotal: (state, action) => {
      state.accountTotal = action.payload;
    },
  },
});

export const { setAccount, setAccountTotal } = accountSlice.actions;

export default accountSlice.reducer;
