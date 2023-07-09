import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "../components/LoadingButton/PageLoader";
import SidebarMenu from "../components/Sidebar/Sidebar";
import Cart from "../pages/CartPage/CartPage";
import AccVerified from "../pages/Register/AccVerified";
import AddPasswordPage from "../pages/Register/AddPassoword";
import BankDetails from "../pages/Register/BankDetails";
import CompanyDetailsPage from "../pages/Register/CompanyDetails";
import CreateAccount from "../pages/Register/CreateAccount";
import ForgetPage from "../pages/Register/Forget";
import ForgetPasswordOtpPage from "../pages/Register/ForgetPasswordOtp";
import Gst from "../pages/Register/Gst";
import LoginPage from "../pages/Register/Login";
import OtpPage from "../pages/Register/Otp";
import ResetPassword from "../pages/Register/ResetPassword";
import Wishlist from "../pages/WishlistPage/WishlistPage";
import BeingVerifiedPage from "../views/BeingVerifiedPage";
import ContactUs from "../views/ContactUs/ContactUs";
import Credit from "../views/Dashboard/Credit";
import CreditConfirm from "../views/Dashboard/CreditConfirm";
import CreditProcess from "../views/Dashboard/CreditProcess";
import CreditTerms from "../views/Dashboard/CreditTerms";
import Dashboard from "../views/Dashboard/Dashboard";
import EmailVerification from "../views/EmailVerification";
import MarketPlace from "../views/MarketPlace";
import RejectPage from "../views/RejectPage";
import ReversePenny from "../views/ReversePenny";
import TermsCondition from "../views/TermsCondition";
import AllProductWithFilter from "./Marketplace/AllProductWithFilter";
import MembershipInvoice from "./MembershipInvoice";
import AddPayment from "./Payment/AddPayment";
import MyWallet from "./Payment/MyWallet";
import MembershipPlan from "./Register/MembershipPlan";
import PricingDetails from "./Register/PricingDetails";
import RouterErrorPage from "./RouterErrorPage";
import TaxInvoice from "./TaxInvoice";

import ElectronicsDetails from "./Product/ProductBuyingPages/ElectronicsDetails";
import LifestyleDetail from "./Product/ProductBuyingPages/LifestyleDetail";
import MediaBuying from "./Product/ProductBuyingPages/MediaBuying";
import MobilityDetail from "./Product/ProductBuyingPages/MobilityDetail";
import OfficeSupplyDetails from "./Product/ProductBuyingPages/OfficeSupplyDetails";
import VoucherBuyingPage from "./Product/ProductBuyingPages/VoucherBuyingPage";

import AllProductPreviewPage from "./Product/ProductPreviewPages/AllProductPreviewPage";
import ElectronicProductPreview from "./Product/ProductPreviewPages/ElectronicProductPreview";
import FMCGProductPreview from "./Product/ProductPreviewPages/FMCGProductPreview";
import MediaOnlineProductPreview from "./Product/ProductPreviewPages/MediaOnlineProductPreview.jsx";
import MobilityProductPreview from "./Product/ProductPreviewPages/MobilityProductPreview.jsx";
import RestaurantProductPreview from "./Product/ProductPreviewPages/RestaurantProductPreview";
import TextilePreviewPage from "./Product/ProductPreviewPages/TextilePreviewPage";

import AllVoucherPreviewPage from "./Product/ProductPreviewPages/AllVoucherPreviewPage";
import SpecificVoucherPreviewPage from "./Product/ProductPreviewPages/SpecificVoucherPreviewPage";

import VoucherTypeOne from "./Product/ProductPreviewPages/VoucherTypeOne";
import VoucherTypeTwo from "./Product/ProductPreviewPages/VoucherTypeTwo";

