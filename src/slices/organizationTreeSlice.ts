import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchOrganization} from "../app/api";
import {AppThunk, RootState} from "../app/store";
// import { RootState, AppThunk } from '../../app/store';
// import { fetchCount } from './counterAPI';
enum AppStatus {
    IDLE,
    LOADING,
    FAILED,
}

const initialState: OrganizationTreeState = {
    value: 0,
    status: AppStatus.IDLE,
    employees: [],
};

export const fetchOrganizationTree = createAsyncThunk(
    'organizationTree/fetchOrganizationTree',
    async () => {
        const response = await fetchOrganization();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const organizationTreeSlice = createSlice({
    name: 'organizationTree',
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizationTree.pending, (state) => {
                state.status = AppStatus.LOADING;
            })
            .addCase(fetchOrganizationTree.fulfilled, (state, action) => {
                state.status = AppStatus.IDLE;
                state.employees = action.payload;
            })
            .addCase(fetchOrganizationTree.rejected, (state) => {
                state.status = AppStatus.FAILED;
            });
    },
});

export const { addNode } = organizationTreeSlice.actions;
export const selectEmployees = (state: RootState) => state.organizationTree.employees;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectCount(getState());
//             if (currentValue % 2 === 1) {
//                 dispatch(incrementByAmount(amount));
//             }
//         };

export default organizationTreeSlice.reducer;