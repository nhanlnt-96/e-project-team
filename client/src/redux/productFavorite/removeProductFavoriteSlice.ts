import { toast } from 'react-toastify';
import { getProductFavoriteThunk } from 'redux/productFavorite/getProductFavoriteSlice';
import { removeProductFavoriteService } from 'services/productFavorite';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IRemoveProductFavoriteSlice {
  isLoading: boolean;
  error: string | null;
  isRemoved: boolean;
}

const initialState: IRemoveProductFavoriteSlice = {
  isRemoved: false,
  error: null,
  isLoading: false
};

export const removeProductFavoriteThunk = createAsyncThunk(
  'productFavorite/removeProductFavorite',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await removeProductFavoriteService(productId);
      if (response) {
        toast.success('Removed product to favorite');

        dispatch(getProductFavoriteThunk());
      }
    } catch (error) {
      toast.error(error as string);

      return rejectWithValue(error);
    }
  }
);

const removeProductFavoriteSlice = createSlice({
  name: 'productFavorite/removeProductFavorite',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeProductFavoriteThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;

      state.isRemoved = false;
    });

    builder.addCase(removeProductFavoriteThunk.fulfilled, (state) => {
      state.isLoading = false;

      state.isRemoved = true;
    });

    builder.addCase(removeProductFavoriteThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default removeProductFavoriteSlice.reducer;
