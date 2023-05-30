import { generateProductDataObject } from 'redux/productManage/utils';
import { IProductData } from 'services/product';
import { getProductFavoriteService } from 'services/productFavorite';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IProductFavoriteSlice {
  isLoading: boolean;
  error: string | null;
  productFavoriteData: IProductData[];
}

const initialState: IProductFavoriteSlice = {
  isLoading: false,
  error: null,
  productFavoriteData: []
};

export const getProductFavoriteThunk = createAsyncThunk('productFavorite/getProductFavorite', async () => {
  return await getProductFavoriteService();
});

const getProductFavoriteSlice = createSlice({
  name: 'productFavorite/getProductFavorite',
  initialState: initialState,
  reducers: {
    resetProductFavorite: (state) => {
      state.productFavoriteData = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductFavoriteThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getProductFavoriteThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.productFavoriteData = action.payload.productDtoList.map((product: any) => generateProductDataObject(product));
    });

    builder.addCase(getProductFavoriteThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export const { resetProductFavorite } = getProductFavoriteSlice.actions;

export default getProductFavoriteSlice.reducer;
