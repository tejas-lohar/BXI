import { createSlice } from "@reduxjs/toolkit";

export const PurchaseSalesSlice = createSlice({
  name: "Purchase",
  initialState: {
    Purchase: {},
  },
  reducers: {
    PURCHASE_SALES_REQUEST: (state) => {
      state.loading = true;
      state.Purchase = {};
    },
    PURCHASE_SALES_SUCCESS: (state, action) => {
      state.loading = false;
      state.Purchase = action.payload;
    },
    PURCHASE_SALES_FAIL: (state, action) => {
      state.loading = false;
      state.Purchase = action.payload;
    },
  },
});

export const {
  PURCHASE_SALES_REQUEST,
  PURCHASE_SALES_SUCCESS,
  PURCHASE_SALES_FAIL,
} = PurchaseSalesSlice.actions;

export default PurchaseSalesSlice.reducer;
