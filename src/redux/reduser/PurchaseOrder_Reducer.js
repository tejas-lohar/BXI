// purchase order reducer
import {
  PURCHASE_ORDER_LIST_REQUEST,
  PURCHASE_ORDER_LIST_SUCCESS,
  PURCHASE_ORDER_LIST_FAIL,
  PURCHASE_ORDER_DETAILS_REQUEST,
  PURCHASE_ORDER_DETAILS_SUCCESS,
  PURCHASE_ORDER_DETAILS_FAIL,
  PURCHASE_ORDER_DELETE_REQUEST,
  PURCHASE_ORDER_DELETE_SUCCESS,
  PURCHASE_ORDER_DELETE_FAIL,
  PURCHASE_ORDER_CREATE_REQUEST,
  PURCHASE_ORDER_CREATE_SUCCESS,
  PURCHASE_ORDER_CREATE_FAIL,
  PURCHASE_ORDER_UPDATE_REQUEST,
  PURCHASE_ORDER_UPDATE_SUCCESS,
  PURCHASE_ORDER_UPDATE_FAIL,
  PURCHASE_ORDER_CREATE_REVIEW_REQUEST,
  PURCHASE_ORDER_CREATE_REVIEW_SUCCESS,
  PURCHASE_ORDER_CREATE_REVIEW_FAIL,
  PURCHASE_ORDER_CREATE_REVIEW_RESET,
} from "../constant/PurchaseOrderConstants";

export const purchaseOrderListReducer = (
  state = { purchaseOrders: [] },
  action
) => {
  switch (action.type) {
    case PURCHASE_ORDER_LIST_REQUEST:
      return {
        loading: true,
        purchaseOrders: [],
      };
    case PURCHASE_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        purchaseOrders: action.payload,
      };
    case PURCHASE_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const purchaseOrderDetailsReducer = (
  state = { purchaseOrder: {} },
  action
) => {
  switch (action.type) {
    case PURCHASE_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        purchaseOrder: action.payload,
      };
    case PURCHASE_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const purchaseOrderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_ORDER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PURCHASE_ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PURCHASE_ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const purchaseOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PURCHASE_ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        purchaseOrder: action.payload,
      };
    case PURCHASE_ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const purchaseOrderUpdateReducer = (
  state = { purchaseOrder: {} },
  action
) => {
  switch (action.type) {
    case PURCHASE_ORDER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PURCHASE_ORDER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        purchaseOrder: action.payload,
      };
    case PURCHASE_ORDER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const purchaseOrderReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_ORDER_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PURCHASE_ORDER_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PURCHASE_ORDER_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PURCHASE_ORDER_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
