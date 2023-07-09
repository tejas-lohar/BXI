import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisOfLastFiveYear = createSlice({
  name: "ProductAnalysisOfLastFiveYear",
  initialState: {
    ProductAnalysisOfLastFiveYear: [],
  },
  reducers: {
    PRODUCT_ANALYSIS_LAST_FIVEYERA_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisOfLastFiveYear = [];
    },
    PRODUCT_ANALYSIS_LAST_FIVEYERA_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastFiveYear = action.payload;
    },
    PRODUCT_ANALYSIS_LAST_FIVEYERA_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastFiveYear = action.payload;
    },
  },
});

export const {
    PRODUCT_ANALYSIS_LAST_FIVEYERA_REQUEST,
    PRODUCT_ANALYSIS_LAST_FIVEYERA_SUCCESS,
    PRODUCT_ANALYSIS_LAST_FIVEYERA_FAIL,
} = ProductAnalysisOfLastFiveYear.actions;
export default ProductAnalysisOfLastFiveYear.reducer;
