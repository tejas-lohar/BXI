import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { customAlphabet } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import mainImg from "../../assets/Images/register/createaccountimg.svg";
import { RegisterValidation } from "../../validation/auth/register";

import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "react-use";
import barterLogo from "../../assets/BXI_LOGO.png";
import Stepper from "../../components/Stepper";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cancle from "../../assets/cancle (1).svg";
import sheetsofDocument from "../../assets/sheets of documents.svg";

import { useCreateAccount, useRocSearch } from "../../Hooks/Auth";
const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#6B7A99",
    },
  },

  typography: {
    fontSize: 20,
  },
});
// const validateEmail = (email) => {
//   return email?.match(
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// };

const CreateAccount = () => {
  const [open, setOpen] = React.useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const InputFieldsData = [
    // {
    //   label: "Company Name",
    //   inputType: "input",
    //   name: "companyName",
    // },
    {
      label: "Select Company Type",
      inputType: "select",
      name: "companyType",
      placeholder: "Select Company Type",
    },
    {
      label: "Phone No",
      inputType: "input",
      name: "phoneNumber",
      maxLength: 10,
    },
    {
      label: "Email Address",
      inputType: "input",
      name: "email",
    },
    {
      label: "Password",
      inputType: showPass ? "input" : "password",
      name: "password",
      maxLength: 16,
      minLength: 8,
    },
    {
      label: "Confirm Password",
      inputType: showPass ? "input" : "password",
      name: "confirmPassword",
      maxLength: 16,
      minLength: 8,
    },
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  // const [companyNameData, setCompanyNameData] = useState();
  const [companyTypeData, setCompanyTypeData] = useState([]);

  const {
    mutate,
    isLoading,
    // isError,
    // data,
    reset,
    error: RegisterError,
  } = useCreateAccount();
  // UseForm From here
  const {
    mutate: RocSearch,
    data: companyData,
    isLoading: RocLoading,
  } = useRocSearch();

  const [isReady] = useDebounce(
    () => {
      RocSearch({ name: companyName });
    },
    1000,
    [companyName]
  );

  // useEffect(() => {
  //   RocSearch(companyName);
  // }, [companyName]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterValidation),
  });
  console.log(errors, "errors");

  useEffect(() => {
    const compnay = companyData?.data?.find(
      (e) => e.companyName === companyName
    );
    console.log(compnay);

    if (!compnay) return;
    setValue("companyName", companyName);
    setValue("cin", compnay?.companyID);
  }, [companyName]);

  const createCompany = handleSubmit((data) => {
    console.log("hit here ", data);
    let email = data.email;
    if (email.includes("@bxiworld.com")) {
      const nanoid = customAlphabet("1234567890abcdef", 10);
      let uuid = nanoid();
      // email = `${}`
      email = email.split("@");
      email = email[0] + "+" + uuid + "@" + email[1];
    }
    mutate(
      { ...data, email },
      {
        onSuccess: (response) => {
          const companyId = response?.data?.newCompany?._id;

          const searchParams = new URLSearchParams();
          searchParams.append("id", companyId);
          searchParams.append("email", email);

          const queryString = searchParams.toString();

          const url = `/otp?${queryString}`;

          navigate(url);
        },

        onError: (error) => {
          console.log(error);
          toast.error(
            error.response?.data?.message ??
              "Issue Going Forward Please Try Again Later",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          reset();
        },
      }
    );
  });

  const getCompanyType = async () => {
    return await axios
      .get("company_type/get_companyTypes")
      .then((res) => {
        setCompanyTypeData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompanyType();
  }, []);

  return (
    <form onSubmit={createCompany}>
      <ToastContainer style={{ fontSize: "16px" }} />
      <Paper
        elevation={0}
        sx={{
          boxShadow: "0px",
          height: "100vh",
          width: "100%",
          maxHeight: "100vh",
          maxWidth: "100vw",
          overflowY: "hidden",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* <BarterHeader /> */}
        <Box>
          <Stepper />
        </Box>
        <Grid
          container
          sx={{
            background: "#fff",
            height: "95vh",
            width: "110%",
          }}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: 12,
            }}
          >
            <Grid
              container
              sx={{
                // height: "25%",
                position: "absolute",
                top: "1%",
                right: "45%",
              }}
            >
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ width: "100px" }}>
                  <img
                    src={barterLogo}
                    alt="img"
                    style={{
                      height: "auto",
                      width: "70px",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography sx={login}>Create Account</Typography>

            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "55%",
                mx: "auto",
                gap: "20px",
                maxWidth: "450px",
                // bgcolor: "#F5F5F5",
              }}
            >
              <ThemeProvider theme={outerTheme}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  loading={!isReady() || RocLoading}
                  options={
                    companyData
                      ? companyData?.data?.map((e) => ({
                          label: e.companyName,
                          id: e.companyID,
                        }))
                      : []
                  }
                  // isOptionEqualToValue
                  // {...register("companyName")}
                  onInputChange={(event, newInputValue, reason) => {
                    setCompanyName(newInputValue);
                  }}
                  sx={{
                    width: "auto",
                    borderRadius: "20px",
                    minWidth: {
                      xl: "425px",
                      lg: "400px",
                      md: "300px",
                      sm: "350px",
                      xs: "250px",
                    },
                    maxWidth: {
                      xl: "430px",
                      lg: "400px",
                      md: "300px",
                      sm: "350px",
                      xs: "250px",
                    },
                    height: "60px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "20px",
                          height: "50px",
                          padding: "0 0px",
                        },
                        width: "100%",
                        borderRadius: "20px",
                      }}
                      label="Company Name"
                    />
                  )}
                />
                {InputFieldsData?.map((el, idx) => {
                  if (el.inputType === "select") {
                    return (
                      <div key={idx} style={{ height: "auto" }}>
                        <CustomDropdown
                          {...register(el.name)}
                          array={companyTypeData}
                          placeholder="Select Company Type"
                          sx={{
                            bgcolor: "red",
                            borderRadius: "20px",
                          }}
                        />

                        <Typography
                          sx={{
                            ml: 1,
                            mt: 0.5,
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors[el.name]?.message}
                        </Typography>
                      </div>
                    );
                  } else {
                    const isPassword = el.label === "Password";
                    const isConfirmPassword = el.label === "Confirm Password";
                    const showField = isPassword
                      ? showPass
                      : isConfirmPassword
                      ? showConfirmPass
                      : false;
                    return (
                      <div
                        key={idx}
                        style={{ height: "60px", position: "relative" }}
                      >
                        <InputField
                          {...register(el.name)}
                          inputType={showField ? "text" : el.inputType}
                          title={el.label}
                          placeholder={el.label}
                          sx={{
                            borderRadius: "20px",
                            paddingRight: "40px", // Add right padding to accommodate the button
                          }}
                          maxLength={el.maxLength}
                          minLength={el.minLength}
                        />
                        <Typography
                          sx={{
                            ml: 1,
                            mt: 0.5,
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors[el.name]?.message}
                        </Typography>
                        {(isPassword || isConfirmPassword) && (
                          <Button
                            sx={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (isPassword) {
                                setShowPass(!showPass);
                              } else if (isConfirmPassword) {
                                setShowConfirmPass(!showConfirmPass);
                              }
                            }}
                          >
                            {showField ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        )}
                      </div>
                    );
                  }
                })}
              </ThemeProvider>

              <Grid
                container
                mt={0}
                sx={{
                  width: "80%",
                  marginLeft: 0,
                  minWidth: {
                    xl: "425px",
                    lg: "400px",
                    md: "300px",
                    sm: "350px",
                    xs: "250px",
                  },
                  marginRight: "auto",
                  mt: -1,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#375DBB",
                    height: "4rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: {
                      xl: "1.8rem",
                      lg: "1.8rem",
                      md: "1.4rem",
                      sm: "1.4rem",
                      xs: "1.4rem",
                    },
                    textAlign: "center",
                    color: "#FFFFFF",
                    textTransform: "none",
                  }}
                  // onClick={next}
                >
                  {isLoading ? (
                    <CircularProgress
                      size="20px"
                      sx={{ color: "white", width: "40%" }}
                    />
                  ) : (
                    "Next"
                  )}
                </Button>

                <br />
                <br />
                <br />

                <Dialog
                  open={open}
                  onClose={handleClose}
                  sx={{
                    backdropFilter: "blur(1px)",
                  }}
                  fullWidth
                  maxWidth="lg"
                  PaperProps={{
                    sx: {
                      width: "50%",
                      height: "auto",
                      minHeight: "280px",
                      maxHeight: "280px",
                      borderRadius: "20px",
                      justifyContent: "center",
                      overflow: "hidden",
                    },
                  }}
                >
                  <DialogContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <img
                        src={Cancle}
                        alt="cancle"
                        onClick={handleClose}
                        style={{
                          color: "rgba(102, 112, 133, 0.37)",
                          height: "10px",
                          //  marginLeft:"730px" ,
                          width: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={sheetsofDocument}
                        alt="documents image"
                        style={{ height: "70px", width: "70px" }}
                      />
                    </Box>

                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{
                        mt: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "24px",
                          color: "#6B7A99",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                        }}
                      >
                        Important Information
                      </Typography>

                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#6B7A99",
                            fontSize: "12px",
                            fontFamily: "Poppins",
                            textAlign: "center",
                            width: "80%",
                          }}
                        >
                          Please keep your GST & Company Bank Details Handy
                        </Typography>
                        <Typography
                          sx={{
                            color: "#6B7A99",
                            fontSize: "12px",
                            fontFamily: "Poppins",
                            textAlign: "center",
                            width: "80%",
                          }}
                        >
                          From Here it will take 3 - 5 Minutes to get your
                          account activated.
                        </Typography>
                      </Box>
                    </DialogContentText>

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 3,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: "60%",
                          textTransform: "none",
                          fontSize: "13px",
                          fontFamily: "Poppins",
                          background: "#375DBB",
                        }}
                        onClick={handleClose}
                      >
                        Continue
                      </Button>
                    </Box>
                  </DialogContent>
                </Dialog>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={1}>
                  <Typography sx={accountText}>
                    Already Have An Account?{" "}
                    <span
                      style={{
                        color: "rgba(55, 93, 187, 1)",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      {" "}
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "rgba(55, 93, 187, 1)",
                        }}
                        to="/login"
                      >
                        Login
                      </Link>
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: {
                xl: "block",
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
              },
              justifyContent: "center",
            }}
          >
            <img
              // src={newMainLogo}
              src={mainImg}
              alt="img"
              style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default CreateAccount;

