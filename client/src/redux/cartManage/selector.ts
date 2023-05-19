import { RootState } from 'redux/store';

export const getCurrentCartSelector = (state: RootState) => state.getCurrentCartReducer;

export const addToCartSelector = (state: RootState) => state.addToCartReducer;
