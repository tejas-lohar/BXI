import React, { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  Modal,
  Paper,
  Skeleton,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

import { zodResolver } from "@hookform/resolvers/zod";
import { makeStyles } from "@material-ui/core/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Slider from "@mui/material/Slider";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import About from "../../assets/Images/profile/About.svg";
import Address from "../../assets/Images/profile/Address.svg";
import City from "../../assets/Images/profile/Building.svg";
import Cancle from "../../assets/Images/profile/Icon (1).svg";
import Lock from "../../assets/Images/profile/Lock.svg";
import Phone from "../../assets/Images/profile/Phone.svg";
import SecuredLetter from "../../assets/Images/profile/SecuredLetter.svg";
import User from "../../assets/Images/profile/User.svg";
import CameraIcon from "../../assets/Images/profile/CameraIcon.svg";
import profileBxi from "../../assets/Images/profile/intersebxi.svg";
import Avatargenerator from "../../components/AvatarGenerator";
import { getLoggedCompanyDetails } from "../../redux/action/Company/LoggedInCompanyAction";
import { EditProfile } from "../../redux/action/Profile/Edit-Profile";
import { ProfileCompletions } from "../../redux/action/Profile/Profile-Completion";
import {
  useFetchCompaniesPreferencesQuery,
  useFetchCompanyLocationQuery,
  useFetchCompanyTypesForFetchingAllInterestsQuery,
  useUpdateCompanyQuery,
} from "./CompanyHooks";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
const ProfileInterest = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  let dispatch = useDispatch();
  const [pay, setPay] = React.useState("");
  const [AvatarIcon, setAvatarIcon] = useState(null);
  const [value, setValue] = React.useState("1");
  const [ProfileRequest, setProfileRequest] = useState([]);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    email: "",
    companyRegisteredAddress: "",
    city: "",
    pincode: "",
    phone: "",
    bankAccountNo: "",
    ifsc: "",
    branchName: "",
  });
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const { ProfileCompletion } = useSelector((state) => state.profileCompletion);
  let findPercentage =
    typeof ProfileCompletion?.ProfileMessage === "string"
      ? ProfileCompletion?.ProfileMessage.split(" ")
      : null;

  let finalPercentage =
    findPercentage && findPercentage.length >= 4
      ? findPercentage[3]?.toString()?.split(".")
      : null;

  let navigate = useNavigate();
  const data = [
    { id: 1, name: "Airlines" },
    { id: 2, name: "Hotels" },
    { id: 3, name: "Lifestyle" },
  ];
  const { GetLoggedCompanyData } = useSelector(
    (state) => state.GetLoggedCompany
  );
  const { mutate: UpdateCompanyWarehouseLocations, data: companyData } =
    useUpdateCompanyQuery();
  const { data: companyLocations } = useFetchCompanyLocationQuery();
  const {
    register,
    handleSubmit,
    // setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        address1: z.string().min(1),
        address2: z.string().min(1),
        pincode: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
      })
    ),
  });
  const { data: companyTypesForInterests } =
    useFetchCompanyTypesForFetchingAllInterestsQuery();
  const { data: CompanyPreferncesData } = useFetchCompaniesPreferencesQuery();

  useEffect(() => {
    dispatch(getLoggedCompanyDetails());
  }, []);

  const Password = GetLoggedCompanyData?.password?.replace(/./g, "*");
  // const name = GetLoggedCompanyData?.companyName;
  const [BusinessName, setBusinessName] = useState(
    GetLoggedCompanyData?.companyName
      ? GetLoggedCompanyData?.companyName
      : GetLoggedCompanyData?.companyName
  );

  useEffect(() => {
    setBusinessName(GetLoggedCompanyData?.companyName);
  }, [GetLoggedCompanyData?.companyName]);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    refetch: userRefetch,
  } = useGetLoggedInUser();
  const namePass = [
    {
      imgSrc: User,
      label1: "User Name",
      label2: GetLoggedCompanyData?.email,
    },
    {
      imgSrc: Lock,
      label1: "Password",
      label2: Password,
    },
  ];

  const contactDetails = [
    {
      imgSrcContact: User,
      labelContact1: "Name",
      labelContact2: GetLoggedCompanyData?.companyName,
    },
    {
      imgSrcContact: Address,
      labelContact1: "Address",
      labelContact2: GetLoggedCompanyData?.CompanyAddress?.AddressLine,
    },
    {
      imgSrcContact: City,
      labelContact1: "City",
      labelContact2: GetLoggedCompanyData?.CompanyAddress?.City,
    },
    {
      imgSrcContact: About,
      labelContact1: "Postal Code",
      labelContact2: GetLoggedCompanyData?.CompanyAddress?.Pincode,
    },
    {
      imgSrcContact: Phone,
      labelContact1: "Phone Number",
      labelContact2: GetLoggedCompanyData?.phone,
    },
    {
      imgSrcContact: SecuredLetter,
      labelContact1: "E-mail ID",
      labelContact2: GetLoggedCompanyData?.email,
    },
  ];
  const boxFileds = [
    {
      label: "Corporate Name",
      data: GetLoggedCompanyData?.email,
    },
    {
      label: "GST Number",
      data: GetLoggedCompanyData?.gst,
    },
    {
      label: "Merchant Name",
      data: GetLoggedCompanyData?.cin,
    },
    {
      label: "Website",
      data: GetLoggedCompanyData?.companyOnboardingStatus,
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event) => {
    setPay(event.target.value);
  };
  const handleAddWarehouseInfo = handleSubmit((data) => {
    UpdateCompanyWarehouseLocations(
      { ...data },
      {
        onSuccess: (res) => {
          console.log("res", res);
        },
        onError: (err) => {
          console.log("err", err);
        },
      }
    );
  });

  useEffect(() => {
    dispatch(ProfileCompletions());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    dispatch(EditProfile(formData));

    setOpen(false);
    toast.success("Request Sent Admin Sucessfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setReload(!reload);
  };

  const Profile_Request_Status = async () => {
    try {
      const response = await axios.get("company/admineditcompany", {
        withCredentials: true,
      });
      const data = response.data;
      setProfileRequest(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setAvatarIcon(fileObj);
    console.log("fileObj", fileObj, AvatarIcon);
  };

  useEffect(() => {
    Profile_Request_Status();
  }, [reload]);

  let ProfileRequestLength = ProfileRequest?.length - 1;
  const ProfileRequestData = ProfileRequest[ProfileRequestLength];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Delay in milliseconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);
  console.log("serData?.data", userData?.data?.CompanyAvatar?.url);
  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", AvatarIcon);
    await axios
      .post("/api/v1/avatar/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        userRefetch();
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ToastContainer style={{ fontSize: "16px" }} />
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <BreadCrumbHeader MainText={"Profile"} />
        <Grid
          container
          sx={{
            borderRadius: "17px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            textAlign: "center",
          }}
        >
          <Grid
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: {
                  xl: "80%",
                  lg: "80%",
                  md: "90%",
                  sm: "90%",
                  xs: "75%",
                },
                height: "515px",
                background: "#fff",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "1rem",
                mx: "auto",
                p: 4,
                position: "relative",
              }}
            >
              <>
                {loading ? (
                  <Box sx={{ width: "95%", mx: "auto" }}>
                    <Skeleton
                      variant="rectangular"
                      height={100}
                      animation="wave"
                      sx={{ borderRadius: "10px", mt: 1, width: "100%" }}
                    />
                  </Box>
                ) : (
                  <>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontFamily: "Outfit",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "19px",
                        letterSpacing: "0em",
                        color: "#6B7A99",
                      }}
                    >
                      Business Logo
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box
                        sx={{
                          position: "relative",
                          width: 186.64,
                          height: 188.33,
                          // width: 200,
                          // height: 200,
                        }}
                      >
                        <Box
                          component="div"
                          sx={{
                            display: "inline-block",
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: 186.64,
                            height: 188.33,
                            // width: 200,
                            // height: 200,
                            border: "2px solid #6B7A99",
                          }}
                        >
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              overflow: "hidden",
                              border: "3px solid white",
                              width: "97%",
                              height: "97%",
                            }}
                          >
                            <img
                              src={
                                userData?.data?.CompanyAvatar?.url ||
                                "https://bxi-development.s3.amazonaws.com/companyAvatars/03F46EC38968EAC7B1"
                              }
                              alt="profileBxi"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          onChange={handleFileChange}
                        />
                        <Box
                          onClick={handleClick}
                          sx={{
                            position: "absolute",
                            bottom: 5,
                            right: 10,
                            cursor: "pointer",
                          }}
                        >
                          <img src={CameraIcon} alt="CameraIcon" />
                        </Box>
                        {/* <EditIcon
                          sx={{
                            position: "absolute",
                            bottom: 32,
                            right: 91,
                            transform: "translate(50%, 50%)",
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "50%",
                            padding: "5px",
                            cursor: "pointer",
                          }}
                        /> */}
                      </Box>
                    </Box>
                  </>
                )}
              </>
              {AvatarIcon ? (
                <>
                  <Typography>{AvatarIcon?.name}</Typography>
                  <Button
                    onClick={() => {
                      setAvatarIcon(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={uploadAvatar}>Upload</Button>
                </>
              ) : null}

              <Box
                mt={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box sx={boxStyle} mt={1}>
                  <Typography sx={textBox}>Business Name</Typography>
                  <Box
                    sx={{
                      background: "rgba(243, 246, 249, 0.64)",
                      borderRadius: "8px",
                      width: "200px",
                      overflow: "auto",
                      p: 0.7,
                    }}
                  >
                    <Input
                      value={BusinessName}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                      }}
                      sx={{
                        ...textProfile,
                        borderBottom: "none",
                        border: "#757575",
                      }}
                    />
                  </Box>
                </Box>

                {boxFileds?.map((el, idx) => {
                  return (
                    <Box sx={{ ...boxStyle, mt: 3 }} mt={2}>
                      <Typography sx={textBox}>{el.label}</Typography>
                      <Box
                        sx={{
                          background: "rgba(243, 246, 249, 0.64)",
                          borderRadius: "8px",
                          width: "200px",
                          p: 1,
                          overflow: "auto",
                        }}
                      >
                        <Typography sx={textProfile}>{el.data}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className={classes.modalContainer}
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  <Box sx={style}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          ...CommonTextStyle,
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                        variant="h6"
                        // component="h2"
                        id="modal-modal-title"
                      >
                        Edit Profile
                      </Typography>

                      <Box
                        onClick={handleClose}
                        sx={{ ml: "auto", cursor: "pointer" }}
                      >
                        <img
                          src={Cancle}
                          alt="cancle"
                          style={{
                            ...CommonTextStyle,
                            fontSize: "16px",
                            marginTop: "14px",
                            "&:hover": {
                              background: " black",
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography sx={{ mt: 2 }} id="modal-modal-description">
                      <form className={classes.form} onSubmit={handleSubmits}>
                        <Box
                          sx={{
                            overflow: "auto",
                            "::-webkit-scrollbar": {
                              display: "flex",
                            },
                            "::-webkit-scrollbar-thumb": {
                              dynamic: "#8d8e90",
                              minHeight: "10px",
                              borderRadius: "8px",
                            },
                            "::-webkit-scrollbar-thumb:vertical": {
                              miaxHeight: "10px",
                            },
                            maxHeight: "410px",
                            height: "600px",
                            p: 1,
                          }}
                        >
                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Business Name
                            </Typography>
                            <TextField
                              focused
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="Company Name"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Website
                            </Typography>
                            <TextField
                              focused
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              placeholder="website"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>Email</Typography>
                            <TextField
                              focused
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Email"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Address
                            </Typography>
                            <TextField
                              placeholder="Company Registered Address"
                              name="companyRegisteredAddress"
                              value={formData.companyRegisteredAddress}
                              onChange={handleInputChange}
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>City</Typography>
                            <TextField
                              value={formData.city}
                              name="city"
                              onChange={handleInputChange}
                              placeholder="City"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Postal Code
                            </Typography>
                            <TextField
                              value={formData.pincode}
                              name="pincode"
                              onChange={handleInputChange}
                              placeholder="Pin Code"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Phone Number
                            </Typography>
                            <TextField
                              value={formData.phone}
                              name="phone"
                              onChange={handleInputChange}
                              placeholder="Phone Number"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Bank Account No
                            </Typography>
                            <TextField
                              value={formData.bankAccountNo}
                              name="bankAccountNo"
                              onChange={handleInputChange}
                              placeholder="Bank Account No"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              IFSC Code
                            </Typography>
                            <TextField
                              value={formData.ifsc}
                              name="ifsc"
                              onChange={handleInputChange}
                              placeholder="IFSC Code"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>

                          <Box>
                            <Typography sx={CommonTextStyle}>
                              Branch Name
                            </Typography>
                            <TextField
                              value={formData.branchName}
                              name="branchName"
                              onChange={handleInputChange}
                              placeholder="Branch Name"
                              variant="standard"
                              InputProps={InputPropsStyle}
                              sx={TextFieldStyle}
                            />
                          </Box>
                        </Box>

                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.submitButton}
                          sx={{
                            mt: 2,
                            width: "100%",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            textAlign: "center",
                            textTransform: "none",
                            backgroundColor: "#445FD2",
                          }}
                        >
                          Save
                        </Button>
                      </form>
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </Box>
            <Box
              mt={4}
              sx={{
                width: {
                  xl: "80%",
                  lg: "80%",
                  md: "90%",
                  sm: "90%",
                  xs: "75%",
                },
                height: "auto",
                background: "#fff",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "10px",
                mx: "auto",
                p: 4,
              }}
            >
              <Typography sx={headText}>Member Details</Typography>
              <Typography
                sx={{
                  ...subText,
                  width: {
                    xl: "80%",
                    lg: "80%",
                    md: "85%",
                    sm: "85%",
                    xs: "90%",
                  },
                  mx: "auto",
                }}
              >
                {/* Lorem ipsum dolor sit amet consectetur. Augue sed malesuada est
              mauris faucibus mi ipsum libero diam. */}
              </Typography>
              <Box
                mt={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "10px",
                  width: {
                    xl: "90%",
                    lg: "90%",
                    md: "90%",
                    sm: "80%",
                    xs: "100%",
                  },
                  mx: "auto",
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    ...liveBtn,
                    fontSize: {
                      xl: "1.4rem",
                      lg: "1.4rem",
                      md: "1.2rem",
                      sm: "1rem",
                      xs: "1rem",
                    },
                  }}
                  onClick={() => {
                    navigate("/home/company_members");
                  }}
                >
                  View Members
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    ...draftBtn,
                    fontSize: {
                      xl: "1.4rem",
                      lg: "1.4rem",
                      md: "1.2rem",
                      sm: "1rem",
                      xs: "1rem",
                    },
                  }}
                  onClick={() => {
                    navigate("/home/addmember");
                  }}
                >
                  Add Members
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            xl={7}
            lg={7}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              mt: { xl: 1, lg: 1, md: 2, sm: 3, xs: 4 },
            }}
          >
            <Box
              sx={{
                width: {
                  xl: "85%",
                  lg: "85%",
                  md: "90%",
                  sm: "90%",
                  xs: "75%",
                },
                height: "auto",
                background: "#fff",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "10px",
                mx: "auto",
                p: 4,
              }}
            >
              <Typography sx={headText}>Profile Completion</Typography>
              <Typography sx={subText}>
                Please Submit accurate information so that your profile can be
                completed.
              </Typography>

              {ProfileRequestData?.adminAprove === false ? (
                <Typography
                  sx={{
                    width: 300,
                    paddingLeft: 30,
                    paddingTop: 2,
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  Requested
                </Typography>
              ) : null}

              <Box sx={{ width: 300, paddingLeft: 30, paddingTop: 2 }}>
                <Slider
                  aria-label="Always visible"
                  value={
                    finalPercentage && finalPercentage.length > 0
                      ? Number(finalPercentage?.[0])
                      : 0
                  }
                  step={10}
                  valueLabelDisplay="on"
                  readOnly
                />
              </Box>

              <Box>
                <Button
                  endIcon={<MdModeEditOutline />}
                  onClick={handleOpen}
                  sx={{
                    width: "100%",
                    mt: 2,
                    textTransform: "none",
                    color: "#778DA9",
                    fontSize: "20px",
                    fontFamily: "Outfit",
                    fontWeight: 500,
                    lineHeight: "25px",
                    textAlign: "center",
                    borderTop: "inherit",
                    fontStyle: "normal",
                  }}
                >
                  Account Details
                </Button>
              </Box>

              {/* <Box
                mt={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "10px",
                  width: {
                    xl: "65%",
                    lg: "65%",
                    md: "90%",
                    sm: "90%",
                    xs: "100%",
                  },
                  mx: "auto",
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={liveBtn}
                  onClick={() => {
                    navigate("/home/mylistedproducts", {
                      state: { status: "Live" },
                    });
                  }}
                >
                  Live
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={draftBtn}
                  onClick={() => {
                    navigate("/home/mylistedproducts", {
                      state: { status: "In Draft" },
                    });
                  }}
                >
                  in Draft
                </Button>
              </Box> */}
            </Box>
            <Box
              mt={4}
              sx={{
                width: {
                  xl: "85%",
                  lg: "85%",
                  md: "90%",
                  sm: "90%",
                  xs: "75%",
                },

                height: "100%",
                background: "#fff",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "10px",
                mx: "auto",
                p: 4,
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                    variant="fullWidth"
                  >
                    <Tab
                      label={
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontFamily: "Outfit",
                            textTransform: "none",
                          }}
                        >
                          Contact details
                        </Typography>
                      }
                      value="1"
                    />
                    <Tab
                      label={
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontFamily: "Outfit",
                            textTransform: "none",
                          }}
                        >
                          Username & Password
                        </Typography>
                      }
                      value="2"
                    />
                    <Tab
                      label={
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontFamily: "Outfit",
                            textTransform: "none",
                          }}
                        >
                          Payment Details
                        </Typography>
                      }
                      value="3"
                    />

                    {/* <Tab
                      label={
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontFamily: "Outfit",
                            textTransform: "none",
                          }}
                        >
                          Interests
                        </Typography>
                      }
                      value="4"
                    /> */}
                    {/*   <Tab
                    label={
                      <Typography sx={{ fontSize: "1.5rem" , fontFamily: 'Outfit' , textTransform : "none" }}>
                        Warehouse Info
                      </Typography>
                    }
                    value="5"
                  /> */}
                  </TabList>
                </Box>
                <Box
                  sx={{
                    overflow: "auto",
                    "::-webkit-scrollbar": {
                      display: "block",
                    },
                    "::-webkit-scrollbar-thumb": {
                      dynamic: "#8d8e90",
                      height: "0px",
                      borderRadius: "8px",
                    },
                    maxHeight: "310px",
                    height: "300px",
                  }}
                >
                  <TabPanel value="1">
                    {contactDetails?.map((el, idx) => {
                      return (
                        <Grid container>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexDirection: "row",
                              width: "100%",
                              mx: "auto",
                              py: 2,
                              px: 0,
                              gap: 2,
                            }}
                          >
                            <Box>
                              {loading ? (
                                <Box
                                  sx={{
                                    width: "25px",
                                    mx: "auto",
                                    hieght: "25px",
                                  }}
                                >
                                  <Skeleton
                                    variant="circle"
                                    animation="wave"
                                    sx={{
                                      borderRadius: "10px",
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  />
                                </Box>
                              ) : (
                                <img
                                  src={el.imgSrcContact}
                                  alt="user"
                                  style={{ height: "auto", width: "25px" }}
                                />
                              )}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <Typography sx={userName}>
                                {el.labelContact1}
                              </Typography>
                              <Typography sx={nameUser}>
                                {el.labelContact2}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              borderBottom: "1px solid rgba(236, 236, 236, 1)",
                              width: "90%",
                              mx: "auto",
                            }}
                          ></Box>
                        </Grid>
                      );
                    })}
                  </TabPanel>
                  <TabPanel value="2">
                    {namePass?.map((el, idx) => {
                      return (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexDirection: "row",
                              width: "90%",
                              mx: "auto",
                              p: 1,
                              gap: 2,
                            }}
                          >
                            <img
                              src={el.imgSrc}
                              alt="user"
                              style={{ height: "auto", width: "25px" }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <Typography sx={userName}>{el.label1}</Typography>
                              <Typography sx={nameUser}>{el.label2}</Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              borderBottom: "1px solid rgba(236, 236, 236, 1)",
                              width: "90%",
                              mx: "auto",
                            }}
                          ></Box>
                        </>
                      );
                    })}
                  </TabPanel>
                  <TabPanel value="3">
                    <Typography
                      sx={{
                        ...tabText,
                        textAlign: "left",
                        width: {
                          xl: "90%",
                          lg: "90%",
                          md: "50%",
                          sm: "80%",
                          xs: "95%",
                        },
                      }}
                    >
                      Payment Profile
                    </Typography>

                    {/*  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      minWidth: { xl: 650, lg: 520, md: 450, sm: 420, xs: 220 },
                    }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      pay
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={pay}
                      onChange={handleChange1}
                      label="Select"
                      fullWidth
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                    </Select>
                  </FormControl> */}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        width: "90%",
                        mx: "auto",
                        p: 1,
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={userName}>Account Number</Typography>
                        <Typography sx={nameUser}>
                          {GetLoggedCompanyData?.bankdetails?.bankAccountNo}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        borderBottom: "1px solid rgba(236, 236, 236, 1)",
                        width: "90%",
                        mx: "auto",
                      }}
                    ></Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        width: "90%",
                        mx: "auto",
                        p: 1,
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={userName}>Branch Address</Typography>
                        <Typography sx={nameUser}>
                          {GetLoggedCompanyData?.bankdetails?.branchName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        borderBottom: "1px solid rgba(236, 236, 236, 1)",
                        width: "90%",
                        mx: "auto",
                      }}
                    ></Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        width: "90%",
                        mx: "auto",
                        p: 1,
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={userName}>IFSC Code</Typography>
                        <Typography sx={nameUser}>
                          {GetLoggedCompanyData?.bankdetails?.ifsc}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        borderBottom: "1px solid rgba(236, 236, 236, 1)",
                        width: "90%",
                        mx: "auto",
                      }}
                    ></Box>
                  </TabPanel>
                  {/*                   
                  <TabPanel value="4">
                    <Box sx={{ display: "flex", gap: "0px" }}>
                      <FormControl
                        variant="standard"
                        sx={{
                          m: 1,
                          minWidth: {
                            xl: 550,
                            lg: 480,
                            md: 450,
                            sm: 420,
                            xs: 220,
                          },
                          mx: "auto",
                        }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          select
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={pay}
                          onChange={handleChange1}
                          label="Select"
                          fullWidth
                        >
                          {companyTypesForInterests?.data &&
                            companyTypesForInterests?.data?.map((el, idx) => {
                              return (
                                <MenuItem value={el.CompanyTypeName}>
                                  {el.CompanyTypeName}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        sx={{ height: "30%", fontSize: "10px", mt: 2 }}
                      >
                        Add Prefernce
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        width: {
                          xl: "90%",
                          lg: "90%",
                          md: "90%",
                          sm: "100%",
                          xs: "100%",
                        },
                        mx: "auto",
                        mt: 3,
                      }}
                    >
                      <Typography sx={categories}>
                        Selected Categories{" "}
                      </Typography>
                      <Box sx={{ mt: 3, display: "flex", gap: "10px" }}>
                        {CompanyPreferncesData?.data?.Prefernce?.map(
                          (el, idx) => {
                            console.log("=====>", el);
                            return (
                              <>
                                <Box
                                  sx={{
                                    ...cardStyle,

                                    border: `${
                                      selected.includes(el.id)
                                        ? "1px solid #445FD2"
                                        : "1px solid #D9D9D9"
                                    }`,
                                  }}
                                  onClick={() => {
                                    const pastSelected = [...selected];
                                    if (pastSelected.includes(el)) {
                                      setSelected(
                                        pastSelected.filter((e) => e !== el)
                                      );
                                    } else {
                                      setSelected([...pastSelected, el]);
                                    }
                                  }}
                                >
                                  <Typography sx={subTextCate}>
                                    {el.PrefenceName}
                                  </Typography>
                                </Box>
                              </>
                            );
                          }
                        )}
                      </Box>
                    </Box>
                  </TabPanel> */}

                  {/* <TabPanel value="5">
                  <Box>
                    <Typography sx={CommonTextStyle}>
                      {companyLocations?.data.at(0)?.address1}
                    </Typography>
                    <Typography sx={CommonTextStyle}>
                      {companyLocations?.data.at(0)?.address2}
                    </Typography>
                    <Typography sx={CommonTextStyle}>
                      {companyLocations?.data.at(0)?.pincode}
                    </Typography>
                    <Typography sx={CommonTextStyle}>
                      {companyLocations?.data.at(0)?.city}
                    </Typography>
                    <Typography sx={CommonTextStyle}>
                      {companyLocations?.data.at(0)?.state}
                    </Typography>
                  </Box>
                  <form onSubmit={handleAddWarehouseInfo}>
                    <Box>
                      <Typography sx={CommonTextStyle}>Address 1</Typography>

                      <TextField
                        focused
                        placeholder="10 Downing Street"
                        // multiline
                        variant="standard"
                        InputProps={InputPropsStyle}
                        sx={TextFieldStyle}
                        {...register("address1")}
                        // onChange={(e) => setProductName(e.target.value)}
                      />
                    </Box>
                    <Box>
                      <Typography sx={CommonTextStyle}>Address 2</Typography>

                      <TextField
                        focused
                        placeholder="20 Downing Street"
                        // multiline
                        variant="standard"
                        InputProps={InputPropsStyle}
                        sx={TextFieldStyle}
                        {...register("address2")}
                        // onChange={(e) => setProductName(e.target.value)}
                      />
                    </Box>
                    <Box>
                      <Typography sx={CommonTextStyle}>Pincode</Typography>

                      <TextField
                        focused
                        placeholder="380004"
                        // multiline
                        variant="standard"
                        InputProps={InputPropsStyle}
                        sx={TextFieldStyle}
                        {...register("pincode")}
                        // onChange={(e) => setProductName(e.target.value)}
                      />
                    </Box>
                    <Box>
                      <Typography sx={CommonTextStyle}>City</Typography>

                      <TextField
                        focused
                        placeholder="Ahmedabad"
                        // multiline
                        variant="standard"
                        InputProps={InputPropsStyle}
                        sx={TextFieldStyle}
                        {...register("city")}
                        // onChange={(e) => setProductName(e.target.value)}
                      />
                    </Box>
                    <Box>
                      <Typography sx={CommonTextStyle}>State</Typography>

                      <TextField
                        focused
                        placeholder="Gujarat"
                        // multiline
                        variant="standard"
                        InputProps={InputPropsStyle}
                        sx={TextFieldStyle}
                        {...register("state")}
                        // onChange={(e) => setProductName(e.target.value)}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ textTransform: "none", marginTop: "2rem" }}
                    >
                      Add Details
                    </Button>
                  </form>
                      </TabPanel> */}
                </Box>
              </TabContext>
            </Box>
            <Box
              mt={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                width: "100%",
                mx: "auto",
                gap: "15px",
              }}
            >
              <Button sx={conformBtn}>Confirm details</Button>
              <Button sx={resetAll}>Reset All</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProfileInterest;

