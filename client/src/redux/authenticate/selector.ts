import { RootState } from 'redux/store';

export const registerSelector = (state: RootState) => state.registerReducer;

export const loginSelector = (state: RootState) => state.loginReducer;

export const getAuthSelector = (state: RootState) => state.getAuthReducer;
