import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisOfLastYear = createSlice({
  name: "ProductAnalysisOfLastYear",
  initialState: {
    ProductAnalysisOfLastYear: [],
  },
  reducers: {
    PRODUCT_ANALYSIS_LASTYERA_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisOfLastYear = [];
    },
    PRODUCT_ANALYSIS_LASTYEAR_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastYear = action.payload;
    },
    PRODUCT_ANALYSIS_LASTYEAR_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastYear = action.payload;
    },
  },
});

export const {
    PRODUCT_ANALYSIS_LASTYERA_REQUEST,
    PRODUCT_ANALYSIS_LASTYEAR_SUCCESS,
    PRODUCT_ANALYSIS_LASTYEAR_FAIL,
} = ProductAnalysisOfLastYear.actions;
export default ProductAnalysisOfLastYear.reducer;
