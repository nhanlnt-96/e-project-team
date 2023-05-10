import { RootState } from 'redux/store';

export const registerSelector = (state: RootState) => state.registerReducer;

export const loginSelector = (state: RootState) => state.loginReducer;

export const getAuthSelector = (state: RootState) => state.getAuthReducer;

export const updateAccountSelector = (state: RootState) => state.updateAccountReducer;

export const verifyEmailSelector = (state: RootState) => state.verifyEmailReducer;
