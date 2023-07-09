import { createSlice } from "@reduxjs/toolkit";

export const OrderCreateSlice = createSlice({
    name: "OrderCreate",
    initialState: {
        OrderCreate: {},
    },
    reducers: {
        ORDER_CREATE_REQUEST: (state) => {
            state.loading = true;
            state.OrderCreate = {};
        },
        ORDER_CREATE_SUCCESS: (state, action) => {
            state.loading = false;
            state.OrderCreate = action.payload;
        },
        ORDER_CREATE_FAIL: (state, action) => {
            state.loading = false;
            state.OrderCreate = action.payload;
        },
    },
});

export const {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} = OrderCreateSlice.actions;
export default OrderCreateSlice.reducer;
