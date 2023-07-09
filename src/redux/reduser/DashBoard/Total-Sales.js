import { createSlice } from "@reduxjs/toolkit";

export const TotalSalesSlice = createSlice({
  name: "TotalSales",
  initialState: {
    TotalSales: {},
  },
  reducers: {
    TOTAL_SALES_REQUEST: (state) => {
      state.loading = true;
      state.TotalSales = {};
    },
    TOTAL_SALES_SUCCESS: (state, action) => {
      state.loading = false;
      state.TotalSales = action.payload;
    },
    TOTAL_SALES_FAIL: (state, action) => {
      state.loading = false;
      state.TotalSales = action.payload;
    },
  },
});

export const { TOTAL_SALES_REQUEST, TOTAL_SALES_SUCCESS, TOTAL_SALES_FAIL } =
  TotalSalesSlice.actions;

export default TotalSalesSlice.reducer;
