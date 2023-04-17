import { configureStore } from '@reduxjs/toolkit';

import getAllCategoryReducer from './categoryManage/getAllCategorySlice';
import getAllProductReducer from './productManage/getAllProductSlice';
import getProductByIdReducer from './productManage/getProductByIdSlice';
import removeProductImageReducer from './productManage/removeProductImageSlice';
import updateProductReducer from './productManage/updateProductSlice';

export const store = configureStore({
  reducer: {
    getAllCategoryReducer: getAllCategoryReducer,
    getAllProductReducer: getAllProductReducer,
    getProductByIdReducer: getProductByIdReducer,
    removeProductImageReducer: removeProductImageReducer,
    updateProductReducer: updateProductReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
