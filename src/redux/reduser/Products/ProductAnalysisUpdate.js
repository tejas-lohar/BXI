import { createSlice } from "@reduxjs/toolkit";

export const ProductAnalysisUpdateSlice = createSlice({
  name: "ProductAnalysisUpdate",
  initialState: {
    ProductAnalysisUpdate: {},
  },
  reducers: {
    PRODUCT_ANAYLSISUPDATE_REQUEST: (state) => {
      state.loading = true;
      state.ProductAnalysisUpdate = {};
    },
    PRODUCT_ANAYLSISUPDATE_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProductAnalysisUpdate = action.payload;
    },
    PRODUCT_ANAYLSISUPDATE_FAIL: (state, action) => {
      state.loading = false;
      state.ProductAnalysisUpdate = action.payload;
    },
  },
});

export const {
    PRODUCT_ANAYLSISUPDATE_REQUEST,
    PRODUCT_ANAYLSISUPDATE_SUCCESS,
    PRODUCT_ANAYLSISUPDATE_FAIL,
} = ProductAnalysisUpdateSlice.actions;
export default ProductAnalysisUpdateSlice.reducer;
