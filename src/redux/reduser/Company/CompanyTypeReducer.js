import { createSlice } from "@reduxjs/toolkit";

export const GetCompanyTypeSlice = createSlice({
  name: "CompanyTypeData",
  initialState: {
    CompanyTypeData: [],
  },
  reducers: {
    GET_COMPANY_TYPE_REQUEST: (state) => {
      state.loading = true;
      state.CompanyTypeData = [];
    },
    GET_COMPANY_TYPE_SUCCESS: (state, action) => {
      state.loading = false;
      state.CompanyTypeData = action.payload;
    },
    GET_COMPANY_TYPE_FAIL: (state, action) => {
      state.loading = false;
      state.CompanyTypeData = action.payload;
    },
  },
});



export const {
  GET_COMPANY_TYPE_REQUEST,
  GET_COMPANY_TYPE_SUCCESS,
  GET_COMPANY_TYPE_FAIL,
} = GetCompanyTypeSlice.actions;
