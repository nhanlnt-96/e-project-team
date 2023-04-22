import { toast } from 'react-toastify';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { removeProductQuantityService } from 'services/product';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IRemoveProductQuantitySlice {
  isSuccess: boolean;
  isRemoving: boolean;
  error: string | null;
}

interface IPayload {
  quantityId: number;
  productId: number;
}

const initialState: IRemoveProductQuantitySlice = {
  isSuccess: false,
  isRemoving: false,
  error: null
};

export const removeProductQuantityThunk = createAsyncThunk(
  'productManage/removeProductQuantity',
  async ({ quantityId, productId }: IPayload, thunkAPI) => {
    try {
      const response = await removeProductQuantityService(quantityId);
      if (response) {
        thunkAPI.dispatch(getProductByIdThunk(productId));
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeProductQuantitySlice = createSlice({
  name: 'productManage/removeProductQuantity',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeProductQuantityThunk.pending, (state) => {
      state.isRemoving = true;

      state.error = null;
    });

    builder.addCase(removeProductQuantityThunk.fulfilled, (state) => {
      toast.success('Product quantity is removed.');

      state.isRemoving = false;

      state.isSuccess = true;
    });

    builder.addCase(removeProductQuantityThunk.rejected, (state, action) => {
      toast.error(action.payload as string);

      state.isRemoving = false;

      state.isSuccess = false;

      state.error = action.payload as string;
    });
  }
});

export default removeProductQuantitySlice.reducer;
