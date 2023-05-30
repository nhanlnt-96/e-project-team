import { toast } from 'react-toastify';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import {getStoreByIdThunk} from 'redux/storeLocatorManage/getStoreByIdSlice';
import { removeProductQuantityService } from 'services/product';
import {removeWorkingTimeService} from 'services/storeLocatorManage';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IRemoveWorkingHourSlice {
  isSuccess: boolean;
  isRemoving: boolean;
  error: string | null;
}

export interface IRemoveWorkingHourPayload {
  storeId: number;
  workingHourId: number;
}

const initialState: IRemoveWorkingHourSlice = {
  isSuccess: false,
  isRemoving: false,
  error: null
};

export const removeWorkingHourThunk = createAsyncThunk(
  'storeLocatorManage/removeWorkingHour',
  async ({ storeId, workingHourId }: IRemoveWorkingHourPayload, thunkAPI) => {
    try {
      const response = await removeWorkingTimeService(storeId,workingHourId);
      if (response) {
        toast.success('Working hour is removed.');

        thunkAPI.dispatch(getStoreByIdThunk(storeId));
      }

      return response;
    } catch (error) {
      toast.error(error as string);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeWorkingHourSlice = createSlice({
  name: 'storeLocatorManage/removeWorkingHour',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeWorkingHourThunk.pending, (state) => {
      state.isRemoving = true;

      state.error = null;
    });

    builder.addCase(removeWorkingHourThunk.fulfilled, (state) => {
      state.isRemoving = false;

      state.isSuccess = true;
    });

    builder.addCase(removeWorkingHourThunk.rejected, (state, action) => {
      state.isRemoving = false;

      state.isSuccess = false;

      state.error = action.payload as string;
    });
  }
});

export default removeWorkingHourSlice.reducer;
