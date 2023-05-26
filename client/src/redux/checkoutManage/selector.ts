import { RootState } from 'redux/store';

export const getOrderSelector = (state: RootState) => state.getOrderReducer;
