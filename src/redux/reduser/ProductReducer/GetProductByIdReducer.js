import { createSlice } from "@reduxjs/toolkit";

export const GetProductByIdSlice = createSlice({
  name: "GetProductById",
  initialState: {
    GetProductByIdDatas: {},
    GetProductByIdStatus: "idle",
    GetProductByIdError: null,
  },
  reducers: {
    GetProductByIdRequested: (state, action) => {
      state.GetProductByIdStatus = "loading";
    },
    GetProductByIdReceived: (state, action) => {
      state.GetProductByIdStatus = "succeeded";
      state.GetProductByIdDatas = action.payload;
    },
    GetProductByIdRequestFailed: (state, action) => {
      state.GetProductByIdStatus = "failed";
      state.GetProductByIdDatas = action.payload;
    },
  },
});

export const {
  GetProductByIdRequested,
  GetProductByIdReceived,
  GetProductByIdRequestFailed,
} = GetProductByIdSlice.actions;
