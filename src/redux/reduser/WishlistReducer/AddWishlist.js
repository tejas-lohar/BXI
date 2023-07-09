import { createSlice } from "@reduxjs/toolkit";

export const addToWishlistSlice = createSlice({
  name: "addWishlist",
  initialState: {
    wishlist: {},
  },
  reducers: {
    addWishlist_Request: (state) => {
      state.loading = true;
      state.error = false;
      state.wishlist = {};
    },
    addWishlist_Success: (state, action) => {
      state.loading = false;
      state.error = false;
      state.wishlist = action.payload;
    },
    addWishlist_Fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.wishlist = action.payload;
    },
  },
});

export const { addWishlist_Request, addWishlist_Success, addWishlist_Fail } =
  addToWishlistSlice.actions;

export default addToWishlistSlice.reducer;
