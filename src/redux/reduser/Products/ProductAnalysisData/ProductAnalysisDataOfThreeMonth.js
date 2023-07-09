import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisOfLastThreeMonth = createSlice({
  name: "ProductAnalysisOfLastThreeMonth",
  initialState: {
    ProductAnalysisOfLastThreeMonth: [],
  },
  reducers: {
    PRODUCT_ANALYSIS_LAST_THREEMONTH_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisOfLastThreeMonth = [];
    },
    PRODUCT_ANALYSIS_LAST_THREEMONTH_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastThreeMonth = action.payload;
    },
    PRODUCT_ANALYSIS_LAST_THREEMONTH_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastThreeMonth = action.payload;
    },
  },
});

export const {
    PRODUCT_ANALYSIS_LAST_THREEMONTH_REQUEST,
    PRODUCT_ANALYSIS_LAST_THREEMONTH_SUCCESS,
    PRODUCT_ANALYSIS_LAST_THREEMONTH_FAIL,
} = ProductAnalysisOfLastThreeMonth.actions;
export default ProductAnalysisOfLastThreeMonth.reducer;
