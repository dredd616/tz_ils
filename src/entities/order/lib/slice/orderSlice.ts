import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        isLoading: true,
        error: null,
    },
    reducers: {
        fetchOrdersRequest: (state) => {
            state.isLoading = true
        },
        fetchOrdersSuccess: (state, action) => {
            return {
                orders: action.payload,
                isLoading: false,
                error: null,
            }
        },
        fetchOrdersFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
});

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions