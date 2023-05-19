import { generateCartDataObject } from 'redux/cartManage/utils';
import { getCurrentCartService, ICartData } from 'services/cart';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetCurrentCartSlice {
  isLoading: boolean;
  cartData: ICartData | null;
  error: string | null;
}

const initialState: IGetCurrentCartSlice = {
  isLoading: false,
  cartData: null,
  error: null
};

export const getCurrentCartThunk = createAsyncThunk('cartManage/getCurrentCart', async (_, { rejectWithValue }) => {
  try {
    return await getCurrentCartService();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getCurrentCartSlice = createSlice({
  name: 'cartManage/getCurrentCart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentCartThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getCurrentCartThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.cartData = generateCartDataObject(action.payload);
    });

    builder.addCase(getCurrentCartThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getCurrentCartSlice.reducer;
