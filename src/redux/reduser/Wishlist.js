import {
  ALL_WISHLIST_FAIL,
  ALL_WISHLIST_REQUEST,
  ALL_WISHLIST_SUCCESS,
  CLEAR_ERRORS,
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
} from "../constant/Wishlist";

export const wishlistReducer = (state = { wishlists: [] }, action) => {
  switch (action.type) {
    case ALL_WISHLIST_REQUEST:
      return {
        loading: true,
        wishlists: [],
      };
    case ALL_WISHLIST_SUCCESS:
      return {
        loading: false,
        wishlists: action.payload,
      };
    case ALL_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.wishlist,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//  add product to wishlist reducer

export const addWishlistReducer = (state = { wishlist: {} }, action) => {
  switch (action.type) {
    case ADD_WISHLIST_REQUEST:
      return {
        loading: true,
      };
    case ADD_WISHLIST_SUCCESS:
      return {
        loading: false,
        isAdded: action.payload,
      };
    case ADD_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// remove product from wishlist reducer

export const removeWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_WISHLIST_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_WISHLIST_SUCCESS:
      return {
        loading: false,
        isRemoved: action.payload,
      };
    case REMOVE_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
