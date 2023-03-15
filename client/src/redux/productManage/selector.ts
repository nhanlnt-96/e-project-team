import { RootState } from 'redux/store';

export const productDataSelector = (state: RootState) => state.getAllProductReducer;