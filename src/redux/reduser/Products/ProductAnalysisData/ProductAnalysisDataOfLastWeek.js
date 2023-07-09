import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisOfLastWeek = createSlice({
  name: "ProductAnalysisOfLastWeek",
  initialState: {
    ProductAnalysisOfLastWeek: [],
  },
  reducers: {
    PRODUCT_ANALYSIS_LASTWEEK_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisOfLastWeek = [];
    },
    PRODUCT_ANALYSIS_LASTWEEK_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastWeek = action.payload;
    },
    PRODUCT_ANALYSIS_LASTWEEK_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastWeek = action.payload;
    },
  },
});

export const {
    PRODUCT_ANALYSIS_LASTWEEK_REQUEST,
    PRODUCT_ANALYSIS_LASTWEEK_SUCCESS,
    PRODUCT_ANALYSIS_LASTWEEK_FAIL,
} = ProductAnalysisOfLastWeek.actions;
export default ProductAnalysisOfLastWeek.reducer;
