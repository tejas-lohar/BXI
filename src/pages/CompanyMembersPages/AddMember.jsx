import {
  Paper,
  Box,
  Typography,
  Input,
  Button,
  FormGroup,
  Checkbox,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toast, ToastContainer } from "react-toastify";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useGetProductCategory from "../../Hooks/GetProductCategories/useGetProductCategories";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Label } from "@mui/icons-material";
import { BrandingWatermarkRounded } from "@material-ui/icons";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#445FD2",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const useGetAllRoles = () =>
  useQuery("all-roles", async () => {
    return (await axios.get("/api/v1/roles/all-roles")).data;
  });

export const AddMember = () => {
  const [productRights, setProductRights] = useState("viewonly");
  const [roleAndPermission, setRoleAndPermission] = useState("Yes");

  const ProductRightsChange = (event) => {
    setProductRights(event.target.value);
  };

  const RoleAndPermissionChange = (event) => {
    console.log("dfjbgvufy", event.target.value);
    setRoleAndPermission(event.target.value);
  };

  let navigate = useNavigate();

  const {
    data: productCategoryData,
    isLoading,
    isError,
  } = useGetProductCategory();

  const { register, handleSubmit } = useForm();

  const { data: roledata } = useGetAllRoles();

  console.log("register", register);

  // console.log("roledata", roledata);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone:"",
    role: "",
    password: "",
    confirmpassword:"",
    productCategory: [],
    productRights: "",
    roleAndPermission: "",
  });

  const addUserFormSubmitHandler = handleSubmit(async (formData) => {
    // e.preventDefault();


    console.log("formData",formData)

    if (formData.name === "") {
      // alert("Please Enter Name");
     toast.error("Please Enter Name", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
     return;
    } else if (formData.email === "") {
      // alert("Please Enter Email");
      toast.error("Please Enter Email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }else if (formData.phone === "") {
      // alert("Please Enter Email");
      toast.error("Please Enter Phone Number", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
     else if (formData.roleId === "") {
      // alert("Please Select Role");
      toast.error("Please Select Role", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (formData.password === "") {
      // alert("Please Enter Password");
      toast.error("Please Enter Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }else if (formData.confirmpassword === "") {
      // alert("Please Enter Confirm Password");
      toast.error("Please Enter Confirm Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }else if (formData.tokens === "") {
      // alert("Please Select Tokens");
      toast.error("Please Select Tokens", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (formData.tokenlimit === "") {
      // alert("Please Select Token Limit");
      toast.error("Please Select Token Limit", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      await axios
        .post(
          "/api/v1/roles",
          {
            name: formData.name,
            email: formData.email,
            phone : formData.phone,
            roleId: formData.roleId.toString(),
            password: formData.password,
            confirmpassword : formData.confirmpassword ,
            tokens: formData.tokens,
            tokenlimit: formData.tokenlimit,
            productRights: productRights,
            roleAndPermission: roleAndPermission,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("role res", res.data);
          if (res.data) {
            // alert("Member Added Successfully");
            toast.success("Member Added Successfully", {
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
              navigate("/home/dashboard");
            }, 2000);
          }
        });
    }
  });

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "transparent",
        boxShadow: "none",
      }}
      elevation={0}
    >
  
      <BreadCrumbHeader MainText={"Add User Details"} />
      <Paper
        sx={{
          width: "100%",
          mx: "auto",
          height: "100%",
          borderRadius: "17px",
        }}
        elevation={0}
      >
        <Grid container>
          <Box
            sx={{
              width: "90%",
              height: "100%",
              mx: "auto",
              py: "20px",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              bgcolor: "transparent",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column ",
              },
            }}
          >
            <Grid item xl={12} lg={12} sd={12} xs={12} md={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    ml: 0,
                    mr: "auto",
                  }}
                >
                  <Typography sx={{...TitletextStyle , fontSize : "16px" , fontWeight :500 ,color: "#6B7A99" }}>
                    Name & E mail Address of the User
                  </Typography>
                  <Typography sx={TitleDescriptionStyle}>
                    Type A name & Email for login in to the account.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "auto",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "transparent",
                  mt: "30px",
                }}
              >
                <Box
                  sx={{
                    height: "90px",
                    display: "grid",
                  }}
                >
                  <Typography sx={TitletextStyle}>Member Name </Typography>
                  <input
                    style={InputStyle}
                    fullWidth
                    placeholder="Name"
                    {...register("name")}
                  />
                </Box>
                <Box
                  sx={{
                    height: "90px",
                    display: "grid",
                  }}
                >
                  <Typography sx={TitletextStyle}>Member Email </Typography>
                  <input
                    style={InputStyle}
                    fullWidth
                    placeholder="E-Mail"
                    {...register("email")}
                  />
                </Box>
                <Box
                  sx={{
                    height: "90px",
                    display: "grid",
                  }}
                >
                  <Typography sx={TitletextStyle}>Member Phone no. </Typography>
                  <input
                    style={InputStyle}
                    fullWidth
                    placeholder="Phone no."
                    {...register("phone")}
                  />
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>

        


        <Grid container>
          <Box
            sx={{
              width: "90%",
              height: "auto",
              mx: "auto",
              // py: "20px",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              bgcolor: "transparent",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column ",
              },
            }}
          >


            <Grid item xl={12} lg={12} sd={12} xs={12} md={12}>

            <Box
            sx={{
              width: "100%",
              height: "auto",
            }}
          >
            <Box
              sx={{
                width: "80%",
                ml: 0,
                mr: "auto",
              }}
            >
              <Typography sx={{...TitletextStyle , fontSize : "16px" , fontWeight :500 ,color: "#6B7A99" }}>
              Role & Rights of the User
              </Typography>
              <Typography sx={{...TitleDescriptionStyle , maxWidth : "805px"}}>
              Lorem ipsum dolor sit amet consectetur. Vestibulum condimentum integer metus amet dignissim maecenas praesent euismod ac.
              </Typography>
            </Box>
          </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "auto" ,
                  mt:2
                }}
              >

                 <Typography sx={TitletextStyle}>Role of the User</Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  flexWrap: "wrap",
                  height: "255px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                  // gap: "20px",
                  bgcolor: "transparent",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "352px",
                    height: "90px",
                    display: "grid",
                  }}
                >
                   <Typography sx={TitletextStyle}> </Typography> 
                  <select
                  style={{
                    ...InputStyle,
                    width: "50%",
                    borderRedius: "10px",
                    minWidth: "366px",
                    marginTop:"40px"
                  }}
                  fullWidth
                  placeholder="Select"
                  {...register("roleId")}
                >  {roledata?.roles?.map((role) => (
                  <option key={role._id} value={role._id}>
                  {role.RoleName}
                </option>
                ))}
                </select>
                </Box>



                <Grid container>
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    mt:1
                  }}
                >
                  <Typography sx={{...TitletextStyle , fontWeight : 400}}>
                    Rights of the User
                  </Typography>
                </Box>
           
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: "20px",
                  mt:2
                }}
                >
                
                <Grid item xl={12} lg={12} sd={12} xs={12} md={12}>  
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <input type="checkbox" {...register("productRights")} style={{
                      marginBottom: "26px"
                    }}  />
                    <Typography sx={CheckboxtextStyle}>
                      Purchase<br></br><span  style={check}>( Can burn the tokens )</span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                      mt:2
                    }}
                  >
                    <input type="checkbox" {...register("purchaseRights")} style={{
                      marginBottom: "26px"
                    }}  />
                    <Typography sx={CheckboxtextStyle}>
                      Sales<br></br> <span  style={check}>( Can earn the tokens ) </span>
                    </Typography>
                  </Box>
