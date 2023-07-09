import React, { useEffect } from "react";
import { Button, Box, Typography, Dialog, Paper, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import icon1 from "../../assets/airplane.png";
import icon2 from "../../assets/cosmetics-1.svg";
import icon3 from "../../assets/service-1.svg";
import icon4 from "../../assets/packet-1.svg";
import icon5 from "../../assets/stationery-1.svg";
import icon6 from "../../assets/checklists-1.svg";
import icon7 from "../../assets/appreal.png";
import icon8 from "../../assets/network-1.svg";
import icon9 from "../../assets/megaphone-1.svg";

import { useState } from "react";

import { getCompanyType } from "../../redux/action/Company/CompanyTypeActions";

import { getCompanyDetails } from "../../redux/action/CompanyActions";
import { useDispatch, useSelector } from "react-redux";

import { UpdateCompanyPreference } from "../../redux/action/Company/CompanyPreferenceActions";

const data = [
  { id: 1, name: "Airlines", src: icon1 },
  { id: 2, name: "Beauty cosmetics", src: icon2 },
  { id: 3, name: "Automobiles", src: icon3 },
  { id: 4, name: "Business & Products", src: icon4 },
  { id: 5, name: "Office supply", src: icon5 },
  { id: 6, name: "Inventories", src: icon6 },
  { id: 7, name: "Apparel", src: icon7 },
  { id: 8, name: "Media", src: icon8 },
  { id: 9, name: "Entertainment", src: icon9 },
];

const datatwo = [
  { id: 1, name: "Airlines", src: icon1 },
  { id: 2, name: "Beauty cosmetics", src: icon2 },
  { id: 3, name: "Automobiles", src: icon3 },
  { id: 4, name: "Business & Products", src: icon4 },
  { id: 5, name: "Office supply", src: icon5 },
  { id: 6, name: "Inventories", src: icon6 },
  { id: 7, name: "Apparel", src: icon7 },
  { id: 8, name: "Media", src: icon8 },
  { id: 9, name: "Entertainment", src: icon9 },
];
export default function PreferenceModal(props) {
  let dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState([]);

  const { CompanyTypeData } = useSelector((state) => state.CompanyType);


  const { UpdateCompanyData } = useSelector((state) => state.CompanyPreference);

  const updatePreference = () => {
    dispatch(UpdateCompanyPreference(selected));
    if (UpdateCompanyData === "Updated") {
      setModalState(false);
      setOpen(false);
    }
  };


  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    dispatch(getCompanyType());
  }, []);

  return (
    <>
      {modalState ? (
        <Dialog open={open} onClose={handleClose} scroll="paper">
          <Box
            sx={{
              width: "95%",
              mx: "auto",
              mt: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <CloseIcon sx={{ color: "blue", fontSize: "18px" }} />
            </button>
          </Box>
          <Box
            sx={{
              width: "90%",
              mx: "auto",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "28px",

                color: "#393D5E",
                // hide text after 1 line
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Welcome, {props?.companyData?.companyName}
            </Typography>{" "}
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: 17,

                color: "#393D5E",
              }}
            >
              What are you looking for ?
            </Typography>{" "}
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: 10,

                color: "#ADB8CC",
              }}
            >
              {" "}
              You can only add up to{" "}
              <span
                style={{
                  color: "black",
                  fontSize: "14px",
                  marginTop: "-4px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                three
              </span>{" "}
              categories.
            </Typography>
          </Box>
          <Box sx={{ width: "auto", px: 4, py: 2 }}>
            <Grid container spacing={2}>
              {CompanyTypeData?.map((el, idx) => {
                return (
                  <Grid key={idx} item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <Button
                      onClick={() => {
                        const pastSelected = [...selected];
                        if (pastSelected.includes(el._id)) {
                          setSelected(pastSelected.filter((e) => e !== el._id));
                        } else {
                          setSelected([...pastSelected, el._id]);
                        }
                      }}
                      sx={{
                        width: "100%",
                        maxWidth: "170px",
                        minWidth: "120px",
                        height: "94px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        boxSizing: "border-box",
                        background: `${
                          selected.includes(el._id) ? "#ffffff" : "#E8ECEF "
                        }`,
                        border: `${
                          selected.includes(el._id)
                            ? "1px solid #445FD2"
                            : "1px solid #D9D9D9"
                        }`,

                        borderRadius: "10px",
                        display: "grid",
                        color: `${
                          selected.includes(el._id) ? "#000" : "#ADB8CC"
                        }`,
                        ":hover": {
                          background: "#FFFFFF",
                          color: "#181C32",
                        },
                        textTransform: "none",
                      }}
                    >
                      <img
                        src={el.src}
                        alt="hello"
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "23px",
                          height: "auto",
                        }}
                      ></img>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: 12,
                        }}
                        key={el._id}
                      >
                        {el.CompanyTypeName}
                      </Typography>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Paper
            sx={{
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "100px",
              borderRadius: "0px",
              py: 2,
            }}
          >
            <button
              style={{
                borderRadius: "10px",
                width: "172px",
                height: "55.65px",
                background: "#445FD2",
                border: "1px grey",
                marginLeft: "auto",
                marginRight: "auto",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 14,
                cursor: "pointer",
                color: "#FFFFFF",
              }}
              onClick={updatePreference}
            >
              Confirm details
            </button>
          </Paper>
        </Dialog>
      ) : null}
    </>
  );
}
