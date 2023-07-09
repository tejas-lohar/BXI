//  company details reducer

import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    company: [],
    loading: false,
    error: null,
  },
  reducers: {
    GET_COMPANY_REQUEST: (state) => {
      state.loading = true;
    },
    GET_COMPANY_SUCCESS: (state, action) => {
      state.loading = false;

      state.company = action.payload;
    },
    GET_COMPANY_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const companyByIdSlice = createSlice({
  name: "companyById",
  initialState: {
    companyById:{},
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
  },
});

export const {
  COMPANY_BY_ID_REQUEST,
  COMPANY_BY_ID_SUCCESS,
  COMPANY_BY_ID_FAIL,
  CLEAR_ERRORS,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAIL,
} = companyByIdSlice.actions;
