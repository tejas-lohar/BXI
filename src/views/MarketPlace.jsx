import { Box, Button, Grid, Paper, Skeleton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import FilterIconImg from "../assets/FilterIcons/FilterIcon.png";
import ImagePoster from "../components/Cards/ImagePoster";
import ProductList from "../pages/Marketplace/ProductList";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PreferenceModal from "../components/Modals/PreferenceModal";

import CheckIcon from "@mui/icons-material/Check";
import { Autocomplete, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import BXIToken from "../assets/BXITokenIcon.png";
import BroucherIcon from "../assets/Images/FilterIcons/Boucher.png";
import CloseIcon from "../assets/Images/FilterIcons/Close.png";
import HeartIcon from "../assets/Images/FilterIcons/Heart.png";
import ProductIcon from "../assets/Images/FilterIcons/Product.png";
import SortIcon from "../assets/Images/FilterIcons/Sort.png";
import AndhraPradeshStateIcon from "../assets/Images/States/Andhra.png";
import ArunachalPradeshIcon from "../assets/Images/States/ArunachalPradesh.png";
import AssamIcon from "../assets/Images/States/Assam.png";
import BiharStateIcon from "../assets/Images/States/Bihar.png";
import ChhattisgarhStateIcon from "../assets/Images/States/Chhattisgarh.png";
import GoaIcon from "../assets/Images/States/Goa.png";
import GujaratStateIcon from "../assets/Images/States/Gujarat.png";
import HimachalPradeshIcon from "../assets/Images/States/HP.png";
import HaryanaIcon from "../assets/Images/States/Haryana.png";
import JammuKashmirIcon from "../assets/Images/States/J&K.png";
import JharkhandStateIcon from "../assets/Images/States/Jharkhand.png";
import KarnatakaStateIcon from "../assets/Images/States/Karnataka.png";
import KeralaStateIcon from "../assets/Images/States/Kerala.png";
import MadhyaPradeshStateIcon from "../assets/Images/States/MP.png";
import MaharastraStateIcon from "../assets/Images/States/Maharashtra.png";
import ManipurIcon from "../assets/Images/States/Manipur.png";
import MeghalayaIcon from "../assets/Images/States/Meghalaya.png";
import MizoramIcon from "../assets/Images/States/Mizoram.png";
import NagalandIcon from "../assets/Images/States/Nagaland.png";
import OdishaStateIcon from "../assets/Images/States/Odisha.png";
import PunjabIcon from "../assets/Images/States/Punjab.png";
import RajasthanStateIcon from "../assets/Images/States/Rajasthan.png";
import SikkimIcon from "../assets/Images/States/Sikkim.png";
import TamilNaduStateIcon from "../assets/Images/States/TamilNadu.png";
import TripuraIcon from "../assets/Images/States/Tripura.png";
import UttarPradeshStateIcon from "../assets/Images/States/UP.png";
import UttarakhandIcon from "../assets/Images/States/Uttrakhand.png";
import WestBengalStateIcon from "../assets/Images/States/WestBengal.png";
import TelanganaStateIcon from "../assets/Images/States/telanganaStateIcon.png";

import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCarousel from "../components/Carousel/ProductDetailsCarousel";
import { getProduct } from "../redux/action/Home-Filter/products";

import { useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import axios from "axios";
import useGetLoggedInUser from "../Hooks/LoggedInUser/useGetLoggedInUser";
import { getCompanyDetails } from "../redux/action/CompanyActions";

const StateObjectArray = [
  { Img: MaharastraStateIcon, text: "Maharastra" },
  { Img: RajasthanStateIcon, text: "Rajasthan" },
  { Img: GujaratStateIcon, text: "Gujarat" },
  { Img: MadhyaPradeshStateIcon, text: "Madhya Pradesh" },
  { Img: KarnatakaStateIcon, text: "Karnataka" },
  { Img: UttarPradeshStateIcon, text: "Uttar Pradesh" },
  { Img: TamilNaduStateIcon, text: "Tamil Nadu" },
  { Img: AndhraPradeshStateIcon, text: "Andhra Pradesh" },
  { Img: TelanganaStateIcon, text: "Telangana" },
  { Img: KeralaStateIcon, text: "Kerala" },
  { Img: WestBengalStateIcon, text: "West Bengal" },
  { Img: OdishaStateIcon, text: "Odisha" },
  { Img: JharkhandStateIcon, text: "Jharkhand" },
  { Img: BiharStateIcon, text: "Bihar" },
  { Img: ChhattisgarhStateIcon, text: "Chhattisgarh" },
  { Img: ArunachalPradeshIcon, text: "Arunachal Pradesh" },
  { Img: AssamIcon, text: "Assam" },
  { Img: ManipurIcon, text: "Manipur" },
  { Img: MeghalayaIcon, text: "Meghalaya" },
  { Img: MizoramIcon, text: "Mizoram" },
  { Img: NagalandIcon, text: "Nagaland" },
  { Img: SikkimIcon, text: "Sikkim " },
  { Img: TripuraIcon, text: "Tripura" },
  { Img: HaryanaIcon, text: "Haryana" },
  { Img: PunjabIcon, text: "Punjab" },
  { Img: JammuKashmirIcon, text: "Jammu & Kashmir" },
  { Img: HimachalPradeshIcon, text: "Himachal Pradesh" },
  { Img: UttarakhandIcon, text: "Uttarakhand" },
  { Img: GoaIcon, text: "Goa" },
];

const SortBoxMapObjectArray = [
  { name: "broucher", Img: BroucherIcon, text: "Voucher" },
  { name: "product", Img: ProductIcon, text: "Product" },
  { name: "heart", Img: HeartIcon, text: "Wishlist" },
];
// const RatingArray = [
//   { name: "5 Star", value: "5" },
//   { name: "4 Star", value: "4" },
//   { name: "3 Star", value: "3" },
//   { name: "All", value: "All" },
// ];

export let States = null;
export let PriceRange = null;
export let Product_Qty = null;
export let Clear = null;
export let Refresh = null;
export let PriceShortHightToLow = null;
export let PriceShortLowToHight = null;
export let WhatsNew = null;
export let Popularity = null;
export let Voucher = null;
export let ProductsFilter = null;

const MarketPlace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [storeFilter, setStoreFilter] = useState();
  const [sortByView, setSortByView] = useState();
  const [ProductLocationState, setstatefilter] = useState([]);
  const [pricerange, setPriceRange] = useState("");
  const [ProductRating, setStoreRating] = useState([]);
  const [ProductQty, setProductQty] = useState("");
  const [ProductDeliveryType, setStoreDeliveryType] = useState();
  const [storeAllFilterData, setStoreAllFilterData] = useState();
  const [clear, setClear] = useState("");
  // const [defaults, setDefault] = useState();
  const [refresh, setRefresh] = useState(false);
  // const [sortdata, setSortData] = useState(false);
  const [priceShortHightToLow, setPriceShortHightToLow] = useState("");
  const [priceShortLowToHight, setPriceShortLowToHight] = useState("");
  const [whatsNew, setWhatsNew] = useState("");
  const [popularity, setPopularity] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [productsFilter, setProductsFilter] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  // const [matchingResults, setMatchingResults] = useState([]);
  const { data: loggedInUserData } = useGetLoggedInUser();
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [allProductSearch, setAllProductSearch] = useState([]);

  const storeAllFilterDataFun = async () => {
    setStoreAllFilterData({
      sortByView: sortByView,
      ProductLocationState: ProductLocationState,
      pricerange: pricerange,
      ProductRating: ProductRating,
      ProductQty: ProductQty,
      ProductDeliveryType: ProductDeliveryType,
    });
    handleClose();
  };
  const { company: CompanyDetails } = useSelector(
    (state) => state.companyDetails
  );
  const { products, loading } = useSelector((state) => state.products);

  window.onload = () => {
    setRefresh(true);
  };

  States = ProductLocationState;
  PriceRange = pricerange;
  Product_Qty = ProductQty;
  Clear = clear;
  Refresh = refresh;
  PriceShortHightToLow = priceShortHightToLow;
  PriceShortLowToHight = priceShortLowToHight;
  WhatsNew = whatsNew;
  Popularity = popularity;
  Voucher = voucher;
  ProductsFilter = productsFilter;

  const filterByCompany = async () => {
    await axios
      .get(`product/get_allproducts_bycompany`, { withCredentials: true })
      .then((res) => {
        setAllProductSearch(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    filterByCompany();
  }, []);

  useEffect(() => {
    if (
      loggedInUserData &&
      loggedInUserData.data &&
      loggedInUserData.data._id
    ) {
      dispatch(
        getProduct(
          "",
          pricerange,
          sortByView,
          ProductQty,
          clear,
          CompanyDetails ? CompanyDetails._id : "",
          refresh,
          loggedInUserData.data._id,
          priceShortHightToLow,
          priceShortLowToHight,
          whatsNew,
          selectedCompany,
          "",
          popularity,
          voucher,
          "",
          productsFilter
        )
      );
    }
  }, [
    loggedInUserData,
    dispatch,
    pricerange,
    sortByView,
    ProductQty,
    storeFilter,
    clear,
    CompanyDetails,
    refresh,
    priceShortHightToLow,
    priceShortLowToHight,
    whatsNew,
    selectedCompany,
    ProductLocationState,
    popularity,
    voucher,
    productsFilter,
  ]);

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  const handleSearch = (event, newValue) => {
    setSelectedCompany(newValue);
    const uniqueCompanyNames = products?.products
      ?.map((option) => option?.SellerCompanyId?.companyName || "")
      .filter(Boolean);
    const filteredResults = uniqueCompanyNames.filter((name) =>
      name.toLowerCase().includes(newValue?.toLowerCase())
    );
  };

  return (
    <Paper
      sx={{
        width: "92%",
        mx: "auto",
        background: "transparent",
        borderRadius: "5px",
        py: 2,
      }}
      elevation={0}
    >
      <Grid container>
        <Grid
          item
          xl={11.5}
          lg={11.3}
          md={11}
          sm={10.5}
          xs={10}
          sx={{
            bgcolor: "transparent",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <ProductDetailsCarousel />
        </Grid>
        <Grid
          xl={0.5}
          lg={0.7}
          md={1}
          sm={1.5}
          xs={2}
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Button
            onClick={handleOpen}
            disableRipple
            disableFocusRipple
            disableTouchRipple
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Box
              sx={{
                background: "#ffffff",
                width: "30px",
                px: "10px",
                height: "80px",
                borderRadius: "20px",
                display: "grid",
                justifyContent: "space-evenly",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <img
                src={FilterIconImg}
                alt="filter"
                width="26px"
                height="auto"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </Box>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={FilterModalStyle}>
              <Paper
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 2,
                    height: "70px",
                  }}
                >
                  <Typography sx={FilterTitle}>View Options</Typography>
                  <button
                    style={{
                      width: "20px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    disableRipple
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <img src={CloseIcon} width={"23px"} alt="img" />
                  </button>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "center",

                    pl: 2,
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      ...FilterTextStyleOne,
                      fontWeight: 500,
                    }}
                  >
                    Default View
                  </Typography>
                </Box>

                <Accordion
                  elevation={0}
                  sx={{
                    WebkitBoxShadow: "none",
                    MozBoxShadow: "none",
                    boxShadow: "none",
                    // minHeight: "49px",
                    borderStyle: "hidden",
                    background: "border-box",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    // onClick={() => setSortData(true)}
                    sx={{
                      border: "none",
                      // background: sortdata ? "#E0F0FF" : "#FFFFFF",
                      borderStyle: "hidden",
                      background: "border-box",
                    }}
                  >
                    <img
                      src={SortIcon}
                      alt="SortIcon"
                      style={{ height: "15px", width: "15px" }}
                    />
                    <Typography
                      sx={{
                        ...FilterTextStyleOne,
                        fontWeight: 500,
                      }}
                    >
                      Sort
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      ...FilterTextStyleOne,
                      background: "#F8FAFB",
                      borderRedius: "3px",
                      cursor: "pointer",
                      boxShadow:
                        "0px 1.91702px 5.75107px rgba(146, 140, 151, 0.25)",
                    }}
                  >
                    <Typography
                      onClick={() => setWhatsNew("New")}
                      sx={{
                        ...FilterTextStyleOne,
                        cursor: "pointer",
                        fontWeight: "500",
                        mt: 2,
                      }}
                    >
                      Whats New
                    </Typography>
                    <Typography
                      onClick={() => setPopularity(!popularity)}
                      sx={{
                        ...FilterTextStyleOne,
                        cursor: "pointer",
                        fontWeight: "500",
                        mt: 2,
                      }}
                    >
                      Popularity
                    </Typography>
                    <Typography
                      onClick={() => setPriceShortHightToLow("ShortHightToLow")}
                      sx={{
                        ...FilterTextStyleOne,
                        cursor: "pointer",
                        fontWeight: "500",
                        mt: 2,
                      }}
                    >
                      price - high to low
                    </Typography>
                    <Typography
                      onClick={() => setPriceShortLowToHight("ShortLowToHight")}
                      sx={{
                        ...FilterTextStyleOne,
                        cursor: "pointer",
                        fontWeight: "500",
                        mt: 2,
                      }}
                    >
                      price - low to high
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {SortBoxMapObjectArray?.map((res, idx) => {
                  return (
                    <Box
                      key={idx}
                      sx={{
                        width: "100%",
                        height: "40px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        alignContent: "center",
                        background: sortByView?.includes(res.name)
                          ? "#E0F0FF"
                          : "#FFFFFF",
                        pl: 2,
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (res.text === "Wishlist") {
                          navigate("/home/wishlist");
                        } else {
                          handleClose();
                          // setDefault(res.name);
                        }
                        if (res.text === "Product") {
                          setProductsFilter(!productsFilter);
                        } else {
                          handleClose();
                          // setDefault(res.name);
                        }
                        if (res.text === "Voucher") {
                          setVoucher(!voucher);
                        } else {
                          handleClose();
                          // setDefault(res.name);
                        }
                      }}
                    >
                      {res.Img ? (
                        <img
                          src={res?.Img}
                          alt="img"
                          width={"15px"}
                          height="17px"
                        />
                      ) : null}
                      <Typography
                        sx={{
                          ...FilterTextStyleOne,
                          color: sortByView?.includes(res.name)
                            ? "#445FD2"
                            : "#B2BCCF",
                          fontWeight: 500,
                        }}
                      >
                        {res.text}
                      </Typography>
                    </Box>
                  );
                })}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    height: "50px",
                  }}
                >
                  <Typography sx={FilterTitle}>Location</Typography>
                  {/* <Typography sx={FilterTextStyleOne}>Show all</Typography> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    height: "40px",
                  }}
                >
                  <Typography
                    sx={{ ...FilterTextStyleOne, ml: 0, lineHeight: "0px" }}
                  >
                    Add Location
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "110px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "center",
                    maxWidth: "385px",
                    overflowX: "scroll",
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(59, 52, 134, 0.38)",
                      boxShadow: "inset 2px 2px 5px 0 rgba(#fff, 0.5)",
                      borderRadius: "100px",
                    },
                    "&::-webkit-scrollbar": {
                      height: "05px",
                    },
                    gap: "10px",
                    mt: 1,
                  }}
                >
                  {StateObjectArray?.map((res, idx) => {
                    return (
                      <Box
                        key={idx}
                        onClick={() => {
                          if (ProductLocationState.includes(res.text)) {
                            setstatefilter(
                              ProductLocationState.filter(
                                (item) => item !== res.text
                              )
                            );
                          } else {
                            setstatefilter([...ProductLocationState, res.text]);
                          }
                        }}
                        sx={{
                          width: "100%",
                          minWidth: "90px",
                          height: "90px",
                          display: "grid",
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                          borderRadius: "12px",
                          bgcolor: "rgba(243, 246, 249, 0.6)",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {ProductLocationState.includes(res.text) ? (
                          <CheckIcon
                            sx={{
                              position: "absolute",
                              marginBottom: "7rem",
                              marginLeft: "7rem",
                              fontSize: "12px",
                              padding: "4px",
                              color: "#445FD2",
                              background: "#FFFFFF",
                              border: "2px solid rgba(206, 206, 206, 0.5)",
                              boxShadow:
                                "inset 4px -4px 4px rgba(246, 246, 246, 0.25), inset -4px 4px 4px rgba(246, 246, 246, 0.25)",
                              borderRadius: 100,
                            }}
                          />
                        ) : null}
                        <img
                          src={res.Img}
                          alt=""
                          width={"50px"}
                          height="auto"
                          style={{ marginLeft: "auto", marginRight: "auto" }}
                        />
                        <Typography
                          sx={{
                            ...FilterTextStyleOne,
                            fontSize: "11px",
                            ml: 0,
                            color: ProductLocationState.includes(res.text)
                              ? "#445FD2"
                              : "#B2BCCF",
                          }}
                        >
                          {res.text}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    height: "50px",
                  }}
                >
                  <Typography sx={FilterTitle}>Price Range</Typography>
                  <Typography sx={FilterTextStyleOne}>Show all</Typography>
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    height: "60px",
                    alignItems: "center",
                    alignContent: "center",
                    maxWidth: "385px",
                    overflowX: "scroll",
                    gap: "10px",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    px: 2,
                    mt: 1,
                    bgcolor: "#E0F0FF",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      minWidth: "310px",
                      height: "1px",
                      pt: 1.5,
                      pb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        ...FilterTitle,
                        fontSize: "12px",
                        lineHeight: "10px",
                      }}
                    >
                      Price range
                    </Typography>
                    <Typography
                      sx={{
                        ...FilterTitle,
                        fontSize: "12px",
                        lineHeight: "10px",
                      }}
                    >
                      <Box
                        component="img"
                        sx={{ width: "12px", height: "12px", mr: "1px" }}
                        src={BXIToken}
                      />
                      {pricerange}
                    </Typography>
                  </Box>
                  <Slider
                    defaultValue={pricerange}
                    aria-label="Small steps"
                    size="small"
                    step={100000}
                    min={0}
                    max={1000000}
                    onChange={(e) => {
                      setClear("");
                      localStorage.removeItem("myObj");
                      setPriceRange(e.target.value);
                    }}
                  />
                </Box>
              </Paper>
              {/* <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 2,
                    height: "auto",
                  }}
                >
                  <Typography sx={FilterTitle}>Ratings</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    borderRadius: "10px",
                  }}
                >
                  {RatingArray?.map((res, idx) => {
                    return (
                      <Box
                        key={idx}
                        onClick={() => {
                          setStoreRating(res.value);
                        }}
                        sx={{
                          width: "81px",
                          height: "33px",
                          // background: "#F8FAFB",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                          cursor: "pointer",
                          background: ProductRating.includes(res.value)
                            ? "#E0F0FF"
                            : "#F8FAFB",
                        }}
                      >
                        <Typography
                          sx={{
                            ...FilterTextStyleOne,
                            fontSize: "14px",
                            ml: 0,
                            color: ProductRating.includes(res.value)
                              ? "#445FD2"
                              : "#B2BCCF",
                          }}
                        >
                          {res.name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Paper> */}
              <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 2,
                    height: "auto",
                  }}
                >
                  <Typography sx={FilterTitle}>Quantity</Typography>
                </Box>
                <Box
                  sx={{
                    width: "auto",
                    height: "60px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    borderRadius: "10px",
                  }}
                >
                  <input
                    fullWidth
                    placeholder="Add quantity "
                    type="number"
                    disableUnderline
                    min={1}
                    onChange={(e) => {
                      setProductQty(e.target.value);
                    }}
                    value={ProductQty}
                    style={{
                      width: "100%",
                      height: "52px",
                      background: "#F8FAFB",
                      borderRadius: "10px",
                      border: "none",
                      paddingLeft: "20px",
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  />
                </Box>
              </Paper>

              {/* <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 2,
                    height: "auto",
                  }}
                >
                  <Typography sx={FilterTitle}>Delivery type</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    borderRadius: "10px",
                  }}
                >
                  <Select
                    placeholder="Select Delivery type"
                    sx={{
                      width: "100%",
                      height: "52px",
                      background: "#F8FAFB",
                      borderRadius: "10px",
                      pl: 2,
                      border: "none",
                    }}
                    onChange={(e) => {
                      setStoreDeliveryType(e.target.value);
                    }}
                  >
                    <MenuItem value="Shiprocket"> Shiprocket</MenuItem>
                    <MenuItem value="Delivery"> Seller Delivery</MenuItem>
                  </Select>
                </Box>
              </Paper> */}

              <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 2,
                    height: "auto",
                  }}
                >
                  <Typography sx={FilterTitle}>Company Name</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    borderRadius: "10px",
                  }}
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{
                      width: "100%",
                      height: "52px",
                      background: "#F8FAFB",
                      borderRadius: "10px",
                      border: "none",
                    }}
                    options={
                      Array?.from(
                        new Set(
                          allProductSearch?.map(
                            (option) =>
                              option?.SellerCompanyId?.companyName || ""
                          )
                        )
                      ) || []
                    }
                    value={selectedCompany}
                    onChange={handleSearch}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Company"
                        sx={{
                          width: "100%",
                          height: "52px",
                          background: "#F8FAFB",
                          borderRadius: "10px",
                          border: "none",
                        }}
                      />
                    )}
                  />
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  width: "80%",
                  bgcolor: "transparent",
                  mx: "auto",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "center",
                    mt: 0,
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "95px",
                      height: "42px",
                      background: "#445FD2",
                      borderRadius: "6px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "20px",
                      textAlign: "center",
                      textTransform: "none",
                    }}
                    onClick={storeAllFilterDataFun}
                  >
                    Confirm
                  </Button>

                  <Button
                    value="reset"
                    onClick={(e) => {
                      setstatefilter([]);
                      setPriceRange(0);
                      setProductQty("");
                      setSelectedCompany("");
                      setClear(e.target.value);
                    }}
                    sx={{
                      width: "95px",
                      height: "42px",
                      background: "#fff",
                      borderRadius: "6px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "20px",
                      textAlign: "center",
                      color: "#B5B5C3",
                      ml: 2,
                      textTransform: "none",
                      "&:hover": {
                        background: "#445FD2",
                        color: "#fff",
                      },
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Modal>
        </Grid>
      </Grid>

      {CompanyDetails?.CompanyPreferenceTypes?.length === 0 ? (
        <PreferenceModal companyData={CompanyDetails} />
      ) : null}
      <>
        {loadingMessage ? (
          <Box sx={{ width: "97%", mx: "auto" }}>
            <Skeleton
              variant="rectangular"
              height={280}
              animation="wave"
              sx={{ borderRadius: "10px", mt: 3, width: "100%" }}
            />
          </Box>
        ) : (
          <Box>
            <ImagePoster />
          </Box>
        )}
      </>

      <ProductList />
    </Paper>
  );
};

export default MarketPlace;

const FilterModalStyle = {
  position: "absolute",
  width: "90%",
  maxWidth: { xl: "430px", lg: "430px", md: "430px", sm: "400px", xs: "350px" },
  height: "100%",
  right: "5%",
  top: "04%",
  maxHeight: "90vh",
  overflowY: "scroll",
  background: "#FFFFFF",
  borderRadius: "10px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const FilterTextStyleOne = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#B2BCCF",
  ml: 1.5,
};

const FilterTitle = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "28px",

  color: "#2E2E2E",
};
