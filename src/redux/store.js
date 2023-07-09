import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reduser/Home-Filter/products";

// Chats Reducers
import chatReducer from "./reduser/Chat/All-Chats";
import newChatReducer from "./reduser/Chat/Create-Chat";
import createQueryReducer from "./reduser/Chat/Create-Query";
import getMassagesReducer from "./reduser/Chat/Get-Massages";
import getFilesReducer from "./reduser/Chat/GetFiles";
import GetLastSeenReducer from "./reduser/Chat/GetLastSeen";
import LastSeenReducer from "./reduser/Chat/LastSeen";
import searchChatReducer from "./reduser/Chat/SearchChat";
import sendMassagesReducer from "./reduser/Chat/Send-Massages";
import sendFilesReducer from "./reduser/Chat/SendFiles";
import ProductAnalysisReducer from "./reduser/Products/ProductAnalysis";
import ProductAnalysisUpdateReducer from "./reduser/Products/ProductAnalysisUpdate";
import ProductAnalysisDataOfLastWeekReducer from "./reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastWeek";
import ProductAnalysisDataOfLastMonthReducer from "./reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastMonth";
import ProductAnalysisDataOfThreeMonthReducer from "./reduser/Products/ProductAnalysisData/ProductAnalysisDataOfThreeMonth";
import ProductAnalysisDataOfSixMonthReducer from "./reduser/Products/ProductAnalysisData/ProductAnalysisDataOfSixMonth";
import ProductAnalysisDataOfLastYearReducer from "./reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastYear";
import ProductAnalysisDataOfLastFiveYearsReducer from "./reduser/Products/ProductAnalysisData/ProductAnalysisDataOfLastFiveYears";
import createOrderReducer from "./reduser/PaymentGetway/CreateOrder";
import paymentVerifieReducer from "./reduser/PaymentGetway/PaymentVerifie";

import getNotificationReducer from "./reduser/Notification/getNotications";
import notificationReducer from "./reduser/Notification/notification";

import { removeWishlistReducer } from "./reduser/Wishlist";

import OrderSummarySlice from "./reduser/OrderSummary";
import addToWishlistReducer from "./reduser/WishlistReducer/AddWishlist";
import wishlistReducer from "./reduser/WishlistReducer/Wishlist";

import {
  addToCartReducer,
  cartReducer,
  removeFromCartReducer,
} from "./reduser/CartReducer";
import { UpdateCompanyPreferenceSlice } from "./reduser/Company/CompanyPreference";
import { GetCompanyTypeSlice } from "./reduser/Company/CompanyTypeReducer";
import { GetLoggedCompanySlice } from "./reduser/Company/GetLoggedCompany";
import { GetProductByIdSlice } from "./reduser/ProductReducer/GetProductByIdReducer";
import {
  AllListedProductByCompanySlice,
  ListedDraftProductsByCompanySlice,
  ListedProductsByCompanySlice,
} from "./reduser/ProductReducer/ListedProductsByCompany";
import BulkUploadProductReducer from "./reduser/Products/Bulkuploadproduct.js";

import {
  purchaseOrderDetailsReducer,
  purchaseOrderListReducer,
} from "./reduser/PurchaseOrder_Reducer.js";

import { companyByIdSlice, companySlice } from "./reduser/CompanyReducer";
import totalPurchaseReducer from "./reduser/DashBoard/Total-Purchase";
import totalSalesReducer from "./reduser/DashBoard/Total-Sales";
import OrderTrackingReducer from "./reduser/Order-Tracking/Order-Tracking-Status";
import editProfileReducer from "./reduser/Profile/Edit-Profile";
import profileCompletionReducer from "./reduser/Profile/Profile-Completion";
import invoicesReducer from "./reduser/invoices";

const store = configureStore({
  reducer: {
    products: productReducer,
    wishlists: wishlistReducer,
    removeWishlist: removeWishlistReducer,
    addWishlist: addToWishlistReducer,
    cart: cartReducer,
    addCart: addToCartReducer,
    removeCart: removeFromCartReducer,
    purchaseOrderList: purchaseOrderListReducer,
    purchaseOrderDetails: purchaseOrderDetailsReducer,
    companyDetails: companySlice.reducer,
    companyById: companyByIdSlice.reducer,

    chats: chatReducer,
    newChat: newChatReducer,
    newQuery: createQueryReducer,
    massages: getMassagesReducer,
    sendMassages: sendMassagesReducer,
    searchChat: searchChatReducer,
    sendFiles: sendFilesReducer,
    getFiles: getFilesReducer,
    notification: notificationReducer,
    allNotifiactions: getNotificationReducer,
    lastSeen: LastSeenReducer,
    getlastSeen: GetLastSeenReducer,
    bulkUpload: BulkUploadProductReducer,
    totalSales: totalSalesReducer,
    totalPurchase: totalPurchaseReducer,
    editProfile: editProfileReducer,
    profileCompletion: profileCompletionReducer,
    invoices: invoicesReducer,
    orderTracking: OrderTrackingReducer,
    ProductAnalysis: ProductAnalysisReducer,
    ProductAnalysisUpdate: ProductAnalysisUpdateReducer,
    ProductAnalysisOfWeek: ProductAnalysisDataOfLastWeekReducer,
    ProductAnalysisOfLastMonth: ProductAnalysisDataOfLastMonthReducer,
    ProductAnalysisOfThreeMonth: ProductAnalysisDataOfThreeMonthReducer,
    ProductAnalysisOfSixMonth: ProductAnalysisDataOfSixMonthReducer,
    ProductAnalysisOfLastYear: ProductAnalysisDataOfLastYearReducer,
    ProductAnalysisOfLastFiveYear: ProductAnalysisDataOfLastFiveYearsReducer,
    createOrder: createOrderReducer,
    paymentVerifie: paymentVerifieReducer,

    OrderSummaryD: OrderSummarySlice,
    CompanyType: GetCompanyTypeSlice.reducer,
    CompanyPreference: UpdateCompanyPreferenceSlice.reducer,
    ListedProductsByCompany: ListedProductsByCompanySlice.reducer,
    GetLoggedCompany: GetLoggedCompanySlice.reducer,
    GetProductById: GetProductByIdSlice.reducer,
    ListedDraftProductsByCompany: ListedDraftProductsByCompanySlice.reducer,
    AllListedProductByCompany: AllListedProductByCompanySlice.reducer,
  },
});

export default store;

// Home Filter Reducer
