//  get logged company details
import { createSlice } from "@reduxjs/toolkit";

export const GetLoggedCompanySlice = createSlice({
  name: "GetLoggedCompanyData",
  initialState: {
    GetLoggedCompanyData: [],
  },
  reducers: {
    GET_LOGGED_COMPANY_REQUEST: (state) => {
      state.loading = true;
      state.GetLoggedCompanyData = [];
    },
    GET_LOGGED_COMPANY_SUCCESS: (state, action) => {
      state.loading = false;
      state.GetLoggedCompanyData = action.payload;
    },
    GET_LOGGED_COMPANY_FAIL: (state, action) => {
      state.loading = false;
      state.GetLoggedCompanyData = action.payload;
    },
  },
});

export const {
  GET_LOGGED_COMPANY_REQUEST,
  GET_LOGGED_COMPANY_SUCCESS,
  GET_LOGGED_COMPANY_FAIL,
} = GetLoggedCompanySlice.actions;
