import { LocalStorageName } from 'constants/index';
import { toast } from 'react-toastify';
import { getAuthThunk } from 'redux/authenticate/getAuthSlice';
import { loginService } from 'services/authenticate';
import { ILoginData } from 'services/authenticate/loginService';
import { setLocalStorageItem } from 'utils/localStorage';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ILoginSlice {
  isLoading: boolean;
  error: string | null;
  isLogged: boolean;
}

const initialState: ILoginSlice = {
  isLoading: false,
  error: null,
  isLogged: false
};

export const loginThunk = createAsyncThunk('authenticate/login', async (data: ILoginData, { dispatch, rejectWithValue }) => {
  try {
    const response = await loginService(data);

    if (response) {
      if (response.accessToken) {
        setLocalStorageItem(LocalStorageName.ACCESS_TOKEN_NAME, response.accessToken);
      }

      toast.success('Login successfully');

      // INFO: get auth user data after login success
      dispatch(getAuthThunk());
    }

    return response;
  } catch (error) {
    toast.error(error as string);

    return rejectWithValue(error);
  }
});

const loginSlice = createSlice({
  name: 'authenticate/login',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.isLogged = true;
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default loginSlice.reducer;
