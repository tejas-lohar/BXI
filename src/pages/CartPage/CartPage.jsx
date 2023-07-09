import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
// import StacsOfCoinIcon from "../../assets/CartPage/StacksOfCoinsIcon.svg";
import StacsOfCoinIcon from "../../assets/BXITokenIcon.png";
import Rupieicon from "../../assets/CartPage/rupieicon.svg";

import addItemCartIcon from "../../assets/CartPage/addItemIcon.svg";
import TrashCanIcon from "../../assets/WishlistPage/TrashCanicon.svg";
import ClearIcon from "@mui/icons-material/Clear";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useRemoveCartProduct } from "../../Hooks/ProductActions/useRemoveCartProduct";
import { useDispatch } from "react-redux";
import { useCreatePrchaseOrder } from "../../Hooks/OrderActions/useCreatePrchaseOrder";
import { BiCheckbox } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { get_Cart_Items } from "../../redux/action/CartActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
import CommaSeprator from "../../components/CommaSeprator";
import EmptyCart from "./EmptyCart";
import axios from "axios";
import useStyles from "./Styles";
import VoucherCart from "./VoucherCart";
import { useGetAllCartVouchers } from "../../Hooks/VoucherActions/useGetAllCartVouchers";
import MediaCart from "./MediaCart";
import YouMayAlsoLike from "./YouMayAlsoLike";
import useGetAuthUser from "../../Hooks/LoggedInUser/useGetAuthUser";
import ProductCart from "./ProductCart";
// import { useGetAllCartVouchers } from "../../Hooks/VoucherActions/useGetAllCartVouchers";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [balance, setBalance] = React.useState(null);
  const [Order, setOrder] = React.useState([]);

  const { data: cartItems, refetch: cartRefetch } = useGetCartData();
  const classes = useStyles();

  function storeData(params) {
    const orderData = Order.find((el) => el._id === params._id);
    if (orderData) {
    } else {
      setOrder([...Order, params]);
    }
  }

  const { data: IAMUserData } = useGetAuthUser();

  const {
    data: VoucherCartData,
    isLoading: VoucherCartLoading,
    error: VoucherDataError,
  } = useGetAllCartVouchers();

  function removeData(params) {
    const orderData = Order.find((el) => el._id === params._id);
    if (orderData) {
      const newOrder = Order.filter((el) => el._id !== params._id);
      setOrder(newOrder);
    } else {
      console.log("not exist");
    }
  }

  const reqBalance = async () => {
    await axios
      .get("wallet/mywallet", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res wallet", res);
        setBalance(res?.data?.data?.balance);
      });
  };

  useEffect(() => {
    reqBalance();
  }, []);


  const { data: mutatedata, mutate: createOrder } = useCreatePrchaseOrder();

  useEffect(() => {
    if (mutatedata?.data === "Order Created") {
      return toast.success("Order Created", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/home/purchaseorderlist");
      }, 2000);
    } else if (mutatedata?.data === "OrderSummary validation failed") {
      toast.error("OrderSummary validation failed");
    }
  }, [mutatedata]);

  const cartProductIds =
    cartItems && cartItems.map((item) => item?.ProductId?.id);

  useEffect(() => {
    dispatch(get_Cart_Items());
  }, []);

  const [activePanel, setActivePanel] = useState(0);

  const switchPanel = (panelIndex) => {
    setActivePanel(panelIndex);
  };

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        borderRadius: "0px",
        boxShadow: "none",
        width: "100%",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText="Cart" />

      <Box
        sx={{
          width: "100%",
          height: "40px",
          bgcolor: "teransparent",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <button
          onClick={() => switchPanel(0)}
          style={{
            borderRadius: "10px 0px 0px 10px",
          }}
          className={
            activePanel === 0 ? classes.activeButton : classes.unActiveButton
          }
        >
          Product Cart
        </button>
        <button
          onClick={() => switchPanel(1)}
          className={
            activePanel === 1 ? classes.activeButton : classes.unActiveButton
          }
        >
          Media Cart
        </button>
        <button
          style={{
            borderRadius: "0px 10px 10px 0px",
          }}
          onClick={() => switchPanel(2)}
          className={
            activePanel === 2 ? classes.activeButton : classes.unActiveButton
          }
        >
          Voucher Cart
        </button>
      </Box>

      {activePanel === 0 && <ProductCart />}

      {activePanel === 1 && <MediaCart />}

      {activePanel === 2 && <VoucherCart />}

      {cartProductIds && <YouMayAlsoLike productIds={cartProductIds} />}
    </Paper>
  );
};

export default CartPage;

const SelectedItemsTetxStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "27px",
  color: "#6B7A99",
};

const InfoBoxAmountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "24px",
  color: " #282828",
};

const ProductNameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "17px",
    sm: "13px",
    xs: "13px",
  },
  lineHeight: "25px",
  color: "#6B7A99",
  textAlign: "left",
};
const ProductMetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "11px",
    sm: "9px",
    xs: "9px",
  },
  lineHeight: {
    xl: "18px",
    lg: "18px",
    md: "15px",
    sm: "14px",
    xs: "14px",
  },
  color: "#858585",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const ProductPriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  color: "rgba(107, 122, 153, 0.5)",
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "18px",
    sm: "15px",
    xs: "15px",
  },
  lineHeight: {
    xl: "21px",
    lg: "21px",
    md: "19px",
    sm: "18px",
    xs: "17px",
  },
  alignContent: "center",
  alignItems: "center",
};

const cartSelectionTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "25px",
  color: "#6B7A99",
};
