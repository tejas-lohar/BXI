import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import avtar from "../../assets/Images/MembersPage/AvatarImg.svg";
import Plus from "../../assets/Images/MembersPage/PlusImg.svg";
// import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/system";
import MailIcon from "../../assets/Images/MembersPage/Mail.svg";
import Vector from "../../assets/Images/MembersPage/Vector.svg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BarterHeader from "../../components/BarterHeader";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { Link, useNavigate } from "react-router-dom";

import useGetAllCompanyMembers from "../../Hooks/CompanyMember/useGetAllCompanyMembers";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import Avatargenerator from "../../components/AvatarGenerator";
import useGetAuthUser from "../../Hooks/LoggedInUser/useGetAuthUser";

export default function CompanyMembers() {
  let navigate = useNavigate();

  const { data: companyMembers, isLoading } = useGetAllCompanyMembers();
  console.log(companyMembers);
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedInUser();

  const { data: AuthUser } = useGetAuthUser();

  console.log("AuthUser", AuthUser?.data?.roleAndPermission);

  return (
    <Paper
      sx={{ bgcolor: "transparent", width: "100%", boxShadow: "none" }}
      elevation={0}
    >
      <BreadCrumbHeader MainText="Company Members" />
      <Paper sx={{ bgcolor: "transparent", mt: 3 }} elevation={0}>
        <Box
          sx={{
            width: "95%",
            height: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            mx: "auto",
          }}
        >
          <Typography sx={AllMemberstext}>All Members</Typography>
          <select style={DropDownStyle}>
            <option>All</option>
            <option>Sort By</option>
            <option>Sort By</option>
          </select>
        </Box>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {AuthUser?.data?.roleAndPermission === "Yes" ||
          AuthUser?.data?.superAdmin ? (
            <Grid item xl={2.4} lg={2.4} md={3} sm={6} xs={12}>
              <Link
                to="/home/addmember"
                style={{
                  textDecoration: "none",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    width: "204px",
                    height: "232px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        mt: -4,
                      }}
                    >
                      <img
                        style={{
                          border: "2px dashed #C4C4C4",
                          borderRadius: "40px",
                        }}
                        src={Plus}
                      />
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: 12,
                          textAlign: "center",
                          color: "#C4C4C4",
                          marginTop: "10px",
                        }}
                      >
                        Add New Member
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ) : null}
          {companyMembers?.map((card, idx) => (
            <Grid key={idx} item xl={2.4} lg={2.4} md={3} sm={6} xs={12}>
              <Card
                variant="outlined"
                sx={{
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  width: "204px",
                  height: "232px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                key={card.id}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <MoreVertIcon
                      sx={{
                        color: "rgba(146, 158, 174, 1)",
                        fontSize: "17px",
                        fontSize: "25px",
                      }}
                    />
                  </Box>
                  <Box sx={{ position: "absolute" }}></Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Avatargenerator
                      companyname={userData?.data?.companyName}
                    />
                  </Box>
                  <Box sx={{ borderBottom: "1px solid #F5F5F5" }}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "12px",
                        textAlign: "center",
                        color: "#1B212D",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxHeight: "2.5em",
                        lineHeight: "1.5em",
                        maxWidth: "100%",
                        textAlign: "center",
                        marginTop: "5px",
                      }}
                    >
                      {card.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10px",
                        textAlign: "center",
                        color: "#929EAE",
                        mb: "1rem",
                        marginTop: "3px",
                      }}
                    >
                      {card.email}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: "4%",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "#6B7A99", 
                          marginTop : "3px"
                        }}
                      >
                        Category
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "9px",
                          color: "#6B7A99",
                        }}
                      >
                        Hotels
                      </Typography>
                    </Box>
                    <Box
                      component="img"
                      src={MailIcon}
                      sx={{ color: "#929EAE", cursor: "pointer" , height : "30px" , width : "30px" }}
                    ></Box>
                  </Box> */}
                  <Button
                    sx={{
                      background: "#445FD2",
                      placeItems: "end",
                      borderRadius: "5px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: 10,
                      color: "white",
                      width: "100%",
                      height: "50%",
                      marginTop: "2rem",
                      textTransform: "none",

                      "&:hover": {
                        background: "white",
                        color: "#445FD2",
                        border: "1px solid #445FD2",
                      },
                    }}
                    onClick={() => {
                      navigate(`/home/member_details/${card._id}`);
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Paper>
  );
}

const AllMemberstext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "21px",

  color: "#6B7A99",
};

const DropDownStyle = {
  width: "100px",
  height: "40px",
  background: "transparent",
  border: "1px solid #E6E9EE",
  borderRadius: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "24px",
  padding: "10px",
  color: "#AFAFAF",
};
