import { createSlice } from "@reduxjs/toolkit";

export const ListedProductsByCompanySlice = createSlice({
  name: "ListedProductsByCompany",
  initialState: {
    ListedProductsByCompanyData: [],
    ListedProductsByCompanyStatus: "idle",
    ListedProductsByCompanyError: null,
  },
  reducers: {
    ListedProductsByCompanyRequested: (state, action) => {
      state.loadingListedProduct = true;
      state.ListedProductsByCompanyStatus = "loading";
      state.loadingforReq = true;
    },
    ListedProductsByCompanyReceived: (state, action) => {
      state.loadingListedProduct = false;
      state.ListedProductsByCompanyStatus = "succeeded";
      state.ListedProductsByCompanyData = action.payload;
      state.loadingforReq = false;
    },
    ListedProductsByCompanyRequestFailed: (state, action) => {
      state.loadingListedProduct = false;
      state.ListedProductsByCompanyStatus = "failed";
      state.ListedProductsByCompanyError = action.payload;
      state.loadingforReq = false;
    },
  },
});

export const ListedDraftProductsByCompanySlice = createSlice({
  name: "ListedDraftProductsByCompany",
  initialState: {
    ListedDraftProductsByCompanyData: [],
    ListedDraftProductsByCompanyStatus: "idle",
    ListedDraftProductsByCompanyError: null,
  },
  reducers: {
    ListedDraftProductsByCompanyRequested: (state, action) => {
      state.loadingListedDraft = true;
      state.ListedDraftProductsByCompanyStatus = "loading";
      state.loadingfordraft = true;
    },
    ListedDraftProductsByCompanyReceived: (state, action) => {
      state.loadingListedDraft = false;
      state.ListedDraftProductsByCompanyStatus = "succeeded";
      state.ListedDraftProductsByCompanyData = action.payload;
      state.loadingfordraft = false;
    },
    ListedDraftProductsByCompanyRequestFailed: (state, action) => {
      state.loadingListedDraft = false;
      state.ListedDraftProductsByCompanyStatus = "failed";
      state.ListedDraftProductsByCompanyError = action.payload;
      state.loadingfordraft = false;
    },
  },
});

export const AllListedProductByCompanySlice = createSlice({
  name: "AllListedProductByCompany",
  initialState: {
    AllListedProductByCompanyData: [],
    AllListedProductByCompanyStatus: "idle",
    AllListedProductByCompanyError: null,
  },
  reducers: {
    AllListedProductByCompanyRequested: (state, action) => {
      state.loadingAllListedProduct = true;
      state.AllListedProductByCompanyStatus = "loading";
      state.loadingforall = true;
    },

    AllListedProductByCompanyReceived: (state, action) => {
      state.loadingAllListedProduct = false;
      state.AllListedProductByCompanyStatus = "succeeded";
      state.AllListedProductByCompanyData = action.payload;
      state.loadingforall = false;
    },
    AllListedProductByCompanyRequestFailed: (state, action) => {
      state.loadingAllListedProduct = false;
      state.AllListedProductByCompanyStatus = "failed";
      state.AllListedProductByCompanyError = action.payload;
      state.loadingforall = false;
    },
  },
});

export const {
  ListedProductsByCompanyRequested,
  ListedProductsByCompanyReceived,
  ListedProductsByCompanyRequestFailed,
} = ListedProductsByCompanySlice.actions;

export const {
  ListedDraftProductsByCompanyRequested,
  ListedDraftProductsByCompanyReceived,
  ListedDraftProductsByCompanyRequestFailed,
} = ListedDraftProductsByCompanySlice.actions;

export const {
  AllListedProductByCompanyRequested,
  AllListedProductByCompanyReceived,
  AllListedProductByCompanyRequestFailed,
} = AllListedProductByCompanySlice.actions;
