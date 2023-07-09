import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//  redux reducer for company by id
export const companyByIdReducer = createSlice({
  name: "companyById",
  initialState: {
    companyById: [],
    loading: false,
    error: null,
  },
  reducers: {
    COMPANY_BY_ID_REQUEST: (state) => {
      state.loading = true;
    },
    COMPANY_BY_ID_SUCCESS: (state, action) => {
      state.loading = false;
      state.companyById = action.payload;
    },
    COMPANY_BY_ID_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  COMPANY_BY_ID_REQUEST,
  COMPANY_BY_ID_SUCCESS,
  COMPANY_BY_ID_FAIL,
  CLEAR_ERRORS,
} = companyByIdReducer.actions;

export default companyByIdReducer.reducer;
