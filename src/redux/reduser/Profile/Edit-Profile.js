import { createSlice } from "@reduxjs/toolkit";

export const EditProfileSlice = createSlice({
  name: "EditProfile",
  initialState: {
    EditProfile: {},
  },
  reducers: {
    EDIT_PROFILE_REQUEST: (state) => {
      state.loading = true;
      state.EditProfile = {};
    },
    EDIT_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.EditProfile = action.payload;
    },
    EDIT_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.EditProfile = action.payload;
    },
  },
});

export const { EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL } =
  EditProfileSlice.actions;

export default EditProfileSlice.reducer;
