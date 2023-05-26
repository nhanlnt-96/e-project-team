import { generateUserDataObject } from 'redux/authenticate/utils';
import { getAllAccountService } from 'services/accountManage';
import { IUserData } from 'services/authenticate';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetAllAcocuntSlice {
  accountData: IUserData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetAllAcocuntSlice = {
  accountData: [],
  isLoading: false,
  error: null
};

export const getAllAccountThunk = createAsyncThunk('accountManage/getAllAccount', async () => {
  return await getAllAccountService();
});

export const getAllAccountSlice = createSlice({
  name: 'accountManage/getAllAccount',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccountThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getAllAccountThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.accountData = action.payload.map((account: any) => generateUserDataObject(account));

      state.error = null;
    });

    builder.addCase(getAllAccountThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getAllAccountSlice.reducer;
