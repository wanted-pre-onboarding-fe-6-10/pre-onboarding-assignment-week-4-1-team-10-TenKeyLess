import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const initialParams: Params = {
  _page: '1',
  _limit: '10',
  _sort: null,
  _order: null,
  q: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: { params: initialParams, accountPages: [''] },
  reducers: {
    updatePage: (state, action) => {
      state.params = { ...state.params, _page: action.payload };
    },
    updateLimit: (state, action) => {
      state.params = { ...state.params, _limit: action.payload };
    },
    updateSort: (state, action) => {
      state.params = { ...state.params, _sort: action.payload };
    },
    updateOrder: (state, action) => {
      state.params = { ...state.params, _order: action.payload };
    },
    resetParams: (state, action) => {
      state.params = initialParams;
    },
  },
  extraReducers: builder => {
    builder.addCase(getFullAccountList.fulfilled, (state, action) => {
      state.accountPages = action.payload;
    });
  },
});

export const { updatePage, updateLimit, updateOrder, updateSort } = pageSlice.actions;
export default pageSlice.reducer;

// getPageList: (state, action) => {
//     const pages = Array.from(
//       { length: Math.ceil(state.list.length / action.payload) },
//       (value, index) => (index + 1).toString()
//     );
//     state.pageList = pages;
//   },
