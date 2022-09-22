import { createSlice } from '@reduxjs/toolkit';

export interface InitialParams {
  page: string;
  limit: '10' | '20' | '30';
  sort: string | null;
  order: 'desc' | 'asc' | null;
}

const initialParams: InitialParams = {
  page: '1',
  limit: '10',
  sort: null,
  order: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: initialParams,
  reducers: {
    updatePage: (state, action) => {
      return { ...state, page: action.payload };
    },
    updateLimit: (state, action) => {
      return { ...state, limit: action.payload };
    },
    updateSort: (state, action) => {
      return { ...state, sort: action.payload };
    },
    updateOrder: (state, action) => {
      return { ...state, order: action.payload };
    },
  },
});

export const { updatePage, updateLimit, updateOrder, updateSort } = pageSlice.actions;
export default pageSlice.reducer;
