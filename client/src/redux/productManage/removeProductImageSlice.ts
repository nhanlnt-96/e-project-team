import { toast } from 'react-toastify';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { removeProductImageService } from 'services/product';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IRemoveProductImageSlice {
  isSuccess: boolean;
  isRemoving: boolean;
  error: string | null;
}

interface IPayload {
  imageId: number;
  productId: number;
}

const initialState: IRemoveProductImageSlice = {
  isSuccess: false,
  isRemoving: false,
  error: null
};

export const removeProductImageThunk = createAsyncThunk('productManage/removeProductImage', async ({ imageId, productId }: IPayload, thunkAPI) => {
  try {
    const response = await removeProductImageService(imageId, productId);
    if (response) {
      toast.success('Product image is removed.');

      thunkAPI.dispatch(getProductByIdThunk(productId));
    }

    return response;
  } catch (error) {
    toast.error(error as string);

    return thunkAPI.rejectWithValue(error);
  }
});

export const removeProductImageSlice = createSlice({
  name: 'productManage/removeProductImage',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeProductImageThunk.pending, (state) => {
      state.isRemoving = true;

      state.error = null;
    });

    builder.addCase(removeProductImageThunk.fulfilled, (state) => {
      state.isRemoving = false;

      state.isSuccess = true;
    });

    builder.addCase(removeProductImageThunk.rejected, (state, action) => {
      state.isRemoving = false;

      state.isSuccess = false;

      state.error = action.payload as string;
    });
  }
});

export default removeProductImageSlice.reducer;
