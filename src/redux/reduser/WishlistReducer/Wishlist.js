import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    wishlist_Request: (state) => {
      state.loading = true;
      state.wishlist = [];
    },
    wishlist_Success: (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    },
    wishlist_Fail: (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    },
  },
});



export const removeWishlistSlice = createSlice({
  name: "removeWishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    removeWishlist_Request: (state) => {
      state.loading = true;
      state.wishlist = [];
    },
    removeWishlist_Success: (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    },
    removeWishlist_Fail: (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    },
  },
});

export const {
  wishlist_Request,
  wishlist_Success,
  wishlist_Fail,
  addWishlist_Request,
  addWishlist_Success,
  addWishlist_Fail,
  removeWishlist_Request,
  removeWishlist_Success,
  removeWishlist_Fail,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

