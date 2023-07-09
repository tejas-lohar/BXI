import { createSlice } from "@reduxjs/toolkit";

export const LastSeenSlice = createSlice({
  name: "LastSeen",
  initialState: {
    LastSeen: {},
  },
  reducers: {
    LASTSEEN_REQUEST: (state) => {
      state.loading = true;
      state.LastSeen = {};
    },
    LASTSEEN_SUCCESS: (state, action) => {
      state.loading = false;
      state.LastSeen = action.payload;
    },
    LASTSEEN_FAIL: (state, action) => {
      state.loading = false;
      state.LastSeen = action.payload;
    },
  },
});

export const { LASTSEEN_REQUEST, LASTSEEN_SUCCESS, LASTSEEN_FAIL } =
  LastSeenSlice.actions;

export default LastSeenSlice.reducer;