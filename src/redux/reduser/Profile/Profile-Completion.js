import { createSlice } from "@reduxjs/toolkit";

export const ProfileCompletionSlice = createSlice({
  name: "ProfileCompletion",
  initialState: {
    ProfileCompletion: {},
  },
  reducers: {
    PROFILE_COMPLETION_REQUEST: (state) => {
      state.loading = true;
      state.ProfileCompletion = {};
    },
    PROFILE_COMPLETION_SUCCESS: (state, action) => {
      state.loading = false;
      state.ProfileCompletion = action.payload;
    },
    PROFILE_COMPLETION_FAIL: (state, action) => {
      state.loading = false;
      state.ProfileCompletion = action.payload;
    },
  },
});

export const {
  PROFILE_COMPLETION_REQUEST,
  PROFILE_COMPLETION_SUCCESS,
  PROFILE_COMPLETION_FAIL,
} = ProfileCompletionSlice.actions;

export default ProfileCompletionSlice.reducer;