const headText = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 500,
  textTransform: "none",
  fontSize: {
    xl: "2rem",
    lg: "2rem",
    md: "1.9rem",
    sm: "1.6rem",
    xs: "1.4rem",
  },
  textAlign: "center",
  color: "#778DA9",
};

const subText = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1rem",
    xs: "0.8rem",
  },
  textAlign: "center",
  color: "#ADB8CC",
  lineHeight: "14px",
  marginTop: "5px",
  width: { xl: "48%", lg: "48%", md: "48%", sm: "95%", xs: "100%" },
  mx: "auto",
};

const liveBtn = {
  background: "#445FD2",
  borderRadius: "10px",
  padding: "7px",
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.5rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 300,
  textAlign: "center",
  color: "#fff",
  textTransform: "none",
};
const draftBtn = {
  borderRadius: "10px",
  padding: "10px",
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.5rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 500,
  textAlign: "center",
  color: "#445FD2",
  textTransform: "none",
};

const tabText = {
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.1rem",
    sm: "0.8rem",
    xs: "0.8rem",
  },
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  textAlign: "center",
  color: "#6B7A99",
  textTransform: "none",
  width: { xl: "45%", lg: "50%", md: "50%", sm: "80%", xs: "95%" },
  mx: "auto",
  lineHeight: "2rem",
  mt: 2,
};
const TextFieldStyle = {
  width: "100%",
  height: "35px",
  // background: "rgba(250, 251, 253, 1)",
  background: "#F3F6F9",
  borderRadius: "9px",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#6B7A99",
  overflow: "auto",
  paddingLeft: "0px",
  // textAlign
  "&:focus": {
    outline: "none",
  },
};
const InputPropsStyle = {
  disableUnderline: true,
  style: {
    // background: "rgba(250, 251, 253, 1)",
    backgroundColor: "#F3F6F9",
    fontFamily: "Poppins",
    color: "#6B7A99",
    borderRadius: "9px",
    height: "100%",
    paddingLeft: "10px",
    fontSize: "14px",
  },
};