const InputField = React.forwardRef((props, ref) => {
  return (
    <Box
      sx={{
        width: "auto",
        minWidth: {
          xl: "400px",
          lg: "380px",
          md: "280px",
          sm: "330px",
          xs: "230px",
        },
        maxWidth: {
          xl: "400px",
          lg: "380px",
          md: "280px",
          sm: "330px",
          xs: "230px",
        },
        height: "auto",
        borderRadius: "12px",
        border: "1px #CCCCCC",
        marginTop: "02px",
        position: "relative",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "10%",
          top: "-20%",
          bgcolor: "#fff",
          px: 1,
          fontSize: {
            xl: "14px",
            lg: "14px",
            md: "12px",
            sm: "12px",
            xs: "12px",
          },
        }}
      >
        <label
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,

            color: "#6B7A99",
          }}
        >
          {props.title + "*"}
        </label>
      </Box>
      <input
        ref={ref}
        {...props}
        type={props.inputType}
        placeholder={props.placeholder}
        autoComplete="off"
        style={{
          mt: 2,
          fontSize: "12px",
          width: "100%",
          height: "4rem",
          borderRadius: "12px",
          padding: "0 1rem",
          fontFamily: "Poppins",
          fontStyle: "normal",
          // required: "true",
          fontWeight: 400,
          border: "1px solid #CCCCCC",
          textAlign: "left",
          color: "#6B7A99",
        }}
      />
    </Box>
  );
});

