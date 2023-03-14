import { getAllCategoryService, ICategoryData } from 'services/category';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ICategoryDataResponse extends ICategoryData {
  key: string;
}

interface IGetAllCategorySlice {
  categoryData: ICategoryDataResponse[];
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
      state.categoryData = action.payload.map((category) => ({
        ...category,
        key: String(category.categoryId)
      }));

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