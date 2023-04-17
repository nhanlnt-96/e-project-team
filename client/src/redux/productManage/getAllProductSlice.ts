import { generateProductDataObject } from 'redux/productManage/utils';
import { getAllProductService, IProductData } from 'services/product';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetAllProductSlice {
  productData: IProductData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetAllProductSlice = {
  productData: [],
  isLoading: false,
  error: null
};

export const getAllProductThunk = createAsyncThunk('productManage/getAllProduct', async () => {
  return await getAllProductService();
});

export const getAllProductSlice = createSlice({
  name: 'productManage/getAllProduct',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getAllProductThunk.fulfilled, (state, action) => {
      state.productData = action.payload.map((product) => generateProductDataObject(product));

      state.isLoading = false;

      state.error = null;
    });

    builder.addCase(getAllProductThunk.rejected, (state, action) => {
      state.isLoading = true;

      state.error = action.payload as string;
    });
  }
});

export default getAllProductSlice.reducer;
