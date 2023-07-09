import { Box, Button, Paper, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

const CreditTerms = () => {
  const Terms = [
    `THIS CREDIT LINE AGREEMENT FOR COINS (“Agreement”) is made and entered into effective as of
 the _____ day of ___________, 2023 (“Effective Date”) by and among the following parties:
BXI WORLD LLP (Lender) has its Corporate Office at 501-5 th Floor Meadows Tower, Sahara Plaza
Complex, Sir M.V. Road, Next to Kohinoor Continental Hotel, Andheri (East); Mumbai-400059
(hereinafter referred to as BXI).`,
    `AND`,
    `Company Name and Registered Address (Borrower). Hereinafter ________ company will be referred
to as Borrower.
The Credit Line Agreement for Coins will be subject to the following terms and conditions:`,
    `1. Purpose of the Credit Line:
The BXI agrees to provide a credit line to the borrower for the purpose of acquiring coins
against Products and Services offered on the marketplace. After proper examination and
scrutiny of Products and Services, BXI agreed to provide Coins.`,
    `2. Interest:
That BXI is not imposing any interest on Coins allotted to Borrower. Coins are Interest-free
Credits.`,
    `3. Validity of Coins:
That BXI Coins are valid till the borrower is on the marketplace once the borrower exits from
the marketplace said BXI Coins will become invalid in nature.`,
    `4. Rights of Lender:
That BXI has the right on the products and services which are listed on the BXI platform by
Borrower on which Credit Line has been allotted.`,
    `5. Use of BXI Coins:
That Borrower shall use these BXI Coins to purchase products and services available on the
marketplace. The borrower is aware that BXI coins are not Reward Points; the same cannot
be transferred to other members of the Platform and BXI coins cannot be used to pay GST,
BXI fees, and other charges.
(Note: GST, BXI fees, and other charges shall be paid in Indian Currency INR)`,
    `6. Repayment of Coins:
Members will repay their coins by selling the products on BXI Marketplace against which
Credit Line was issued to them.`,
    `7. Security:
Members can request a Credit line. This Credit line will be issued against the products which
will be BXI’s security. The same products and services shall be listed by Borrower at the BXI
Marketplace for sale to the interested parties.`,
    `8. Events of Default:
The following events shall constitute events of default under the credit line:
Breach by the borrower of any other provision of the credit line that is not capable of
remedy, or that is capable of remedy but is not remedied by the borrower immediately.
That if the sample of products and services are different from the delivered products
and services.
That if the quantity and quality of products and services are not similar as per the
description of the same.`,
    `That the products and services should not be near to shelf-life and allotted products and
services shall be from your Fresh stock.
That if the products and services are not delivered during the promised timelines.
That products and services can be availed by BXI at any time within 12 months from the
date of execution of this Agreement.
That no hidden charges shall be disclosed by the borrower at the time of delivery of
products and services.`,
    `9. Remedies on Default:
Upon the occurrence of an event of default, the lender shall be entitled to exercise any
remedies available to it under Indian law or may take any other action necessary to protect
its interest I.e., Immediate termination of BXI membership.`,
    `10. Governing Law and Jurisdiction:
This Credit Line Agreement for Coins shall be governed by and construed in accordance with
the laws of India. Any dispute arising out of or in connection with this agreement shall be
submitted to the exclusive jurisdiction of the Courts in Mumbai.`,
  ];

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location?.state, "location");
  // const [productId, setProductId] = useState(location?.state?.ProductId);
  //   const productId = location?.state?.ProductId;
  // const TotalAmount = location?.state?.total;
  const [check, setCheck] = useState(false);

  //   const reqBal = async (ProductId) => {
  //     // if (check === true) {
  //     navigate("/home/creditprocess", {
  //       state: {
  //         ProductId: ProductId,
  //         total: Response?.data?.total,
  //       },
  //     });
  //     // } else {
  //     //   alert("Please agree to the Terms and Conditions");
  //     // }
  //   };

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
            width: "100%",
            height: "auto",
            minHeight: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "30px",
              color: "#000000",
            }}
          >
            Credit line agreement for Coins
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
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
            return (
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                {el}
              </Typography>
            );
          })}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#000000",
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
            I agree to all the clauses of this Credit Line Agreement for Coins
            as set forth above.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            disabled={check ? false : true}
            sx={reqbtn}
            onClick={(productId) => {
              navigate("/home/creditprocess", {
                state: {
                  ProductId: productId,
                  total: Response?.data?.total,
                },
              });
            }}
          >
            I Agree
          </Button>
          <Button
            variant="outlined"
            sx={{
              ...reqbtn,
              fontWeight: 700,
              background: "none",
              border: "0.7px solid #EBEDEE",
              color: "#445FD2",
            }}
            onClick={(productId) => {
              navigate("home/dashboard", {
                state: {
                  ProductId: productId,
                  total: Response?.data?.total,
                },
              });
            }}
          >
            Decline
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};

export default CreditTerms;

const reqbtn = {
  width: "157px",
  height: "57px",
  boxShadow: "none",
  background: "#445FD2",
  borderRadius: "10px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "13px",
  lineHeight: "24px",
  textTransform: "none",
};
