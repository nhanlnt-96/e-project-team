import { generateNewsDataObject, getAllNewsService, INewsData } from 'services/news';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetAllNewsSlice {
  isLoading: boolean;
  error: string | null;
  newsData: INewsData[];
}

const initialState: IGetAllNewsSlice = {
  isLoading: false,
  error: null,
  newsData: []
};

export const getAllNewsThunk = createAsyncThunk('newsManage/getAllNews', async () => {
  return await getAllNewsService();
});

const getAllNewsSlice = createSlice({
  name: 'newsManage/getAllNews',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNewsThunk.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });

    builder.addCase(getAllNewsThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.newsData = action.payload.map((news) => generateNewsDataObject(news));

      state.error = null;
    });

    builder.addCase(getAllNewsThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getAllNewsSlice.reducer;
