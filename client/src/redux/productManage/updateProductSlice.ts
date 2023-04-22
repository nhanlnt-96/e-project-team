import { toast } from 'react-toastify';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { IUpdateProductData, updateProductService } from 'services/product';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUpdateProductSlice {
  isSuccess: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: IUpdateProductSlice = {
  isSuccess: false,
  isUpdating: false,
  error: null
};

export const updateProductThunk = createAsyncThunk('productManage/updateProduct', async (updateData: IUpdateProductData, thunkAPI) => {
  try {
    const response = await updateProductService(updateData);
    if (response) {
      thunkAPI.dispatch(getProductByIdThunk(updateData.productId));

      thunkAPI.dispatch(getAllProductThunk());
    }

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateProductSlice = createSlice({
  name: 'productManage/updateProduct',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProductThunk.pending, (state) => {
      state.isUpdating = true;

      state.error = null;
    });

    builder.addCase(updateProductThunk.fulfilled, (state) => {
      toast.success('Product is updated.');

      state.isUpdating = false;

      state.isSuccess = true;
    });

    builder.addCase(updateProductThunk.rejected, (state, action) => {
      toast.error(action.payload as string);

      state.isUpdating = false;

      state.isSuccess = false;

      state.error = action.payload as string;
    });
  }
});

export default updateProductSlice.reducer;
