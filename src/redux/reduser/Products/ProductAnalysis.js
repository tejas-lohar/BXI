import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisSlice = createSlice({
  name: "ProductAnalysis",
  initialState: {
    ProductAnalysis: [],
  },
  reducers: {
    PRODUCT_ANAYLSIS_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysis = [];
    },
    PRODUCT_ANAYLSIS_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysis = action.payload;
    },
    PRODUCT_ANAYLSIS_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysis = action.payload;
    },
  },
});

export const {
    PRODUCT_ANAYLSIS_REQUEST,
    PRODUCT_ANAYLSIS_SUCCESS,
    PRODUCT_ANAYLSIS_FAIL,
} = ProductAnalysisSlice.actions;
export default ProductAnalysisSlice.reducer;
