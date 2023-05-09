import { LocalStorageName } from 'constants/index';
import { generateUserDataObject } from 'redux/authenticate/utils';
import { getAuthService, IUserData } from 'services/authenticate';
import { getLocalStorageItem, setLocalStorageItem } from 'utils/localStorage';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IAuthSlice {
  isLoading: boolean;
  error: string | null;
  userData: IUserData | null;
}

const initialState: IAuthSlice = {
  isLoading: false,
  error: null,
  userData: getLocalStorageItem(LocalStorageName.USER_DATA_NAME)
};

export const getAuthThunk = createAsyncThunk('authenticate/getAuth', async (_, { getState, rejectWithValue }) => {
  try {
    const response = await getAuthService();
    let userData = null;

    if (response) {
      userData = generateUserDataObject(response);

      setLocalStorageItem(LocalStorageName.USER_DATA_NAME, userData);
    }

    return userData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getAuthSlice = createSlice({
  name: 'authenticate/getAuth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getAuthThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.userData = generateUserDataObject(action.payload);
    });

    builder.addCase(getAuthThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;

      state.userData = null;
    });
  }
});

export default getAuthSlice.reducer;
