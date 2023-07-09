import { createSlice } from "@reduxjs/toolkit";

export const BulkUploadProductToDBSlice = createSlice({
  name: "BulkUploadProductsToDB",
  initialState: {
    BulkUploadProductsToDB: [],
  },
  reducers: {
    BULK_UPLOAD_TODB_REQUEST: (state) => {
      state.loading = true;
      state.BulkUploadProductsToDB = [];
    },
    BULK_UPLOAD_TODB_SUCCESS: (state, action) => {
      state.loading = false;
      state.BulkUploadProductsToDB = action.payload;
    },
    BULK_UPLOAD_TODB_FAIL: (state, action) => {
      state.loading = false;
      state.BulkUploadProductsToDB = action.payload;
    },
  },
});

export const {
  BULK_UPLOAD_TODB_REQUEST,
  BULK_UPLOAD_TODB_SUCCESS,
  BULK_UPLOAD_TODB_FAIL,
} = BulkUploadProductToDBSlice.actions;
export default BulkUploadProductToDBSlice.reducer;
