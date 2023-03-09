import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import organizationTreeSliceReducer, { fetchOrganizationTree } from '../slices/organizationTreeSlice'

export const store = configureStore({
  reducer: {
    organizationTree: organizationTreeSliceReducer
  }
})

store.dispatch(fetchOrganizationTree())

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