import MobilityGeneralInformation from "../../src/pages/AddProductAllPages/Mobility/MobilityVoucher/MobilityGeneralInformation";
import MessageView from "../../src/pages/Message/Message";
import ProductDetailsCarousel from "../components/Carousel/ProductDetailsCarousel";
import GeneralInfoTemplate from "../components/common/voucherTemplates/GeneralInfoTemplate";
import GoliveTemplate from "../components/common/voucherTemplates/GoliveTemplate";
import TechInfoTemplate from "../components/common/voucherTemplates/TechInfoTemplate";
import FullscreenNotification from "../components/Header/FullscreenNotification";
import HsnCode from "../components/HsnCode";
import useGetLoggedInUser from "../Hooks/LoggedInUser/useGetLoggedInUser";
import ElectronicsGeneralInfo from "../pages/AddProductAllPages/Electronics/ProductInfo/ElectronicsGeneralInfo";
import ElectronicsProductInfo from "../pages/AddProductAllPages/Electronics/ProductInfo/ElectronicsProductInfo";
import ElectronicsTechInfo from "../pages/AddProductAllPages/Electronics/ProductInfo/ElectronicsTechInfo";
import FMCGGeneralInfo from "../pages/AddProductAllPages/FMCG/ProductInfo/FMCGGeneralInfo";
import FMCGProductInfo from "../pages/AddProductAllPages/FMCG/ProductInfo/FmcgProductInfo";
import FMCGTechInfo from "../pages/AddProductAllPages/FMCG/ProductInfo/FMCGTechInfo";
import HotelsGeneralInfo from "../pages/AddProductAllPages/Hotels/ProductInfo/HotelsGeneralInfo";
import HotelsProductInfo from "../pages/AddProductAllPages/Hotels/ProductInfo/HotelsProductInfo";
import LifestyleVoucherInfo from "../pages/AddProductAllPages/LifeStyle/lifeStyleNewVoucher/LifestyleVoucherInfo";
import LifestyleGeneralInfo from "../pages/AddProductAllPages/LifeStyle/ProductInfo/LifestyleGeneralInformation";
import LifestyleProductInfo from "../pages/AddProductAllPages/LifeStyle/ProductInfo/LifestyleProductInfo";
import LifestyleTechInfo from "../pages/AddProductAllPages/LifeStyle/ProductInfo/LifestyleTechInfo";
import MediaOfflineGeneralInformation from "../pages/AddProductAllPages/MediaOffline//ProductInfo/GeneralInformation";
import MediaOfflineGoLive from "../pages/AddProductAllPages/MediaOffline/ProductInfo/GoLive";
import MediaOfflineProductInfo from "../pages/AddProductAllPages/MediaOffline/ProductInfo/MediaProductInfo";
import MediaOfflineTechInfo from "../pages/AddProductAllPages/MediaOffline/ProductInfo/TechInfo";
import MediaOnlinePhysical from "../pages/AddProductAllPages/MediaOnline/MediaOnlinePhysical";
import MediaGoLive from "../pages/AddProductAllPages/MediaOnline/ProductInfo/GoLive";
import MediaProductInfo from "../pages/AddProductAllPages/MediaOnline/ProductInfo/MediaProductInfo";
import MediaTechInfo from "../pages/AddProductAllPages/MediaOnline/ProductInfo/TechInfo";
import MobilityGeneralInfo from "../pages/AddProductAllPages/Mobility/ProductInfo/MobilityGeneralInformation";
import MobilityProductInfo from "../pages/AddProductAllPages/Mobility/ProductInfo/MobilityProductInfo";
import MobilityTechInfo from "../pages/AddProductAllPages/Mobility/ProductInfo/MobilityTechInfo";
import OfficeSupplyGeneralInformation from "../pages/AddProductAllPages/OfficeSupply/OfficeSupplyVoucher/OfficeSupplyGeneralInformation";
import OfficesupplyGeneralInfo from "../pages/AddProductAllPages/OfficeSupply/ProductInfo/OfficesupplyGeneralInfo";
import OfficesupplyProductInfo from "../pages/AddProductAllPages/OfficeSupply/ProductInfo/OfficeSupplyProductInfo";
import OfficesupplyTechInfo from "../pages/AddProductAllPages/OfficeSupply/ProductInfo/OfficesupplyTechInfo";
import OthersCategoryGeneralInfo from "../pages/AddProductAllPages/OthersCategoryNew/ProductInfo/OthersCategoryGeneralInfo";
import OthersCategoryProductInfo from "../pages/AddProductAllPages/OthersCategoryNew/ProductInfo/OthersCategoryProductInfo";
import OthersCategoryTechInfo from "../pages/AddProductAllPages/OthersCategoryNew/ProductInfo/OthersCategoryTechInfo";
import RestaurantQSRProductInfo from "../pages/AddProductAllPages/RestuarantQSRNew/ProductInfo/RestaurantProductInfo";
import RestaurantQSRPTechInfo from "../pages/AddProductAllPages/RestuarantQSRNew/ProductInfo/RestaurantTechInfo";
import RestaurantQSRGeneralInfo from "../pages/AddProductAllPages/RestuarantQSRNew/ProductInfo/RestuarantGeneralInfo";
import RestaurantQSRGeneralInformation from "../pages/AddProductAllPages/RestuarantQSRNew/RestaurantQSRVoucher/RestaurantQSRGeneralInformation";
import GeneralInformation from "../pages/AddProductAllPages/Textile/ProductInfo/GeneralInformation";
import {
  default as GoLive,
  default as GoLives,
} from "../pages/AddProductAllPages/Textile/ProductInfo/GoLive";
import TechnicalInfo from "../pages/AddProductAllPages/Textile/ProductInfo/TechInfo";
import TexttileProductInfo from "../pages/AddProductAllPages/Textile/ProductInfo/TextileProductInfo";
import VoucherTechnicalinfo from "../pages/AddProductAllPages/Textile/VoucherJourney/TechnicalInfo";
import VoucherGeneralinfo from "../pages/AddProductAllPages/Textile/VoucherJourney/VoucherGeneralInfo";
import Voucherinfo from "../pages/AddProductAllPages/Textile/VoucherJourney/VoucherInfo";
import MediaPurchaseOrderDetails from "../pages/BuyingJourneyPages/MediaPo";
import PurchaseOrderDetails from "../pages/BuyingJourneyPages/PurchaseOrderDetails";
import OrderDetailsPage from "../pages/OrderDetailsPage/OrderDetails";
import OrderTracking from "../pages/OrderDetailsPage/OrderTracking";
import BankDetailsNew from "../views/BankDetailsNew";
import ForwardPennyDrop from "../views/ForwardPennyDrop";
import MyListedProduct from "../views/MyListedProduct";
import TransactionsPage from "../views/Transactions";
import UnderReviewPage from "../views/UnderReviewPage";
import VoucherCard from "./AddProductAllPages/EditVoucherTemplate/Voucher";
import FormValidationEx from "./AddProductAllPages/FormValidationEx";
import GeneralInfoParent from "./AddProductAllPages/GeneralInfoParent";
import MediaMyproduct from "./AddProductAllPages/MediaOnline/MediaMyproduct";
import MediaGeneralInformation from "./AddProductAllPages/MediaOnline/ProductInfo/MediaGeneralInfo";
import MyproductOther from "./AddProductAllPages/OtherCategory/MyproductOther";
import BulkUploadAllProductsshow from "./AddProductAllPages/Textile/BulkUpload/BulkUploadAllProductsshow";
import Bulkuploadpage from "./AddProductAllPages/Textile/BulkUpload/Bulkuploadpage.jsx";
import ElectronicBulkUploadPage from "./AddProductAllPages/Textile/BulkUpload/ElectronicBulkUploadPage";
import FMCGBulkUploadPage from "./AddProductAllPages/Textile/BulkUpload/FmcgBulkUploadPage";
import LifestyleBulkuploadpage from "./AddProductAllPages/Textile/BulkUpload/LifestyleBulkUploadPage";
import MediaOfflineBulkUploadPage from "./AddProductAllPages/Textile/BulkUpload/MediaOfflineBulkUploadPage";
import MediaOnlineBulkUploadPage from "./AddProductAllPages/Textile/BulkUpload/MediaOnlineBulkUploadPage";
import MobilityBulkUploadPage from "./AddProductAllPages/Textile/BulkUpload/MobilityBulkUploadPage";
import OfficeSupplyBulkUploadPage from "./AddProductAllPages/Textile/BulkUpload/OfficeSupplyBulkUploadPage";
import TextileProduct from "./AddProductAllPages/Textile/Myproduct";
import PhysicalDigital from "./AddProductAllPages/Textile/PhysicalDigital";
import PhysicalDigitalee from "./AddProductAllPages/Textile/PhysicalDigitalee";
import HotelsGeneralInfoo from "./AddVoucherPages/ProductInfo/HotelsGeneralInfo";
import VoucherInfo from "./AddVoucherPages/ProductInfo/HotelsProductInfo";
import LifeStyleAppreal from "./Appreal/LifeStyleAppreal";
import OfficeAppreal from "./Appreal/OfficeAppreal.jsx";
import ProductDetails from "./Appreal/ProductDetails";
import { AddMember } from "./CompanyMembersPages/AddMember";
import CompanyMembers from "./CompanyMembersPages/CompanyMembers";
import GeneralVoucherForm from "./GeneralVoucherForm/GeneralVoucherForm";
import HomePage from "./LandingPage/HomePage";
import HowitworksPage from "./LandingPage/HowitworksPage";
import MediaOrderListPage from "./MediaOrderList/MediaOrderListPage";
import AddUserPage from "./MemberDetails/AddUserPage";
import MemberDetailsPage from "./MemberDetails/MemberDetailsPage";
import MemberDirectory from "./MemberDetails/MemberDirectory";
import DetailedOrderSummary from "./OrderDetailsPage/DetailedOrderSummary";
import OrderHistory from "./OrderDetailsPage/OrderHistory";
import SellerPerformaInvoiceHistory from "./OrderDetailsPage/SellerOrderHistory";
import PaymentProfile from "./Payment/PaymentProfile";
import AddProduct from "./Product/AddProduct";
import BulkUploadProduct from "./Product/BulkUploadProduct";
import PerformaInvoice from "./Product/Calend/PerformaInvoice";
import Invoice from "./Product/Invoice";
import InvoicePage from "./Product/Invoicelist";
import HotelVoucherAddtocart from "./Product/ProductPreviewPages/HotelVoucherAddtocart";
import TextilesVoucherPrev from "./Product/ProductPreviewPages/TextilesVoucherPrev";
import ProfileInterest from "./Profile/ProfileInterest";
import BuyerOrderSummaryHistory from "./PurchaseOrderList/BuyerOrderSummaryHistory";
import OrderSummeryDetailsPage from "./PurchaseOrderList/OrderSummeryDetailsPage";
import OrderSummeryMediaDetailsPage from "./PurchaseOrderList/OrderSummeryMediaDetailsPage";
import OrderSummeryVoucherDetailsPage from "./PurchaseOrderList/OrderSummeryVoucherDetailsPage";
import PurchaseOrderList from "./PurchaseOrderList/PurchaseOrderList";
import SellerDetailedOrderSummary from "./PurchaseOrderList/SellerDetailedOrderSummary";
import SellerOrderSummaryList from "./PurchaseOrderList/SellerOrderSummaryList";
import OrderSummaryDetails from "./PurchaseOrderList/SelllerPurchaseOrderPage";
import ROC from "./Register/ROC";
import ChooseTransportation from "./TransportationPage/ChooseTransportation";
import ViewProduct from "./ViewProduct/ViewProduct";
import MembershipDetail from "./ViewProfile/MembershipDetail";