</Grid>

<Grid item xl={12} lg={12} sd={12} xs={12} md={12}>
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                  width: "max-content",
                  ml:40
                }}
              >
                <input type="checkbox" {...register("salesRights")} style={{
                  marginBottom: "26px"
                }}  />
                <Typography sx={{...CheckboxtextStyle , width:"auto"}}>
                  Finance<br></br><span  style={check}>( Can see the summary and statements )</span>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                  mt:2 ,
                  width: "max-content",
                  ml:40
                }}
              >
                <input type="checkbox" {...register("financeRights")} style={{
                  marginBottom: "26px"
                }}  />
                <Typography sx={{...CheckboxtextStyle , width:"auto"}}>
                  Custom permissions
                  <br></br><span style={check}>( Super admin can select the permissions to be
                  given )</span>
                </Typography>
              </Box>
              </Grid>
                </Box>  
                </Grid>

                
                <Grid
                item
                xl={8}
                lg={8}
                sd={12}
                xs={12}
                md={12}
              
              >
                <Box
                  sx={{
                    display: "grid",
                    height: "100px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "transparent",
                  }}
                >
                  <Box
                    sx={{
                      height: "-1px",
                      display: "flex",
                      justifyContent: "space-between",
                      mt:1
                    }}
                  >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                    <Typography sx={{...TitletextStyle , fontWeight : 400}}>
                    Editing rights of the User
                  </Typography>
                      <FormControlLabel
                        value="viewonly"
                        onChange={ProductRightsChange}
                        control={
                          <Radio
                            sx={{
                              color: "#445FD2",
                              "& .MuiSvgIcon-root": {
                                fontSize: 22,
                              },
                            }}
                          />
                        }
                        label={<StyledLabel>View Only</StyledLabel>}
                      />
                      <FormControlLabel
                        value="view&edit"
                        sx={{
                          ml: 5,
                        }}
                        control={
                          <Radio
                            sx={{
                              color: "#445FD2",
                              "& .MuiSvgIcon-root": {
                                fontSize: 22,
                              },
                            }}
                          />
                        }
                        label={<StyledLabel>View & Edit</StyledLabel>}
                      />
                    </RadioGroup>
                  </Box>
                </Box>
              </Grid>
                {/* <Box
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "90px",
                    display: "grid",
                    mt: 1,
                  }}
                >
                  <Typography sx={TitletextStyle}>Rights</Typography>
                  <Select
                    sx={{
                      color: "#adb8cc",
                      width: "100%",
                      height: "40px",
                      borderColor: "#E6E9EE",
                      borderRadius: "4px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
                    {...register("tokens")}
                  >
                    <MenuItem value={"purchase"}>
                      Purchase - can burn the tokens
                    </MenuItem>
                    <MenuItem value={"sales"}>
                      Sales - can earn the tokens
                    </MenuItem>
                    <MenuItem value={"finance"}>
                      {" "}
                      Finance - can see the summary and statements
                    </MenuItem>
                    <MenuItem value={"custom"}>
                      {" "}
                      Custom permissions - super admin can select the
                      permissions to be given
                    </MenuItem>
                  </Select>
                </Box> */}
              </Box>
            </Grid>
          </Box>
        </Grid>


        <Grid container>
          <Box
            sx={{
              width: "90%",
              height: "auto",
              mx: "auto",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              bgcolor: "transparent",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column ",
              },
            }}
          >
            <Grid item xl={12} lg={12} sd={12} xs={12} md={12}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "700px",
                  height: "auto",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    ml: 0,
                    mr: "auto",
                    mt:5
                  }}
                >
                  <Typography sx={{...TitletextStyle , mt:3}}>Tokens Details</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      mt:1
                    }}
                  >
                    <Typography sx={{...TitleDescriptionStyle, fontSize: "16px" , fontWeight: 400 , color: "#ADB8CC"}}>
                      Add Tokens Limit
                    </Typography>
                    &nbsp;&nbsp;&nbsp;
                    <select
                      style={{
                        ...InputStyle,
                        width: "30%",
                        color: "#445FD2",
                        borderRedius: "10px",
                      }}
                      fullWidth
                      placeholder="Select"
                      {...register("tokenlimit")}
                    >
                      <option value="50000">Burn Upton 50000 Tokens</option>
                      <option value="100000">Burn Upton 100000 Tokens </option>
                      <option value="250000">Burn Upton 250000 Tokens</option>
                      <option value="500000">Burn Upton 500000 Tokens</option>
                    </select>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Box
        sx={{
          width: "100%",
          maxWidth: "700px",
          height: "auto",
        }}
      >
        <Box
          sx={{
            width: "80%",
            ml: 8,
            mr: "auto",
            mt:2
          }}
        >
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <Typography sx={{...TitletextStyle , fontWeight : 400}}>
                User can edit the member role & Permissions of other
                user?
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={roleAndPermission}
              onChange={RoleAndPermissionChange}
            >
          
              <FormControlLabel
              value="Yes"
              control={
                <Radio
                  sx={{
                    color: "#445FD2",
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={<StyledLabel>Yes</StyledLabel>}
            />

            <FormControlLabel
            value="No"
            sx={{
              ml: 5,
            }}
            control={
              <Radio
                sx={{
                  color: "#445FD2",
                  "& .MuiSvgIcon-root": {
                    fontSize: 22,
                  },
                }}
              />
            }
            label={<StyledLabel>No</StyledLabel>}
          />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>



        <Grid container>
          <Box
            sx={{
              width: "90%",
              height: "100%",
              mx: "auto",
              py: "20px",
              display: "flex",
              // justifyContent: "flex-end",
              gap: "1rem",
              bgcolor: "transparent",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column ",
              },
            }}
          >
          <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
            height: "100%",
            mt: 0,
          }}
              >
                <Box
                  sx={{
                    width: "80%",
                    ml: 0,
                    mr: "auto",
                  }}
                  >
                  <Typography sx={TitletextStyle}>Password Details</Typography>

                  <Grid item xl={12} lg={12} sd={12} xs={12} md={12}>
                  <Box
                  sx={{
                    display: "grid",
                    minWidth: "425px",
                    height: "100px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  >
      
                  <Box
                  sx={{
                    display: "flex",
                    height: "auto",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "transparent",
                    mt: "10px",
                  }}
                >
                  <Box
                    sx={{
                      height: "90px",
                      display: "grid",
                    }}
                  >
                  <Typography sx={TitletextStyle}>Enter Password </Typography>
                  <input
                    style={InputStyle}
                    fullWidth
                    placeholder="Enter Password"
                    {...register("password")}
                  />
                  </Box>
                  <Box
                    sx={{
                      height: "90px",
                      display: "grid",
                      ml:10
                    }}
                  >
                  <Typography sx={TitletextStyle}>Confirm Password </Typography>
                  <input
                    style={InputStyle}
                    fullWidth
                    placeholder="Enter Password"
                    {...register("confirmpassword")}
                  />
                  </Box>
                  </Box>
                  
                </Box>
      
                  </Grid>
                </Box>
              </Box>



         
          </Box>
        </Grid>
        <Box
          sx={{
            width: "90%",
            minHeight: "100px",
            height: "100%",
            mx: "auto",
            borderTop: "0.8px solid #EAEAEA",
            my: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxWidth: "450px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "1rem",
              alignContent: "center",
            }}
          >
            <Button
              sx={{
                width: "175px",
                height: "34.99px",
                background: "#fff",
                borderRadius: "5px",
                color: "#445FD2",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",
                "&:hover": {
                  border: "1px solid #445FD2",
                },
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: "175px",
                height: "34.99px",
                background: "#445FD2",
                borderRadius: "5px",
                color: "#fff",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",
                "&:hover": {
                  border: "1px solid #445FD2",
                  color: "#445FD2",
                },
                textTransform: "none",
              }}
              onClick={addUserFormSubmitHandler}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

const CheckboxtextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "20px",
  color: "#6B7A99",
};

const TitletextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
  width: {
    lg: "100%",
    xl: "100%",
    md: "100%",
    sm: "100%",
    xs: "75%",
  },
};

const TitleDescriptionStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  mt: 1,
  color: "#ADB8CC",
  maxWidth: "348px",
};

const InputStyle = {
  height: "44px",
  width: "90%",
  maxWidth: "350px",
  minWidth: "350px",
  borderRadius: "4px",
  padding: "11px 363px 11px 16",
  border: "1.5px solid #E6E9EE",
  paddingLeft: "16px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "22px",
  display: "flex",
  alignItems: "center",
  color: "#adb8cc",
};

const DropDownInputStyle = {
  fontFamily: "Poppins",
  height: "44px",
  width: "407px",
  borderRadius: "4px",
  padding: "11px 363px 11px 16",
  border: "1.5px solid #E6E9EE",
  paddingLeft: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "22px",
  display: "flex",
  alignItems: "center",
  color: "#adb8cc",
  //  option hover effect
};

const StyledLabel = styled("span")({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6B7A99",
});



const check = {
  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "24px",
                  mt: 1,
                  color: "#ADB8CC",
                  maxWidth: "348px"
}