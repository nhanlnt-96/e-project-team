import { toast } from 'react-toastify';
import { getProductFavoriteThunk } from 'redux/productFavorite/getProductFavoriteSlice';
import { addProductFavoriteService } from 'services/productFavorite';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IAddProductFavoriteSlice {
  isLoading: boolean;
  error: string | null;
  isAdded: boolean;
}

const initialState: IAddProductFavoriteSlice = {
  isAdded: false,
  error: null,
  isLoading: false
};

export const addProductFavoriteThunk = createAsyncThunk(
  'productFavorite/addProductFavorite',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await addProductFavoriteService(productId);
      if (response) {
        toast.success('Added product to favorite');

        dispatch(getProductFavoriteThunk());
      }
    } catch (error) {
      toast.error(error as string);

      return rejectWithValue(error);
    }
  }
);

const addProductFavoriteSlice = createSlice({
  name: 'productFavorite/addProductFavorite',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductFavoriteThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;

      state.isAdded = false;
    });

    builder.addCase(addProductFavoriteThunk.fulfilled, (state) => {
      state.isLoading = false;

      state.isAdded = true;
    });

    builder.addCase(addProductFavoriteThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default addProductFavoriteSlice.reducer;
