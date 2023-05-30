import { toast } from 'react-toastify';
import { getCurrentCartThunk } from 'redux/cartManage/getCurrentCartSlice';
import { IRemoveFromCart, removeFromCartService } from 'services/cart';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IRemoveFromCartSlice {
  isLoading: boolean;
  isRemoveSuccess: boolean;
  error: string | null;
}

const initialState: IRemoveFromCartSlice = {
  isLoading: false,
  isRemoveSuccess: false,
  error: null
};

export const removeFromCartThunk = createAsyncThunk(
  'cartManage/removeFromCart',
  async (removeFromCartData: IRemoveFromCart, { dispatch, rejectWithValue }) => {
    try {
      const response = await removeFromCartService(removeFromCartData);
      if (response) {
        toast.success('Removed product from cart');

        dispatch(getCurrentCartThunk());

        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const removeFromCartSlice = createSlice({
  name: 'cartManage/removeFromCart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeFromCartThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(removeFromCartThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.isRemoveSuccess = true;
    });

    builder.addCase(removeFromCartThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default removeFromCartSlice.reducer;
