import { createSlice } from "@reduxjs/toolkit";

export const UpdateCompanyPreferenceSlice = createSlice({
  name: "UpdateCompanyData",
  initialState: {
    UpdateCompanyData: [],
  },
  reducers: {
    UPDATE_COMPANY_DATA_REQUEST: (state) => {
      state.loading = true;
      state.UpdateCompanyData = [];
    },
    UPDATE_COMPANY_DATA_SUCCESS: (state, action) => {
      state.loading = false;
      state.UpdateCompanyData = action.payload;
    },
    UPDATE_COMPANY_DATA_FAIL: (state, action) => {
      state.loading = false;
      state.UpdateCompanyData = action.payload;
    },
  },
});

export const {
  UPDATE_COMPANY_DATA_REQUEST,
  UPDATE_COMPANY_DATA_SUCCESS,
  UPDATE_COMPANY_DATA_FAIL,
} = UpdateCompanyPreferenceSlice.actions;