const conformBtn = {
  width: "80%",
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  textAlign: "center",
  color: "#fff",
  textTransform: "none",
  background: " #445FD2",
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.5rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  borderRadius: "1rem",
  "&:hover": {
    background: " #445FD2",
  },
};

const resetAll = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  textAlign: "center",
  color: "#9AA3B9",
  textTransform: "none",
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.5rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
};

const textBox = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.5rem",
    lg: "1.5rem",
    md: "1.2rem",
    sm: "1rem",
    xs: "1rem",
  },
  textAlign: "center",
  color: "#6B7A99",
  textTransform: "none",
};

const boxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  flexDirection: "row",
};

const userName = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  color: "#6B7A99",
  textAlign: "left",
};

const nameUser = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: "rgba(107, 122, 153, 0.5)",
  textAlign: "left",
};

const cardStyle = {
  width: "15%",
  height: "auto",

  borderRadius: "10px",
  p: 1.5,
  cursor: "pointer",
};

const categories = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 14,
  color: "#6B7A99",
  textAlign: { lg: "left", xl: "left", md: "left", sm: "left", xs: "center" },
};

const subTextCate = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.2rem",
    sm: "1rem",
    xs: "1rem",
  },
  textAlign: "center",
  color: "#ADB8CC",
  mt: 0.5,
};

const textProfile = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  textAlign: "left",
  color: "#757575",
};
const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  color: "#6B7A99",
  paddingBottom: "5px",
  mt: 2,
  textAlign: "left",
  lineHeight: "16px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

const classes = makeStyles((theme) => ({
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    outline: "none",
    width: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));
