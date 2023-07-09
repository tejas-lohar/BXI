import { createSlice } from "@reduxjs/toolkit";

export const GetLastSeenSlice = createSlice({
  name: "GetLastSeen",
  initialState: {
    GetLastSeen: {},
  },
  reducers: {
    GET_LASTSEEN_REQUEST: (state) => {
      state.loading = true;
      state.GetLastSeen = {};
    },
    GET_LASTSEEN_SUCCESS: (state, action) => {
      state.loading = false;
      state.GetLastSeen = action.payload;
    },
    GET_LASTSEEN_FAIL: (state, action) => {
      state.loading = false;
      state.GetLastSeen = action.payload;
    },
  },
});

export const { GET_LASTSEEN_REQUEST, GET_LASTSEEN_SUCCESS, GET_LASTSEEN_FAIL } =
  GetLastSeenSlice.actions;

export default GetLastSeenSlice.reducer;