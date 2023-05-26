import { generateOrderDataObject } from 'redux/checkoutManage/utils';
import { getOrderService, IOrderData } from 'services/checkout';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetOrderSlice {
  isLoading: boolean;
  error: string | null;
  orderData: IOrderData[];
}

const initialState: IGetOrderSlice = {
  isLoading: false,
  error: null,
  orderData: []
};

export const getOrderThunk = createAsyncThunk('checkoutManage/getOrder', async () => {
  return await getOrderService();
});

const getOrderSlice = createSlice({
  name: 'checkoutManage/getOrder',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.orderData = action.payload.map((order: any) => generateOrderDataObject(order));
    });

    builder.addCase(getOrderThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getOrderSlice.reducer;
