import { createSlice } from '@reduxjs/toolkit';
import { LoginInput } from 'src/types/authTypes';

const initialInput: LoginInput = {
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { input: initialInput },
  reducers: {
    inputChage: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const { inputChage } = authSlice.actions;
export default authSlice.reducer;
