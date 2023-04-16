import { RootState } from 'redux/store';

export const productDataSelector = (state: RootState) => state.getAllProductReducer;

export const productDetailSelector = (state: RootState) => state.getProductByIdReducer;

export const removeProductImageSelector = (state: RootState) => state.removeProductImageReducer;
