import { getAuthThunk } from 'redux/authenticate/getAuthSlice';
import { verifyEmailService } from 'services/authenticate';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IVerifyEmailSlice {
  isLoading: boolean;
  error: string | null;
  isVerifySuccess: boolean;
}

const initialState: IVerifyEmailSlice = {
  isLoading: true,
  error: null,
  isVerifySuccess: false
};

export const verifyEmailThunk = createAsyncThunk('authenticate/verifyEmail', async (token: string, { rejectWithValue, dispatch }) => {
  try {
    const response = await verifyEmailService(token);
    if (response) {
      dispatch(getAuthThunk());

      return response;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

const verifyEmailSlice = createSlice({
  name: 'authenticate/verifyEmail',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyEmailThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(verifyEmailThunk.fulfilled, (state) => {
      state.isLoading = false;

      state.isVerifySuccess = true;
    });

    builder.addCase(verifyEmailThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default verifyEmailSlice.reducer;
