import { RootState } from 'redux/store';

export const categoryDataSelector = (state: RootState) => state.getAllCategoryReducer;