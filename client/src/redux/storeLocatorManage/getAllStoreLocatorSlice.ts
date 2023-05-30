import {generateStoreLocatorObjectData} from 'redux/storeLocatorManage/utils';
import {getAllStoreLocatorService} from 'services/storeLocatorManage';
import {IStoreLocatorData} from 'services/storeLocatorManage/types';

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface IGetAllStoreLocatorSlice {
    storeLocatorData: IStoreLocatorData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IGetAllStoreLocatorSlice = {
    storeLocatorData: [],
    isLoading: false,
    error: null
};

export const getAllStoreLocatorThunk = createAsyncThunk('storeLocatorManage/getAllStoreLocator', async () => {
    return await getAllStoreLocatorService();
});

export const getAllStoreLocatorSlice = createSlice({
    name: 'storeLocatorManage/getAllStoreLocator',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllStoreLocatorThunk.pending, (state) => {
            state.isLoading = true;

            state.error = null;
        });

        builder.addCase(getAllStoreLocatorThunk.fulfilled, (state, action) => {
            state.storeLocatorData = action.payload.map((store: any) => generateStoreLocatorObjectData(store));

            state.isLoading = false;

            state.error = null;
        });

        builder.addCase(getAllStoreLocatorThunk.rejected, (state, action) => {
            state.isLoading = true;

            state.error = action.payload as string;
        });
    }
});

export default getAllStoreLocatorSlice.reducer;
