import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import authService from '../../api/AuthService';
import { SetToken } from '../../repository/TokenRepository';
import { LoginInput } from '../../types/types';

export const initialInput: LoginInput = {
  email: '',
  password: '',
};

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (input: LoginInput, { rejectWithValue }) => {
    try {
      const {
        data: {
          accessToken,
          user: { email },
        },
      } = await authService(input);
      if (accessToken) SetToken(accessToken);
      return email;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data);
      }
      throw e;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    input: initialInput,
    isLoading: false,
    userId: {},
    errorMessage: '',
    isValid: false,
  },
  reducers: {
    inputChage: (state, action) => {
      state.input = action.payload;
    },
    handleValidation: (state, action) => {
      state.isValid = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginRequest.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      return { ...state, userId: action.payload, isLoading: false };
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      const err = action.payload;
      console.error(err);
      return { ...state, isLoading: false, errorMessage: err as string };
    });
  },
});

export const { inputChage, handleValidation } = authSlice.actions;
export default authSlice.reducer;
