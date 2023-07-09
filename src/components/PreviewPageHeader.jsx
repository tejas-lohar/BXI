import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LeftArrow from "../../src/assets/Images/payment/LeftArrow.png";
import useGetCompanyTypeData from "../Hooks/CompanyData/useGetCompanyTypeData";
import useGetLoggedInUser from "../Hooks/LoggedInUser/useGetLoggedInUser";
import useGetProductById from "../Hooks/ProductActions/useGetProductById";
import { useRemoveWishlistProductByProductId } from "../Hooks/ProductActions/useRemoveWishlistProduct";
import ChatIcon from "../assets/HeaderIcon/Chat.png";
import Checkboxbase from "../assets/HeaderIcon/Checkboxbase.svg";
import Featuredicon from "../assets/HeaderIcon/Featuredicon.svg";
import ShareIcon from "../assets/Images/CommonImages/ShareIcon.svg";
import { sendMassage } from "../redux/action/Chat/Send-Massages";
import { notifications } from "../redux/action/Notification/notification";
import { GetProductByIdAction } from "../redux/action/ProductActions/GetProductByIdAction";
const PreviewPageHeader = (props) => {
  let { id } = useParams();
  let ProductId = id;
  const [open, setOpen] = React.useState(false);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [messageOption, setMessageOption] = useState("");
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const [wishlistDataGet, setWishlistDataGet] = useState([]);

  const { data: loggedInUserData } = useGetLoggedInUser();
  let login_User = loggedInUserData?.data?._id;

  // const {
  //   data: wishlistDataGet,
  //   isLoading: WishlistLoading,
  //   error: WishlistError,
  //   refetch: refetchWishlistData,
  // } = useGetWishlistData();
  const {
    data: Productdata,
    isLoading: DataLoading,
    error: DataError,
    refetch: ProductRefetch,
  } = useGetProductById(id);

  console.log("ProductdataProductdata", Productdata);

  const {
    data: CompanyTypeData,
    isLoading: CompanyTypeLoading,
    error: CompanyTypeError,
    refetch: CompanyTypeRefetch,
  } = useGetCompanyTypeData(Productdata?.ProductType);

  console.log("CompanyTypeData", CompanyTypeData?.data?.CompanyTypeName);

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("111111", res);
        setGetProductByIdData(res?.data);
      });
  }
  useEffect(() => {
    GetProductByid();
  }, []);
  async function getWishtlistProduct() {
    axios
      .get("wishlist/get_wishlist_product", { withCredentials: true })
      .then((res) => {
        setWishlistDataGet(res.data);
      });
  }

  useEffect(() => {
    getWishtlistProduct();
  }, []);

  const { GetProductByIdDatas } = useSelector((state) => state?.GetProductById);

  let SellerCompanyId = GetProductByIdDatas?.SellerCompanyId;
  let companyName = loggedInUserData?.data?.companyName;

  const { data: mutateRemoveWishlistData, mutate: removefromwishlist } =
    useRemoveWishlistProductByProductId();

  // async function handleAddToWishlist(id) {
  //   addtowishlist(id, props?.ProductType);
  //   setLike(true);
  // }

  const GetProductShareLink = async (id) => {
    toast.info("Url Copied", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(
      `https://www.testing-bxi.unada.in/home/appreal` + `/${id}`
    );
  };

  const step = [
    {
      id: 1,
      message: "Product Defective/Damaged",
    },
    {
      id: 2,
      message: "Product not Delivered ",
    },
    {
      id: 3,
      message: "Raise a ticket with BXI ",
    },
    {
      id: 4,
      message: "Issue with Invoicing ",
    },
    {
      id: 5,
      message: "Issue with Pricing",
    },
    {
      id: 6,
      message: "Issue with Tokens",
    },
  ];

  useEffect(() => {
    dispatch(GetProductByIdAction(ProductId));
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handleAddToWishlist(id) {
    axios
      .post("wishlist/add_to_wishlist", { id: id }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        getWishtlistProduct();
      });
  }

  async function handleRemoveWishlist(id) {
    removefromwishlist(id);
    getWishtlistProduct();
    setLike(false);
  }
  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: {
          xl: 0,
          lg: 0,
          md: 0,
          sm: 1,
          xs: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
          width: {
            xl: "120px",
            lg: "120px",
            md: "120px",
            sm: "120px",
            xs: "auto",
          },
          paddingLeft: "10px",
          mt: "10px",
        }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <Box
          component="img"
          src={LeftArrow}
          alt="LeftArrow"
          sx={{
            width: {
              xl: "22px",
              lg: "22px",
              md: "18px",
              sm: "16px",
              xs: "16px",
            },
            height: "auto",
            cursor: "pointer",
            size: "cover",
          }}
          onClick={() => {
            navigate("/home");
          }}
        />
      </Box>
      {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
      CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
      CompanyTypeData?.data?.CompanyTypeName === "Office Supply" ||
      CompanyTypeData?.data?.CompanyTypeName === "Others" ||
      CompanyTypeData?.data?.CompanyTypeName === "QSR" ? null : (
        <Box
          sx={{
            mt: 1,

            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              ...semi,
              color: "#4D4D4D",
              fontSize: {
                xl: "24px",
                lg: "24px",
                md: "20px",
                sm: "16px",
                xs: "16px",
              },
              fontFamily: "Poppins",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {GetProductByIdData?.ProductName}
          </Typography>
          <Typography
            sx={{
              ...semi,
              color: "#6B7A99",
              textAlign: "justify",
              fontSize: {
                xl: "14px",
                lg: "14px",
                md: "12px",
                sm: "8px",
                xs: "8px",
              },
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            {GetProductByIdData?.SellerCompanyName}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: {
            xl: "15px",
            lg: "15px",
            md: "12px",
            sm: "12px",
            xs: "10px",
          },
          alignItems: "center",
          alignContent: "center",
          allignSelf: "center",
          cursor: "pointer",
          // flexDirection: {
          //   xl: "row",
          //   lg: "row",
          //   md: "row",
          //   sm: "row",
          //   xs: "column",
          // },
        }}
      >
        <Box
          component="img"
          src={ChatIcon}
          sx={{ ...HeaderIconStyle, p: 1 }}
          onClick={handleClickOpen}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="xs"
          sx={{
            backdropFilter: "blur(2px)",
          }}
          PaperProps={{
            sx: {
              width: "50%",
              maxHeight: 500,
              borderRadius: "20px",
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#6B7A99",
                  }}
                >
                  Please select your Query
                  <br />
                </Typography>
              </Box>
              <Box>
                <CloseIcon
                  sx={{
                    color: "#667085",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (open === false) {
                      setOpen(true);
                    } else {
                      setOpen(false);
                    }
                  }}
                />
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "20px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "orange",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "red",
                borderRadius: "2px",
              },
            }}
          >
            {step.map((item, idx) => {
              return (
                <div key={idx}>
                  <Box
                    sx={{
                      border: "1.5px solid #E4E7EC",
                      borderRadius: "10px",
                      height: "auto",
                      minHeight: "48px",
                      mt: 1.5,
                      cursor: "pointer",
                      "&:hover": {
                        border: "1.5px solid #445FD2",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={() => {
                      setDisplay(item.message);
                    }}
                    onMouseLeave={() => {
                      setDisplay(false);
                    }}
                    onClick={() => {
                      const userId = async (companyId) => {
                        try {
                          const user = await axios.get(
                            `support/getuser?companyId=${companyId}`,
                            {
                              withCredentials: true,
                            }
                          );
                          const userId = user.data._id;

                          await UpdateNotifications(userId);
                          await SendNotifications(SellerCompanyId, login_User);
                        } catch (error) {
                          console.log(error);
                        }
                      };

                      const UpdateNotifications = async (
                        userId,
                        admin = "6437d9efb16a5049913d70a5"
                      ) => {
                        try {
                          const res1 = await axios.post(
                            `support/create_room`,
                            { userId, admin },
                            { withCredentials: true }
                          );
                          const roomId = res1.data._id;
                          const messageType = "text";
                          const messageContent = item.message;
                          await dispatch(
                            sendMassage(messageContent, roomId, messageType)
                          );
                          navigate("/home/message");
                        } catch (err) {
                          console.log(err);
                        }
                      };

                      const SendNotifications = async (receiver, sender) => {
                        try {
                          const message = `${companyName} Company has contacted you`;
                          const type = "messages";
                          await dispatch(
                            notifications(receiver, sender, message, type)
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      };
                      userId(SellerCompanyId);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "97%",
                      }}
                      onClick={() => {
                        setMessageOption(item.message);
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: "30px",
                          width: "10%",
                          opacity: item.message === display ? "1" : "0.5",
                        }}
                        src={Featuredicon}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#6B7A99",
                          width: "80%",
                        }}
                      >
                        {item.message}
                      </Typography>
                      {item.message === display ? (
                        <Box
                          component="img"
                          sx={{
                            height: "15px",
                            width: "10%",
                          }}
                          src={Checkboxbase}
                        />
                      ) : null}
                    </Box>
                  </Box>
                </div>
              );
            })}
          </DialogContent>
        </Dialog>

        <Box
          sx={{
            ...HeaderIconStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            p: {
              xl: 1.2,
              lg: 1.2,
              md: 1.2,
              sm: 0.8,
              xs: 0.8,
            },
          }}
          onClick={() => {
            wishlistDataGet &&
            wishlistDataGet?.find((item) => item?.ProductId?._id === ProductId)
              ? handleRemoveWishlist(ProductId)
              : handleAddToWishlist(ProductId);
          }}
        >
          {wishlistDataGet &&
          wishlistDataGet?.find(
            (item) => item?.ProductId?._id === ProductId
          ) ? (
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                handleRemoveWishlist(ProductId);
              }}
            >
              <AiFillHeart color={"red"} size={"20px"} />
            </button>
          ) : (
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "#6B7A99",
              }}
              onClick={() => {
                handleAddToWishlist(ProductId);
              }}
            >
              <AiFillHeart color={"#c3cad9"} size={"20px"} />
            </button>
          )}
        </Box>

        <Box
          sx={{
            ...HeaderIconStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            p: {
              xl: 1.5,
              lg: 1.5,
              md: 1.5,
              sm: 1,
              xs: 1,
            },
          }}
          onClick={() => GetProductShareLink(ProductId)}
        >
          <img src={ShareIcon} />{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewPageHeader;

const HeaderIconStyle = {
  border: "1px solid #8C8C8C",
  borderRadius: "6px",
  height: "auto",
  width: {
    xl: "30px",
    lg: "30px",
    md: "30px",
    sm: "20px",
    xs: "20px",
  },
  // padding: {
  //   xl: "10px",
  //   lg: "10px",
  //   md: "10px",
  //   sm: "8px",
  //   xs: "8px",
  // },
  mt: { xl: 0, lg: 0, md: 0, sm: 1, xs: 1 },
};

const semi = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "2.2rem",
    lg: "2.2rem",
    md: "2.2rem",
    sm: "2rem",
    xs: "2rem",
  },
  color: "#4D4D4D",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};
