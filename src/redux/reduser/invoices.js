import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
  },
  reducers: {
    INVOICE_REQUEST: (state) => {
      state.loading = true;
      state.invoices = [];
    },
    INVOICE_SUCCESSS: (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    },
    INVOICE_FAIL: (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    },
  },
});

export const { INVOICE_REQUEST, INVOICE_SUCCESSS, INVOICE_FAIL } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
