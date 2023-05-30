import { RootState } from 'redux/store';

export const getAllStoreLocatorSelector = (state: RootState) => state.getAllStoreLocatorReducer;

export const getStoreLocatorByIdSelector = (state: RootState) => state.getStoreByIdReducer;

export const removeWorkingHourSelector = (state: RootState) => state.removeWorkingHourReducer;