const CustomDropdown = React.forwardRef((props, ref) => {
  return (
    <Box
      sx={{
        width: "auto",
        minWidth: {
          xl: "425px",
          lg: "400px",
          md: "300px",
          sm: "350px",
          xs: "250px",
        },
        maxWidth: {
          xl: "430px",
          lg: "400px",
          md: "280px",
          sm: "350px",
          xs: "250px",
        },
        height: "auto",
        borderRadius: "12px",
        border: "1px #CCCCCC",
        marginTop: "02px",
        position: "relative",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        bgcolor: "gray",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "10%",
          top: "-20%",
          bgcolor: "#fff",
          px: 1,
          fontSize: {
            xl: "14px",
            lg: "14px",
            md: "12px",
            sm: "12px",
            xs: "12px",
          },
        }}
      >
        <label
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            color: "#6B7A99",
          }}
        >
          Company Type
        </label>
      </Box>
      <select
        ref={ref}
        {...props}
        type="text"
        style={{
          mt: 2,
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "4rem",
          borderRadius: "12px",
          padding: "0 1rem",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 400,
          border: "1px solid #CCCCCC",
          textAlign: "left",
          color: "#6B7A99",
        }}
      >
        <option value="" disabled selected hidden>
          {props.placeholder}
        </option>
        {props.array?.map((el, idx) => {
          return (
            <option key={idx} value={el?.CompanyTypeName}>
              {el?.CompanyTypeName}
            </option>
          );
        })}
      </select>
    </Box>
  );
});

const login = {
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
  color: "#6B7A99",
};

const accountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#A1A1A1",
  textAlign: {
    xl: "left",
    lg: "left",
    md: "center",
    sm: "center",
    xs: "center",
  },
};
