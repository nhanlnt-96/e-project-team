import { RootState } from 'redux/store';

export const getAllNewsSelector = (state: RootState) => state.getAllNewsReducer;
