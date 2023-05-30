import { toast } from 'react-toastify';
import { getAllStoreLocatorThunk } from 'redux/storeLocatorManage/getAllStoreLocatorSlice';
import { getStoreByIdThunk } from 'redux/storeLocatorManage/getStoreByIdSlice';
import { updateStoreLocatorService } from 'services/storeLocatorManage';
import { IUpdateStoreInfo, IUpdateStoreOpenHour } from 'services/storeLocatorManage/types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IUpdateStorePayload {
  storeInfo: IUpdateStoreInfo;
  storeOpenHour?: IUpdateStoreOpenHour[] | null;
  storeImgFile?: File | null;
}

interface IUpdateStoreLocatorSlice {
  isSuccess: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: IUpdateStoreLocatorSlice = {
  isSuccess: false,
  isUpdating: false,
  error: null
};

export const updateStoreLocatorThunk = createAsyncThunk('storeLocatorManage/updateStoreLocator', async (payload: IUpdateStorePayload, thunkAPI) => {
  try {
    const response = await updateStoreLocatorService(payload.storeInfo, payload.storeOpenHour, payload.storeImgFile);
    if (response) {
      toast.success('Store is updated.');

      thunkAPI.dispatch(getStoreByIdThunk(payload.storeInfo.storeId));

      thunkAPI.dispatch(getAllStoreLocatorThunk());
    }

    return response;
  } catch (error) {
    toast.error(error as string);

    return thunkAPI.rejectWithValue(error);
  }
});

export const updateStoreLocatorSlice = createSlice({
  name: 'storeLocatorManage/updateStoreLocator',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateStoreLocatorThunk.pending, (state) => {
      state.isUpdating = true;

      state.error = null;
    });

    builder.addCase(updateStoreLocatorThunk.fulfilled, (state) => {
      state.isUpdating = false;

      state.isSuccess = true;
    });

    builder.addCase(updateStoreLocatorThunk.rejected, (state, action) => {
      state.isUpdating = false;

      state.isSuccess = false;

      state.error = action.payload as string;
    });
  }
});

export default updateStoreLocatorSlice.reducer;
