import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisOfLastSixMonth = createSlice({
  name: "ProductAnalysisOfLastSixMonth",
  initialState: {
    ProductAnalysisOfLastSixMonth: [],
  },
  reducers: {
    PRODUCT_ANALYSIS_LAST_SIXMONTH_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisOfLastSixMonth = [];
    },
    PRODUCT_ANALYSIS_LAST_SIXMONTH_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastSixMonth = action.payload;
    },
    PRODUCT_ANALYSIS_LAST_SIXMONTH_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisOfLastSixMonth = action.payload;
    },
  },
});

export const {
    PRODUCT_ANALYSIS_LAST_SIXMONTH_REQUEST,
    PRODUCT_ANALYSIS_LAST_SIXMONTH_SUCCESS,
    PRODUCT_ANALYSIS_LAST_SIXMONTH_FAIL,
} = ProductAnalysisOfLastSixMonth.actions;
export default ProductAnalysisOfLastSixMonth.reducer;
