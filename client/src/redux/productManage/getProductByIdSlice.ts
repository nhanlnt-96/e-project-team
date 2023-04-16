import { generateProductDataObject } from 'redux/productManage/utils';
import { getProductByIdService, IProductData } from 'services/product';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetProductByIdSlice {
  productData: IProductData | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: IGetProductByIdSlice = {
  productData: null,
  error: null,
  isLoading: false
};

const fetchProductDetail = async (productId: number) => {
  const productData = await getProductByIdService(productId);

  return generateProductDataObject(productData);
};

export const getProductByIdThunk = createAsyncThunk('productManage/fetchProductById', async (productId: number): Promise<IProductData> => {
  return await fetchProductDetail(productId);
});

export const getProductByIdSlice = createSlice({
  name: 'productManage/getProductById',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductByIdThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getProductByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.productData = action.payload;
    });

    builder.addCase(getProductByIdThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getProductByIdSlice.reducer;
