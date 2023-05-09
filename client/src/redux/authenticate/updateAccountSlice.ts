import { toast } from 'react-toastify';
import { getAuthThunk } from 'redux/authenticate/getAuthSlice';
import { IUpdateAccountData, updateAccountService } from 'services/authenticate';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUpdateAccountSlice {
  isLoading: boolean;
  isUpdateSuccess: boolean;
  error: string | null;
}

const initialState: IUpdateAccountSlice = {
  isLoading: false,
  isUpdateSuccess: false,
  error: null
};

export const updateAccountThunk = createAsyncThunk(
  'authenticate/updateAccount',
  async (updateData: IUpdateAccountData, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateAccountService(updateData);
      if (response) {
        dispatch(getAuthThunk());

        return response;
      }
    } catch (error) {
      toast.error(error as string);

      return rejectWithValue(error as string);
    }
  }
);

const updateAccountSlice = createSlice({
  name: 'authenticate/updateAccount',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAccountThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;

      state.isUpdateSuccess = false;
    });

    builder.addCase(updateAccountThunk.fulfilled, (state) => {
      state.isLoading = false;

      state.isUpdateSuccess = true;
    });

    builder.addCase(updateAccountThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default updateAccountSlice.reducer;
