import { generateNetWeightObject, getAllNetWeightService, INetWeightData } from 'services/netWeight';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetAllNetWeightSlice {
  netWeightData: INetWeightData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetAllNetWeightSlice = {
  netWeightData: [],
  isLoading: false,
  error: null
};

export const getAllNetWeightThunk = createAsyncThunk('netWeightManage/getAllNetWeight', async () => {
  return await getAllNetWeightService();
});

const getAllNetWeightSlice = createSlice({
  name: 'netWeightManage/getAllNetWeight',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNetWeightThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getAllNetWeightThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.netWeightData = action.payload.map((netWeight: any) => generateNetWeightObject(netWeight));

      state.error = null;
    });

    builder.addCase(getAllNetWeightThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getAllNetWeightSlice.reducer;
