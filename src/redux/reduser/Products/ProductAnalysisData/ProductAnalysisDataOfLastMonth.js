import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisOfLastMonth = createSlice({
  name: "ProductAnalysisOfLastMonth",
  initialState: {
    ProductAnalysisOfLastMonth: [],
  },
  reducers: {
    PRODUCT_ANALYSIS_LASTMONTH_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisOfLastMonth = [];
    },
    PRODUCT_ANALYSIS_LASTMONTH_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastMonth = action.payload;
    },
    PRODUCT_ANALYSIS_LASTMONTH_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastMonth = action.payload;
    },
  },
});

export const {
    PRODUCT_ANALYSIS_LASTMONTH_REQUEST,
    PRODUCT_ANALYSIS_LASTMONTH_SUCCESS,
    PRODUCT_ANALYSIS_LASTMONTH_FAIL,
} = ProductAnalysisOfLastMonth.actions;
export default ProductAnalysisOfLastMonth.reducer;
