import { createSlice } from "@reduxjs/toolkit";

export const OrderSummarySlice = createSlice({
  name: "OrderSummary",
  initialState: {
    OrderSummary: {},
    loading: false,
  },
  reducers: {
    ORDER_SUMMARY_REQUEST: (state) => {
      state.loading = true;
    },
    ORDER_SUMMARY_SUCCESS: (state, action) => {
      state.loading = false;
      state.OrderSummary = action.payload;
    },
    ORDER_SUMMARY_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
  CLEAR_ERRORS,
} = OrderSummarySlice.actions;

export default OrderSummarySlice.reducer;
