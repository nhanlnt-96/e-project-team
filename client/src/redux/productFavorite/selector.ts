import { RootState } from 'redux/store';

export const getProductFavoriteSelector = (state: RootState) => state.getProductFavoriteReducer;

export const addProductFavoriteSelector = (state: RootState) => state.addProductFavoriteReducer;

export const removeProductFavoriteSelector = (state: RootState) => state.removeProductFavoriteReducer;
