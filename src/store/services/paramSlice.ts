import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserService } from '../../api/UserService';
import { Params } from 'src/types/types';
import { getAccountService } from '../../api/AccountService';

export const getFullAccountList = createAsyncThunk(
  'page/accounts',
  async (limit: number, { rejectWithValue }) => {
    const { data } = await getAccountService();
    const pages = Array.from({ length: Math.ceil(data.length / limit) }, (v, i) =>
      (i + 1).toString()
    );
    return pages;
  }
);

export const getFullUserList = createAsyncThunk(
  'page/users',
  async (limit: number, { rejectWithValue }) => {
    const { data } = await getUserService();
    const pages = Array.from({ length: Math.ceil(data.length / limit) }, (v, i) =>
      (i + 1).toString()
    );
    return pages;
  }
);

const initialParams: Params = {
  _expand: 'user',
  _embed: null,
  _page: '1',
  _limit: '10',
  _sort: null,
  _order: null,
  broker_id: null,
  status: null,
  is_active: null,
  q: null,
};

const paramSlice = createSlice({
  name: 'page',
  initialState: { params: initialParams, accountPages: [''], userPages: [''] },
  reducers: {
    updateParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
    resetParams: state => {
      state.params = initialParams;
    },
  },
  extraReducers: builder => {
    builder.addCase(getFullAccountList.fulfilled, (state, action) => {
      state.accountPages = action.payload;
    });
    builder.addCase(getFullUserList.fulfilled, (state, action) => {
      state.userPages = action.payload;
    });
  },
});

export const { updateParams } = paramSlice.actions;
export default paramSlice.reducer;
