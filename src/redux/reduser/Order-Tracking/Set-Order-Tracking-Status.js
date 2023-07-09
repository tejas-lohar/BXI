import { createSlice } from "@reduxjs/toolkit";

export const OrderTrackingSlice = createSlice({
  name: "orderTracking",
  initialState: {
    orderTracking: {},
  },
  reducers: {
    ORDER_TRACKING_REQUEST: (state) => {
      state.loading = true;
      state.orderTracking = {};
    },
    ORDER_TRACKING_SUCCESS: (state, action) => {
      state.loading = false;
      state.orderTracking = action.payload;
    },
    ORDER_TRACKING_FAIL: (state, action) => {
      state.loading = false;
      state.orderTracking = action.payload;
    },
  },
});

export const {
  ORDER_TRACKING_REQUEST,
  ORDER_TRACKING_SUCCESS,
  ORDER_TRACKING_FAIL,
} = OrderTrackingSlice.actions;
export default OrderTrackingSlice.reducer;
