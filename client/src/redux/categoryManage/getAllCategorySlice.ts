import { getAllCategoryService, ICategoryData } from 'services/category';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetAllCategorySlice {
  categoryData: ICategoryData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetAllCategorySlice = {
  categoryData: [],
  isLoading: false,
  error: null
};

export const getAllCategoryThunk = createAsyncThunk('categoryManage/fetchAllCategory', async () => {
  return await getAllCategoryService();
});

export const getAllCategorySlice = createSlice({
  name: 'categoryManage/getAllCategory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategoryThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getAllCategoryThunk.fulfilled, (state, action) => {
      state.categoryData = action.payload;

      state.isLoading = false;

      state.error = null;
    });

    builder.addCase(getAllCategoryThunk.rejected, (state, action) => {
      state.isLoading = true;

      state.error = action.payload as string;
    });
  }
});

export default getAllCategorySlice.reducer;