import Buynow from "../components/buy-pg/buy-now.jsx";
import ProductAnalysis from "../pages/Product/ProductAnalysis";
import AirlineTicketsGeneralInformation from "./AddProductAllPages/AirlineTickets/AirlineTicketsVoucher/AirlineTicketsGeneralInformation";
import ElectronicsGeneralInformation from "./AddProductAllPages/Electronics/ElectronicsVoucher/ElectronicsGeneralInformation";
import EntertainmentEventGeneralInformation from "./AddProductAllPages/Entertainment&Recreation/EntertainmentEvent/EntertainmentEventGeneralInformation";
import FMCGGeneralInformation from "./AddProductAllPages/FMCG/FMCGVoucher/FMCGGeneralInformation.jsx";
import TextileVoucherGeneralInformation from "./AddProductAllPages/Textile/TextileVoucher/TextileVoucherGeneralInformation";
import ContactForm from "./LandingPage/ContactPage/ContactForm";
import GiftAndValueVoucherDetails from "./Product/ProductBuyingPages/GiftAndValueVoucherDetails";
import VoucherOrderList from "./Vocher/VoucherOrderList";

import BuyerEaaa from "../components/BuyerEaaa";
import SellerEaaa from "../components/SellerEaaa";

import SideBar from "../components/Admin/SideBar";
import Explore from "../components/Admin/Explore";
import AdminHome from "../components/Admin/AdminHome";
import LoginSignup from "../components/Admin/LoginSignup";
import UserAndCompany from "../components/Admin/UserAndCompany";

