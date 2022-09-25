import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersRequest, nameModifyRequest, userDeleteRequest } from '../api/axios';
import { usersDataForm } from '../const';

export const getUsersRequest = createAsyncThunk('GET_USERS', async (_, thunkApi) => {
  const queryParams = new URLSearchParams(window.location.search);
  let pageNationData = '';

  Object.entries(usersDataForm).forEach(data => {
    const key = data[0];
    const value = queryParams.get(key);

    if (value !== '' && value !== null) {
      if (key.includes('is')) {
        pageNationData += `&setting.${key}=${value}`;
      } else {
        pageNationData += `&${key}=${value}`;
      }
    }
  });

  try {
    return await usersRequest(pageNationData).then(response => ({
      totalCount: response.headers['x-total-count'],
      data: response.data,
    }));
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

export const patchNameRequest = createAsyncThunk('PATCH_NAME', async (modifyData, thunkApi) => {
  try {
    return await nameModifyRequest(modifyData).then(response => response.data);
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

export const deleteRequest = createAsyncThunk('DELETE_USER', async (id, thunkApi) => {
  try {
    return await userDeleteRequest(id).then(response => id);
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

// <store>
export const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], totalCount: 0 },

  reducers: {},

  extraReducers: builder => {
    builder.addCase(getUsersRequest.fulfilled, (state, action) => {
      return { ...state, users: action.payload.data, totalCount: +action.payload.totalCount - 1 };
    });

    // [TODO] action.payload의 값에는 accounts 배열이 없음. 그래서 state값을 어떻게 update 해야할지 모르겟음
    builder.addCase(patchNameRequest.fulfilled, (state, action) => {});

    // [TODO] action.payload의 값에는 accounts 배열이 없음. 그래서 state값을 어떻게 update 해야할지 모르겟음
    builder.addCase(deleteRequest.fulfilled, (state, action) => {});

    builder.addCase(getUsersRequest.rejected, state => {
      alert('user 데이터 요청 오류');
      return state;
    });
  },
});

export default usersSlice.reducer;
