import { configureStore } from '@reduxjs/toolkit';

import getAllCategoryReducer from './categoryManage/getAllCategorySlice';

export const store = configureStore({
  reducer: {
    getAllCategoryReducer: getAllCategoryReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