const routerdata = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/contactform",
      element: <ContactForm />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/",
      element: <HomePage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/howitworks",
      element: <HowitworksPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/formvalidate",
      element: <FormValidationEx />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/forget",
      element: <ForgetPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/createaccount",
      element: <CreateAccount />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/roc",
      element: <ROC />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/addpassword",
      element: <AddPasswordPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/gst",
      element: <Gst />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/company",
      element: <CompanyDetailsPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/bank",
      element: <BankDetails />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/accverified",
      element: <AccVerified />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/reject",
      element: <RejectPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/beingverified",
      element: <BeingVerifiedPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/under_review",
      element: <UnderReviewPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/forward_penny",
      element: <ForwardPennyDrop />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/reverse_penny",
      element: <ReversePenny />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/emailverify",
      element: <EmailVerification />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/otp",
      element: <OtpPage />,
      errorElement: <RouterErrorPage />,
    },
    {
      path: "/forgetpasswordotp",
      element: <ForgetPasswordOtpPage />,
      errorElement: <RouterErrorPage />,
    },
    // {
    //   path: "/",
    //   element: <LoginPage />,
    //   errorElement: <RouterErrorPage />,
    // },
    
    {
      path: "/admindashboard",
      element: <SideBar />,
      errorElement: <RouterErrorPage />,
      children: [
        {
          index: true,
          element: <AdminHome />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "explore",
          element: <Explore />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "userandcompany",
          element: <UserAndCompany />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "loginsignup",
          element: <LoginSignup />,
          errorElement: <RouterErrorPage />,
        }]
    },
    {
      path: "/home",
      element: <SidebarMenu />,
      errorElement: <RouterErrorPage />,
      children: [
        {
          index: true,
          element: <MarketPlace />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "buynow/:id",
          element: <Buynow />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "hsn",
          element: <HsnCode />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediaorderlist",
          element: <MediaOrderListPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "voucherorderlist",
          element: <VoucherOrderList />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "pricing",
          element: <PricingDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "membershipplan",
          element: <MembershipPlan />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "spacificvoucher/:id",
          element: <VoucherTypeOne />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "valueandgiftvoucher/:id",
          element: <VoucherTypeTwo />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "textilesvoucherprev/:id",
          element: <TextilesVoucherPrev />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "purchaseorderdetails/:id",
          element: <PurchaseOrderDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediapurchaseorderdetails/:id",
          element: <MediaPurchaseOrderDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "membershipinvoice",
          element: <MembershipInvoice />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "taxinvoice",
          element: <TaxInvoice />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "viewproduct/:id/:type",
          element: <ViewProduct />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "golive",
          element: <GoLives />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "sellereaaa",
          element: <SellerEaaa />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "buyereaaa",
          element: <BuyerEaaa />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "terms",
          element: <TermsCondition />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "order_history",
          element: <OrderHistory />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "order_tracking",
          element: <OrderTracking />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "product",
          element: <AllProductWithFilter />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "productcategory",
          element: <AddProduct />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "productanalytics",
          element: <ProductAnalysis />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "fullscreennotification",
          element: <FullscreenNotification />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "credit",
          element: <Credit />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "creditterms",
          element: <CreditTerms />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "creditprocess",
          element: <CreditProcess />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "creditconfirm",
          element: <CreditConfirm />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "MediaOnlinePhysical",
          element: <MediaOnlinePhysical />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "payment",
          element: <AddPayment />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "wallet",
          element: <MyWallet />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "cart",
          element: <Cart />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "contactus",
          element: <ContactUs />,
          errorElement: <RouterErrorPage />,
        },

        {
          path: "invoice/:id",
          element: <Invoice />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "performainvoice/:id",
          element: <PerformaInvoice />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "loader",
          element: <PageLoader />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "orderdetails",
          element: <OrderDetailsPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "profile",
          element: <ProfileInterest />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "bankinformation",
          element: <BankDetailsNew />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "MyproductOther",
          element: <MyproductOther />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "MediaMyproduct",
          element: <MediaMyproduct />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "texttileproduct",
          element: <TextileProduct />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "ordersummerydetails/:id",
          element: <OrderSummeryDetailsPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "Voucherordersummerydetailspage/:id",
          element: <OrderSummeryVoucherDetailsPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediaordersummerydetails/:id",
          element: <OrderSummeryMediaDetailsPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "hotelvoucheraddtocart/:id",
          element: <HotelVoucherAddtocart />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "voucherdetail/:id",
          element: <VoucherBuyingPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "giftandvaluevoucher/:id",
          element: <GiftAndValueVoucherDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "officesupplydetail/:id",
          element: <OfficeSupplyDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "electronicsdetail/:id",
          element: <ElectronicsDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "lifestyledetail/:id",
          element: <LifestyleDetail />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediabuying/:id",
          element: <MediaBuying />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "membershipdetail",
          element: <MembershipDetail />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mobilitydetail/:id",
          element: <MobilityDetail />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "productdetail/:id",
          element: <ProductDetails />,
          errorElement: <RouterErrorPage />,
        },
        // product preview routes
        {
          path: "allproductpreview/:id",
          element: <AllProductPreviewPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "allvoucherpreview/:id",
          element: <AllVoucherPreviewPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "specificvoucherpreview/:id",
          element: <SpecificVoucherPreviewPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "electronicsproductpreview/:id",
          element: <ElectronicProductPreview />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "RestaurantProductPreview/:id",
          element: <RestaurantProductPreview />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "fmcgproductpreview/:id",
          element: <FMCGProductPreview />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediaonlineproductpreview/:id",
          element: <MediaOnlineProductPreview />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mobilityproductpreview/:id",
          element: <MobilityProductPreview />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "textilepreviewpage/:id",
          element: <TextilePreviewPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "generalVoucherForm",
          element: <GeneralVoucherForm />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "myproduct",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              path: "vouchergeneralinfo",
              element: <VoucherGeneralinfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherinfo",
              element: <Voucherinfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "vouchertechnicalinfo",
              element: <VoucherTechnicalinfo />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },

        {
          path: "textile",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "texttileproductInfo/:id",
              element: <TexttileProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "technicalinfo/:id",
              element: <TechnicalInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "golive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },

        {
          path: "textilebulkupload",
          element: <Bulkuploadpage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "bulkuploadproduct",
          element: <BulkUploadProduct />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "lifestylebulkupload",
          element: <LifestyleBulkuploadpage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "textileBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },

        {
          path: "electronicbulkupload",
          element: <ElectronicBulkUploadPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "electronicBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },

        {
          path: "officesupplybulkupload",
          element: <OfficeSupplyBulkUploadPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "officesupplyBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },

        {
          path: "mobilitybulkupload",
          element: <MobilityBulkUploadPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mobilityBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },

        {
          path: "fmcgbulkupload",
          element: <FMCGBulkUploadPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "fmcgBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },
        {
          path: "mediaonlinebulkupload",
          element: <MediaOnlineBulkUploadPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediaonlineBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },
        {
          path: "mediaofflinebulkupload",
          element: <MediaOfflineBulkUploadPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mediaonlineBulkuploadshowproducts",
          element: <BulkUploadAllProductsshow />,
        },

        {
          path: "officesupply",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <OfficesupplyGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "officesupplyproductinfo/:id",
              element: <OfficesupplyProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "officesupplytechinfo/:id",
              element: <OfficesupplyTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "officesupplygolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },

        {
          path: "electronics",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <ElectronicsGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "electronicsproductinfo/:id",
              element: <ElectronicsProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "electronicstechinfo/:id",
              element: <ElectronicsTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "electronicsgolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "electronicsVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "electronicstechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "electronicsgeneralinformation/:id",
              element: <ElectronicsGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "electronicsgolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },

        {
          path: "fmcg",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <FMCGGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "fmcgproductinfo/:id",
              element: <FMCGProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "fmcgtechinfo/:id",
              element: <FMCGTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "fmcggolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "fmcgVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "fmcgtechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "fmcggolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "fmcggeneralinformation/:id",
              element: <FMCGGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },

        {
          path: "restaurant",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <RestaurantQSRGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "restaurantproductinfo/:id",
              element: <RestaurantQSRProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "restauranttechinfo/:id",
              element: <RestaurantQSRPTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "restaurantgolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "others",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <OthersCategoryGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "othersproductinfo/:id",
              element: <OthersCategoryProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "otherstechinfo/:id",
              element: <OthersCategoryTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "othersgolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "mediaonline",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <MediaGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mediaonlineproductinfo/:id",
              element: <MediaProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mediaonlinetechinfo/:id",
              element: <MediaTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mediaonlinegolive/:id",
              element: <MediaGoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "mediaoffline",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <MediaOfflineGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mediaofflineproductinfo/:id",
              element: <MediaOfflineProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mediaofflinetechinfo/:id",
              element: <MediaOfflineTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mediaofflinegolive/:id",
              element: <MediaOfflineGoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "lifestyle",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <LifestyleGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "lifestyleproductinfo/:id",
              element: <LifestyleProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "lifestyletechinfo/:id",
              element: <LifestyleTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "lifestylegolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "mobility",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <MobilityGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mobilityproductinfo/:id",
              element: <MobilityProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mobilitytechinfo/:id",
              element: <MobilityTechInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mobilitygolive/:id",
              element: <GoLive />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "mobilityVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mobilitygeneralinformation/:id",
              element: <MobilityGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mobilitytechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "mobilitygolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "officesupplyVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "officesupplygeneralinformation/:id",
              element: <OfficeSupplyGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "officesupplytechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "officesupplygolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "eeVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "eegeneralinformation/:id",
              element: <EntertainmentEventGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "eetechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "eegolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "textileVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "textilegeneralinformation/:id",
              element: <TextileVoucherGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            // {
            //   path: "textilegeneralinformation/:id",
            //   element: <CommonVoucherInformation />,
            //   errorElement: <RouterErrorPage />,
            // },
            {
              path: "textiletechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "textilegolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "lifestyleVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "lifestylegeneralinformation/:id",
              element: <LifestyleVoucherInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "lifestyletechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "lifestylegolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "airlineVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "airlinegeneralinformation/:id",
              element: <AirlineTicketsGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "airlinetechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "airlinegolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "qsrVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "qsrgeneralinformation/:id",
              element: <RestaurantQSRGeneralInformation />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "qsrtechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "qsrgolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "otherVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <GeneralInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "othertechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "othergolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "hotelsVoucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <HotelsGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: ":id",
              element: <HotelsGeneralInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "hotelsproductinfo/:id",
              element: <HotelsProductInfo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "hotelstechinfo/:id",
              element: <TechInfoTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "hotelsgolive/:id",
              element: <GoliveTemplate />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "voucher",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              index: true,
              element: <HotelsGeneralInfoo />,
              errorElement: <RouterErrorPage />,
            },
            {
              path: "voucherinfo",
              element: <VoucherInfo />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
        {
          path: "carousel",
          element: <ProductDetailsCarousel />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "company_members",
          element: <CompanyMembers />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "message",
          element: <MessageView />,
          errorElement: <RouterErrorPage />,
        },

        {
          path: "member_details" + "/:id",
          element: <MemberDetailsPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "memberdirectory",
          element: <MemberDirectory />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "add_member",
          element: <AddUserPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "lifestyleappreal",
          element: <LifeStyleAppreal />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "invoicenotification",
          element: <InvoicePage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "wallettransactions",
          element: <TransactionsPage />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "physical",
          element: <PhysicalDigital />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "eephysical",
          element: <PhysicalDigitalee />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "officeappreal",
          element: <OfficeAppreal />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "mylistedproducts",
          element: <MyListedProduct />,
          errorElement: <RouterErrorPage />,
        },

        {
          path: "addmember",
          element: <AddMember />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "sellerdetailedordersummary/:id",
          element: <SellerDetailedOrderSummary />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "detailedordersummary/:id",
          element: <DetailedOrderSummary />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "purchaseorderlist",
          element: <PurchaseOrderList />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "sellerordersummary",
          element: <SellerOrderSummaryList />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "voucherpayment/:id",
          element: <PaymentProfile />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "paymentprofile/:id",
          element: <PaymentProfile />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "paymentprofile/:id/:price",
          element: <PaymentProfile />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "buyerordersummaryhistory",
          element: <BuyerOrderSummaryHistory />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "sellerperformainvoicehistory",
          element: <SellerPerformaInvoiceHistory />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "sellerpurchaseorder/:id",
          element: <OrderSummaryDetails />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "choosetransport/:id",
          element: <ChooseTransportation />,
          errorElement: <RouterErrorPage />,
        },
        {
          path: "vouchers",
          element: <GeneralInfoParent />,
          errorElement: <RouterErrorPage />,
          children: [
            {
              path: "voucherdesign/:id",
              element: <VoucherCard />,
              errorElement: <RouterErrorPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: `/`,
  }
);

export default function MainRouter({ children }) {
  const {
    data: datahere,
    isLoading: DataLoading,
    error: DataError,
    refetch: refetchData,
  } = useGetLoggedInUser();

  useEffect(() => {
    refetchData();
  }, [window.location.pathname]);

  return (
    <React.Fragment>
      {/* {DataLoading && <PageLoader />}
      {datahere?.data ? ( */}
      <RouterProvider router={routerdata}>{children}</RouterProvider>
      {/* ) : ( */}
      {/* <RouterProvider router={OnBoardingRoutes}>{children}</RouterProvider> */}
      {/* )} */}
    </React.Fragment>
  );
}
