import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { IUpdateProductData, updateProductService } from 'services/product';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUpdateProductSlice {
  isSuccess: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: IUpdateProductSlice = {
  isSuccess: false,
  isUpdating: false,
  error: null
};

export const updateProductThunk = createAsyncThunk('productManage/updateProduct', async (updateData: IUpdateProductData, thunkAPI) => {
  const response = await updateProductService(updateData);
  if (response) {
    thunkAPI.dispatch(getProductByIdThunk(updateData.productId));

    thunkAPI.dispatch(getAllProductThunk());
  }

  return response;
});

export const updateProductSlice = createSlice({
  name: 'productManage/updateProduct',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProductThunk.pending, (state) => {
      state.isUpdating = true;

      state.error = null;
    });

    builder.addCase(updateProductThunk.fulfilled, (state) => {
      state.isUpdating = false;

      state.isSuccess = true;
    });

    builder.addCase(updateProductThunk.rejected, (state, action) => {
      state.isUpdating = false;

      state.isSuccess = false;

      state.error = action.payload as string;
    });
  }
});

export default updateProductSlice.reducer;
