import { toast } from 'react-toastify';
import { generateUserDataObject } from 'redux/authenticate/utils';
import { IRegisterData, IUserData, registerService } from 'services/authenticate';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IRegisterSlice {
  isLoading: boolean;
  error: string | null;
  registeredData: IUserData | null;
}

const initialState: IRegisterSlice = {
  isLoading: false,
  error: null,
  registeredData: null
};

export const registerThunk = createAsyncThunk('authenticate/register', async (data: IRegisterData, { rejectWithValue }) => {
  try {
    const response = await registerService(data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

const registerSlice = createSlice({
  name: 'authenticate/register',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.registeredData = generateUserDataObject(action.payload);

      state.error = null;
    });

    builder.addCase(registerThunk.rejected, (state, action) => {
      toast.error(action.payload as string);

      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default registerSlice.reducer;
