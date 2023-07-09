//  redux reducer for MemberDetails
import {
  MEMBER_DETAILS_REQUEST,
  MEMBER_DETAILS_SUCCESS,
  MEMBER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constant/MemberDetails";

const initialState = {
  memberDetails: [],
  loading: false,
  error: null,
};

export const memberDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEMBER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        memberDetails: action.payload,
      };
    case MEMBER_DETAILS_FAIL:
      return {
        ...state,
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
