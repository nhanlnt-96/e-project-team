import { generateStoreLocatorObjectData } from 'redux/storeLocatorManage/utils';
import { getStoreByIdService } from 'services/storeLocatorManage';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetStoreByIdSlice {
  storeData: IStoreLocatorData | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: IGetStoreByIdSlice = {
  storeData: null,
  error: null,
  isLoading: false
};

const fetchStoreDetail = async (storeId: number) => {
  const storeData = await getStoreByIdService(storeId);

  return generateStoreLocatorObjectData(storeData);
};

export const getStoreByIdThunk = createAsyncThunk('storeLocatorManage/getStoreById', async (storeId: number): Promise<any> => {
  return await fetchStoreDetail(storeId);
});

export const getStoreByIdSlice = createSlice({
  name: 'storeLocatorManage/getStoreById',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStoreByIdThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getStoreByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.storeData = action.payload;
    });

    builder.addCase(getStoreByIdThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getStoreByIdSlice.reducer;
