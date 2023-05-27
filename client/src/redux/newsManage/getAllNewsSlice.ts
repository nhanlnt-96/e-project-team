import { News } from 'constants/index';
import { generateNewsDataObject, getAllNewsService, INewsData } from 'services/news';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IGetAllNewsSlice {
  isLoading: boolean;
  error: string | null;
  allNewsData: INewsData[];
  aboutUsData: INewsData[];
  newsData: INewsData[];
}

const initialState: IGetAllNewsSlice = {
  isLoading: false,
  error: null,
  allNewsData: [],
  aboutUsData: [],
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

      state.allNewsData = action.payload.map((news: any) => generateNewsDataObject(news));

      state.newsData = action.payload.filter((news: any) => news.isAboutUsNews === News.IS_NEWS)?.map((news: any) => generateNewsDataObject(news));

      state.aboutUsData = action.payload
        .filter((news: any) => news.isAboutUsNews === News.IS_ABOUT_US_NEWS)
        ?.map((news: any) => generateNewsDataObject(news));

      state.error = null;
    });

    builder.addCase(getAllNewsThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload as string;
    });
  }
});

export default getAllNewsSlice.reducer;
