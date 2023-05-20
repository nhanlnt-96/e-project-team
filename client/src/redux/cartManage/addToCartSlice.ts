import { toast } from 'react-toastify';
import { getCurrentCartThunk } from 'redux/cartManage/getCurrentCartSlice';
import { generateCartDataObject } from 'redux/cartManage/utils';
import { addToCartService, IAddToCartData, ICartData } from 'services/cart';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IAddToCartSlice {
  isLoading: boolean;
  cartData: ICartData | null;
  error: string | null;
}

const initialState: IAddToCartSlice = {
  isLoading: false,
  cartData: null,
  error: null
};

export const addToCartThunk = createAsyncThunk(
  'cartManage/addToCart',
  async (
    addToCartData: IAddToCartData & {
      isUpdateCart?: boolean;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await addToCartService(addToCartData);
      if (response) {
        if (!addToCartData.isUpdateCart) toast.success('Added product to cart');

        dispatch(getCurrentCartThunk());

        return response;
      }
    } catch (error) {
      toast.error(error as string);

      return rejectWithValue(error);
    }
  }
);

const addToCartSlice = createSlice({
  name: 'cartManage/addToCart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.cartData = generateCartDataObject(action.payload);
    });

    builder.addCase(addToCartThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default addToCartSlice.reducer;
