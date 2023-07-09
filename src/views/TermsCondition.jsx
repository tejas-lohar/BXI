import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyStepDetails } from "../Hooks/Auth";
import BreadCrumbHeader from "../components/Header/BreadCrumbHeader";
import useGetLoggedInUser from "../Hooks/LoggedInUser/useGetLoggedInUser";

const TermsCondition = () => {
  // const { data: companyDetails } = useCompanyDetails();
  const { mutate, isLoading } = useCompanyStepDetails();
  let navigate = useNavigate();
  const AcceptTerms = () => {
    mutate(
      { termsAcceptStatus: true },
      {
        onSuccess: (res) => {
          navigate("/home/pricing");
        },
        onError: (err) => {
          console.log(err);
          // alert(err);
        },
      }
    );
  };

  const {
    data: companyDetails,
    isLoading: companyDetailsLoading,
    error: companyDetailsError,
  } = useGetLoggedInUser();


  const declineTerms = () => {
    // let confirm = window.confirm(
    //   "Are you sure you want to decline terms and conditions?"
    // );
    setOpenSecond(true);
  };
  // const navigationFunct = () => {
  //   if (companyDetails?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
  //     navigate("/under_review");
  //   } else if (companyDetails?.data?.companyOnboardingStatus === "PAYMENT") {
  //     navigate("/home/payment");
  //   }
  // };

  const [check, setCheck] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const Terms = [
    `Please ! Read all the terms & conditions carefully.`,

    `    THE RULES AND REGULATIONS OF TRADING
`,
    `Hello Member, BXI requests you to read the Rules and Regulations of Trading carefully to avoid hurdles and difficulties while trading on the BXI Platform.
    Member is fully aware of the following Rules and Regulations of Trading.`,
    `1. Member is fully aware that BXI is a fintech company that also acts as a third-party record keeper of barter transactions among its members, who are business owners and professionals who contract with BXI to organize and facilitate the barter of their goods and services with each other.
   `,
    `2. Member is fully aware that member has registered its company on the BXI platform to exchange goods and/or services with other Members via the BXI platform only.
    `,
    `3. Member is fully aware that there are total 2 types of Membership i.e., Premium Membership and Premium Plus Membership.
    Under Premium Membership: Members would get the privilege of absolute free access to the BXI marketplace and members must pay 12% of success fees on each successful transaction.
    Under Premium Plus Membership: Members would get the privilege of access to the BXI marketplace and members must pay only 8% of success fees on each successful transaction.
    `,
    `4. Member is fully aware that member must conduct trade only and only on the barter system and use of cash is strictly prohibited except for payment of the following:
    a. GST and other applicable taxes 
    b. BXI Fees
    `,
    `5. Member is fully aware that Member shall abide by applicable GST, local laws, and regulations appropriate to any trade, and BXI is not responsible for any failure on the part of the member to comply. Under no circumstances will BXI be responsible for paying GST or any other taxes on behalf of any Member.
    `,
    `6. Member is fully aware that A “trade” is a barter purchase or sale of goods and/or services on the BXI platform whereby payment is made in BXI Tokens. A token is an accounting unit used to record the value of trades. Ownership of tokens denoted the right to receive goods and services available within the BXI marketplace platform.
    `,
    `7. Member is fully aware that 1 Token is equal to 1 INR. Tokens are issued by BXI to its members against Products or Premium Plus Membership as the case may be. BXI Tokens are of use for trading purpose only and cannot be transferred to a Third person. Tokens cannot be purchased for INR. Tokens are not Legal Tender of the Republic of India and are interest-free.
    `,
    ` 8. Member is fully aware that Member can apply for Credit Line for the products/services he is offering to the marketplace as private deals. BXI​ shall evaluate the products/services by their quality, quantity, offered rate, and demand for the products/services based on inspection BXI issues credit line.
    Once Credit Line is issued these private deals must be live compulsory and products/services cannot be withdrawn from the BXI marketplace.
    `,
    `9. Members also agree that the products offered in exchange for credit line shall be made available and should be in good condition as provided during the time of sampling for credit lines to the BXI procurement team.
    `,
    `10. Member is fully aware that responsibility for the conduct of the trade is exclusive of the two members participating in the trade. Member acknowledges that the sole principal in any trade is the buying and selling members involved, that trades are entered into voluntarily, and that BXI is not the agent of any Member, nor is it the guarantor of any trade or BXI Token.
    `,
    `11. Member is fully aware that BXI is committed to provide only those products/services that may actually be available in the exchange system at any given time. BXI is not responsible if a member cannot find specific products/services to buy from other Members.
    `,
    ` 12. Member is fully aware that Member is obligated to sell their products/services on the marketplace at their normal, customary rates that they typically sell their products/services for in a case environment. Violations may result in the Termination of the Member’s account and/or immediate adjustment of the transactions involved. Also, requisite legal actions shall be commenced against the wrongdoer.
    Member is fully aware that if a member violates any terms or hereafter in effect, BXI may immediately terminate its account in accordance with these Rules or may freeze all activity in an account without notice until such time as BXI in its sole discretion, reinstates the Member or decides to terminate Member’s account. Member acknowledges that the decision of BXI to freeze and/or terminate Member’s account shall be final, binding and conclusive.`,
  ];

  const Termssec = [
    `    Please read these terms and conditions carefully before using the www.bxiworld.comwebsite. By using the www.bxiworld.com website, you signify your agreement to rebound by these conditions.In addition, when you use any current or further service of www.bxiworld.com, youwill be subject to the terms, conditions, rules and regulations applicable to the BXI service.CONDITIONS RELATING TO YOUR USE OF WWW.BXIWORLD.COM
`,
    `  1. Your Account If you use the website, you are responsible for maintaining the confidentiality of your account,and password and for restricting access to your computer to prevent unauthorized access to your account. You agree to accept responsibility for all activities that occur under your account or password. You shall take all necessary steps to ensure that the password is kept confidential and secure and should inform us immediately if you have any reason to believe that your password has become known to anyone else. Please ensure that the details you provide us with are correct and complete and inform us immediately of any changes to the information that you provided when registering. You agreed and acknowledge that you will use your account on the website to sell and purchase products only for self-use, corporate gifting, other gifting purposes
    and not for sale to 3rd party.
  `,
    ` 2. E-Platform for Communication You agree, understand, and acknowledge that the website is an online platform that enables you to purchase product listed on the website at the number of tokens indicated therein at any time from any location. You further agree and acknowledge that BXI is only a facilitator and is not and cannot be a party to or control in any manner any transactions on the website.Accordingly, the contract of sale of products on the website shall be a strictly bipartite contract between you and the other members of BXI.
   `,
    `3. Access to www.bxiworld.com We will do our utmost to ensure that the availability of the website will be uninterrupted and that transmissions will be error-free. However, due to the nature of the Internet, this cannot be guaranteed. Also, your access to the website may also be occasionally suspended or restricted to allow for repairs, maintenance, or the introduction of new facilities or services at any time without prior notice. We will attempt to limit the frequency and duration of any such suspension or restriction.
    `,
    `4. Privacy Please review our Privacy Notice, which also governs your visit to www.bxiworld.com, to understand our practices. The personal information/data provided to us by you during the course of usage of www.bxiworld.com. Will be treated as strictly confidential and in accordance with the Privacy Notice and applicable laws and regulations.
    `,
  ];

  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Terms & Conditions"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{
          bgcolor: "#fff",
          boxShadow: "none",
          p: 3,
          borderRadius: "20px",
          height: "auto",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   alignItems: "center",
          //   bgcolor: "red",
          gap: "30px",
        }}
        elevation={0}
      >
        <Box
          sx={{
            width: "98%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            overflowY: "scroll",
            gap: "30px",
            p: 1,
          }}
        >
          {Terms?.map((el, idx) => {
            return <Typography sx={termstext}>{el}</Typography>;
          })}
          <Typography
            sx={{
              ...termstext,
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "21px",
            }}
          >
            [Note: These rules and regulations constitute an electronic record
            within the meaning of the applicable law. This electronic record is
            generated by a computer system and does not require any physical or
            digital signature.]
          </Typography>
          <Typography
            sx={{
              ...termstext,
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "22px",
            }}
          >
            TERMS AND CONDITIONS
          </Typography>
          {Termssec?.map((el, idx) => {
            return <Typography sx={termstext}>{el}</Typography>;
          })}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "22px",
              color: "#7D8BA6",
            }}
          >
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "20px" },
                padding: "1px",
              }}
              onClick={() => {
                if (check === false) {
                  setCheck(true);
                } else {
                  setCheck(false);
                }
              }}
            />
            I agree to all the rules and regulations of Trading
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          gap={2}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "#445FD2",
              borderRadius: "10px",
              textTransform: "none",
              boxShadow: "none",
              width: {
                xl: "15.7rem",
                lg: "15.7rem",
                md: "10rem",
                sm: "5rem",
                xs: "5rem",
              },
              height: {
                xl: "5.4rem",
                lg: "5.4rem",
                md: "5rem",
                sm: "3rem",
                xs: "3rem",
              },
            }}
            onClick={declineTerms}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontSize: {
                  xl: "1.5rem",
                  lg: "1.5rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
                textAlign: "center",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Decline
            </Typography>
          </Button>
          <Button
            variant="outlined"
            disabled={check ? false : true}
            size="large"
            sx={{
              color: "white",
              border: "1px solid #EBEDEE",
              borderRadius: "10px",
              width: {
                xl: "15.7rem",
                lg: "15.7rem",
                md: "10rem",
                sm: "5rem",
                xs: "5rem",
              },
              height: {
                xl: "5.4rem",
                lg: "5.4rem",
                md: "5rem",
                sm: "3rem",
                xs: "3rem",
              },
            }}
            onClick={AcceptTerms}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: {
                    xl: "1.5rem",
                    lg: "1.5rem",
                    md: "1rem",
                    sm: "1rem",
                    xs: "1rem",
                  },
                  textAlign: "center",
                  textTransform: "none",
                  color: check ? "#445FD2" : "#EBEDEE",
                }}
              >
                Agree
              </Typography>
            )}
          </Button>
        </Box>
        <Dialog
          open={openSecond}
          onClose={() => {
            setOpenSecond(false);
          }}
          sx={{
            backdropFilter: "blur(2px)",
          }}
          fullWidth
          maxWidth="lg"
          PaperProps={{
            sx: {
              width: "35%",
              height: "auto",
              minHeight: "200px",
              // maxHeight: "200px",
              borderRadius: "20px",
              justifyContent: "center",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                // bgcolor: "red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "90%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "28px",
                      textAlign: "center",
                      color: "#6B7A99",
                    }}
                  >
                    Are you Sure ?
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "20px",
                      textAlign: "center",
                      color: "#475467",
                    }}
                  >
                    Do You really want to decline our Terms & Conditions ?
                  </Typography>
                </Box>
                <CloseIcon
                  sx={{
                    color: "#667085",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (openSecond === false) {
                      setOpenSecond(true);
                    } else {
                      setOpenSecond(false);
                    }
                  }}
                />
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // bgcolor: "green",
            }}
          >
            <DialogContentText id="alert-dialog-description">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      background: "transparent",
                      borderRadius: "8px",
                      textTransform: "none",
                      width: {
                        xl: "21rem",
                        lg: "21rem",
                        md: "15rem",
                        sm: "10rem",
                        xs: "10rem",
                      },
                      height: {
                        xl: "4.4rem",
                        lg: "4.4rem",
                        md: "3.4rem",
                        sm: "2rem",
                        xs: "2rem",
                      },
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#344054",
                      border: "1px solid #D0D5DD",
                    }}
                    onClick={() => {
                      if (openSecond === false) {
                        setOpenSecond(true);
                      } else {
                        setOpenSecond(false);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      mutate(
                        { termsAcceptStatus: false },
                        {
                          onSuccess: (res) => {
                            navigate("/createaccount");
                          },
                          onError: (err) => {
                            console.log(err);
                            // alert(err);
                          },
                        }
                      );
                    }}
                    size="large"
                    sx={{
                      background: "#445FD2",
                      borderRadius: "8px",
                      boxShadow: "none",
                      textTransform: "none",
                      width: {
                        xl: "21rem",
                        lg: "21rem",
                        md: "15rem",
                        sm: "10rem",
                        xs: "10rem",
                      },
                      height: {
                        xl: "4.4rem",
                        lg: "4.4rem",
                        md: "3.4rem",
                        sm: "2rem",
                        xs: "2rem",
                      },
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#FFFFFF",
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>
    </Paper>
  );
};

export default TermsCondition;

const termstext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.5rem",
    lg: "1.5rem",
    md: "1.2rem",
    sm: "1rem",
    xs: "1rem",
  },
  lineHeight: "22px",
  textAlign: "justify",
  color: "#7D8BA6",
};
