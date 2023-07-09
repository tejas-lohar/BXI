import { Box, Grid, Typography, Paper } from "@mui/material";
import React, { useEffect } from "react";
import Shoe from "../../assets/shoe5.jfif";
import Employee1 from "../../assets/employee1.jpeg";
import Employee2 from "../../assets/employee2.jpg";
import bxifeature from "../../assets/bxifeaturelogo1.png";
import SampleVideo from "../../assets/SampleVideo/SampleVideo.mp4";
import HBM from "../../assets/HomePageImages/HBM.svg";
import HBS from "../../assets/HomePageImages/buyandsell.png";
// import HBS from "../../assets/HomePageImages/Groupnew.png";
import Arrow from "../../assets/HomePageImages/bluearr.svg";
import BXI_COIN from "../../assets/HomePageImages/BXI_COIN.svg";
import BxiPointer from "../../assets/HomePageImages/BxiPointer.png";
import Accounting from "../../assets/HomePageImages/accounting.png";
import Final_BXI_COIN from "../../assets/HomePageImages/Final_BXI_COIN.png";
import FinalBarterCoin from "../../assets/HomePageImages/FinalBarterCoin.png";
import backcoinimg from "../../assets/HomePageImages/backcoinimg.png";
import Folder from "../../assets/HomePageImages/creditdebit.png";
import OnlineShopping from "../../assets/HomePageImages/marketplace.png";
import Tender from "../../assets/HomePageImages/exchange.png";
import Pickrr from "../../assets/HomePageImages/Pickrr.png";
import Signzy from "../../assets/HomePageImages/signzy.png";
import Escrowpay from "../../assets/HomePageImages/Escrowpay.png";
import YesBank from "../../assets/HomePageImages/YesBank.png";
import Desai from "../../assets/HomePageImages/Desai.png";
import Unada from "../../assets/HomePageImages/Unada.png";
import PineLabs from "../../assets/HomePageImages/PineLabs.png";
import Shop_bag from "../../assets/HomePageImages/bwbcoin.png";
import Safe_bxi from "../../assets/HomePageImages/safe_bxi.png";
import Rotate_arrow from "../../assets/HomePageImages/newcash.png";
import Money_bag from "../../assets/HomePageImages/coinicon.png";
import Sell_product from "../../assets/HomePageImages/seller.png";
import Cooperation from "../../assets/HomePageImages/bussinessdevelopment.png";
import Clip_path from "../../assets/HomePageImages/Network.png";
import Best_deal from "../../assets/HomePageImages/Bdeal.png";
import Application from "../../assets/HomePageImages/multiplecategories.png";
import Add_to_cart from "../../assets/HomePageImages/whatuwant.png";
import ShadowBox from "./ShadowBox";
import BecomeMember from "./HowItWorks/BecomeMember";
import Fade from "react-reveal/Fade";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import AnimationOnImg from "./Animation/AnimationOnImg";
import { AnimationBounce } from "./Animation/AnimationBounce";
const HowitworksPageBody = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
      });
    }
  }, [controls, inView]);
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          height: "90vh",
          width: "100%",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 12,
              // marginBottom: "20px",
            }}
          >
            <Fade top duration={1000}>
              <Typography
                variant="inherit"
                component="span"
                sx={{ ...headingStyle, fontWeight: 600 }}
              >
                Seller
              </Typography>
              <Typography
                variant="inherit"
                component="span"
                sx={{ ...gradientText, fontWeight: 600 }}
              >
                Benefits and Perks
              </Typography>
            </Fade>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container sx={{ width: "70%", mx: "auto" }}>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Sell_product}
                    title={"Sell Your Products/Services"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Money_bag}
                    title={"Earn Barter Coins"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Cooperation}
                    title={"New Business devlopment"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox imagePath={Clip_path} title={"Network"} />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={12} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox imagePath={Rotate_arrow} title={"New Cash Flow"} />
                </AnimationOnImg>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // marginTop: "35px",
              mt: 10,
              marginBottom: "30px",
            }}
          >
            <Fade top duration={1000}>
              <Typography
                variant="inherit"
                component="span"
                sx={{
                  ...headingStyle,
                  fontWeight: 600,
                }}
              >
                Buyer
              </Typography>
              <Typography
                variant="inherit"
                component="span"
                sx={{
                  ...gradientText,
                  fontWeight: 600,
                }}
              >
                Benefits and Perks
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Grid container sx={{ width: "70%", mx: "auto" }}>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Add_to_cart}
                    title={"Buy what you want"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Application}
                    title={"Multiple Categories to choose from"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Rotate_arrow}
                    title={"Save Cash Flow"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={6} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Best_deal}
                    title={"Get the best Deals"}
                  />
                </AnimationOnImg>
              </Grid>
              <Grid item xs={12} sm={2.4} md={2.4}>
                <AnimationOnImg>
                  <ShadowBox
                    imagePath={Shop_bag}
                    title={"Buy with barter coins"}
                  />
                </AnimationOnImg>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      {/* how to become member  */}
      <BecomeMember />
      {/* <Paper
        elevation={0}
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ marginTop: "60px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <video
                  controls
                  autoPlay
                  controlsList="nodownload"
                  src={SampleVideo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0 17.449px 17.449px 0",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={headingStyle}
                  >
                    How
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={gradientText}
                  >
                    To Become a Member?
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "90%",
                    maxWidth: "90%",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "40px",
                    marginTop: "24px",
                  }}
                >
                  <img
                    src={HBM}
                    alt="HBM"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper> */}
      {/* how to buy and sell  */}
      <Paper elevation={0} sx={{ height: "80vh", width: "80%", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, fontSize: "30px" }}
            >
              How
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...gradientText, fontSize: "30px" }}
            >
              To Buy & Sell
            </Typography>
          </Fade>
        </Box>
        <Box sx={{ width: "75%", mx: "auto" }}>
          <Box
            component={"img"}
            src={HBS}
            alt="HBS"
            sx={{ width: "100%", height: "80%", marginTop: "10px" }}
          />
        </Box>
      </Paper>
      {/* <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="inherit" component="span" sx={headingStyle}>
            How
          </Typography>
          <Typography variant="inherit" component="span" sx={gradientText}>
            To Buy & Sell
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            // marginLeft: "40px",
            // marginTop: "60px",
          }}
        >
          <img src={HBS} alt="HBS" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box> */}
      {/* Introducing Barter Coins for Business */}
      <Box sx={{ height: "80vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "20px",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, fontWeight: 600, fontSize: "30px" }}
            >
              Introducing
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...gradientText, fontWeight: 600, fontSize: "30px" }}
            >
              Barter Coins for Business
            </Typography>
          </Fade>
        </Box>
        <Box
          sx={{
            width: "80%",
            mx: "auto",
            height: "auto",
            position: "relative",
            display: "flex",
          }}
        >
          <Box
            sx={{
              marginLeft: "120px",
              marginTop: "100px",
              width: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "70px",
              }}
            >
              <Fade top duration={1000}>
                <img
                  src={bxifeature}
                  alt="bxifeature"
                  style={{ width: "20.82px", height: "36.52px" }}
                />
                <Typography sx={IBCBTypo}>
                  Sell Your Products / Services and Earn Barter Coins
                </Typography>
              </Fade>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "60px",
              }}
            >
              <Fade top duration={1000}>
                <img
                  src={bxifeature}
                  alt="bxifeature"
                  style={{ width: "20.82px", height: "36.52px" }}
                />
                <Typography sx={IBCBTypo}>
                  Barter Coins Allows You to Buy What You want from Marketplace.
                </Typography>
              </Fade>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                cursor: "pointer",
                width: "85%",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  transform: "scale(1)",
                  transition: "0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "rgba(55, 93, 187, 1)",
                    transform: "scale(1)",
                  }}
                >
                  More Information
                </Typography>
                <Box
                  component="img"
                  src={Arrow}
                  alt="Arrow"
                  sx={{
                    height: "auto",
                    width: "auto",
                    color: "rgba(55, 93, 187, 1)",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                position: "relative",
              }}
            >
              <div className="bgImageWithUrl">
                <div className="Bounce_img">
                  <Box
                    component="img"
                    src={FinalBarterCoin}
                    alt="altimage"
                    sx={{
                      height: "auto",
                      maxWidth: "473px",
                      width: "100%",
                    }}
                  />
                </div>
                <Typography
                  sx={{
                    ...IBCBTypo,
                    fontSize: "26px",
                    position: "absolute",
                    right: -40,
                    bottom: 140,
                  }}
                >
                  1 INR = 1 Barter Coin
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Fade top duration={1000}>
          <Typography
            variant="inherit"
            component="span"
            sx={{ ...headingStyle, fontWeight: 600, fontSize: "30px" }}
          >
            How
          </Typography>
          <Typography
            variant="inherit"
            component="span"
            sx={{ ...gradientText, fontWeight: 600, fontSize: "30px" }}
          >
            Barter Coin Works ?
          </Typography>
        </Fade>
      </Box>
      {/* How Barter Coin Works ?   */}
      <Box sx={{ marginTop: "40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "90px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "100px",
              }}
            >
              <Fade top duration={1000}>
                <Typography sx={CoinWorks}>
                  Buy and sell on BXI Marketplace
                </Typography>
                <Box
                  component="img"
                  src={OnlineShopping}
                  alt="OnlineShopping"
                  sx={{ width: "50.68px", height: "50.68px" }}
                />
              </Fade>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // bgcolor:"red",
              }}
            >
              <Fade top duration={2000}>
                <Typography sx={CoinWorks}>For Accounting Purposes</Typography>
                <img
                  src={Accounting}
                  alt="OnlineShopping"
                  style={{ width: "60.68px", height: "60.68px" }}
                />
              </Fade>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{
              // marginRight:"10px"
              paddingRight: {
                xl: "50px ",
                lg: "50px ",
                md: "50px ",
              },
            }}
          >
            <Box
              sx={{
                // height: "400px",
                // bgcolor: "red",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {/* <div className="Bounce_img"> */}
              <Box
                component="img"
                src={Final_BXI_COIN}
                alt="Final_BXI_COIN"
                sx={{
                  width: "90%",
                  height: "auto",
                  mx: "auto",
                }}
              />
              {/* </div> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "90px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "100px",
              }}
            >
              <Fade top duration={1000}>
                <img
                  src={Folder}
                  alt="OnlineShopping"
                  style={{ width: "60.68px", height: "60.68px" }}
                />
                <Typography sx={CoinWorks2}>
                  Maintain Records of Debit & Credit
                </Typography>
              </Fade>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Fade top duration={2000}>
                <img
                  src={Tender}
                  alt="OnlineShopping"
                  style={{ width: "60.68px", height: "60.68px" }}
                />
                <Typography sx={CoinWorks2}>
                  Medium of exchange between the buyer and seller
                </Typography>
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Can you Get Credit Line */}
      <Box sx={{ marginTop: "60px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, fontSize: "30px" }}
            >
              Can You
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...gradientText, fontSize: "30px" }}
            >
              Get Credit Line ?
            </Typography>
          </Fade>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ ...gradientSubHeadTypo, fontSize: "30px" }}>
            We have got you covered
          </Typography>
        </Box>
        <Box sx={{ marginTop: "50px", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // bgcolor:"red",
              position: "absolute",
              width: "100%",
              height: "100%",
              paddingTop: "16px",
              zIndex: -1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "1px",
                background: "#8073B5",
              }}
            />
          </Box>
          <Grid container>
            <Grid item xs={6} sm={4} md={2}>
              <Box sx={BoxLine}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "white",
                    width: "15%",
                  }}
                >
                  <img
                    src={BxiPointer}
                    alt="BxiPointer"
                    style={{ width: "22.5px", height: "39.72px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0px",
                  }}
                >
                  <Typography sx={BoxLineText}>
                    Select Product You want to apply for Credit Line
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Box sx={BoxLine}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "white",
                    width: "15%",
                  }}
                >
                  <img
                    src={BxiPointer}
                    alt="BxiPointer"
                    style={{ width: "22.5px", height: "39.72px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={BoxLineText}>
                    BXI Evaluates the product
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Box sx={BoxLine}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "white",
                    width: "15%",
                  }}
                >
                  <img
                    src={BxiPointer}
                    alt="BxiPointer"
                    style={{ width: "22.5px", height: "39.72px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={BoxLineText}>
                    Credit Line Limit is offered
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Box sx={BoxLine}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "white",
                    width: "15%",
                  }}
                >
                  <img
                    src={BxiPointer}
                    alt="BxiPointer"
                    style={{ width: "22.5px", height: "39.72px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={BoxLineText}>
                    Document Sign & Avail the Limit
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Box sx={BoxLine}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "white",
                    width: "15%",
                  }}
                >
                  <img
                    src={BxiPointer}
                    alt="BxiPointer"
                    style={{ width: "22.5px", height: "39.72px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={BoxLineText}>
                    Start to Buy Even Before you Sell
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Box sx={BoxLine}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "white",
                    width: "15%",
                  }}
                >
                  <img
                    src={BxiPointer}
                    alt="BxiPointer"
                    style={{ width: "22.5px", height: "39.72px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={BoxLineText}>
                    BXI takes responsibility to Sell
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Our Business Accelerators */}
      <Box sx={{ marginTop: "60px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, fontSize: "30px" }}
            >
              OUR
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...gradientText, fontSize: "30px" }}
            >
              BUSINESS ACCELERATORS
            </Typography>
          </Fade>
        </Box>
        <Box sx={{ width: "60%", mx: "auto" }}>
          <Grid container>
            <Grid item xl={4} lg={4} xs={3} sm={3} md={3}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={Desai}
                    alt="Desai"
                    style={{ width: "160px", height: "40.51px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid>
            {/* <Grid item xs={6} sm={6} md={3}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={Signzy}
                    alt="signzy"
                    style={{ width: "150px", height: "40.51px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid> */}
            <Grid item xl={4} lg={4} xs={3} sm={3} md={3}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={Pickrr}
                    alt="Pickrr"
                    style={{ width: "140px", height: "40.51px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} xs={3} sm={3} md={3}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={Escrowpay}
                    alt="Escrowpay"
                    style={{ width: "150px", height: "40.51px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "40%", mx: "auto" }}>
          <Grid container sx={{ marginTop: "40px" }}>
            {/* <Grid item xs={4} sm={4} md={4}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={YesBank}
                    alt="YesBank"
                    style={{ width: "135.62px", height: "51.76px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid> */}
            <Grid item xs={6} sm={6} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={Unada}
                    alt="Unada"
                    style={{ width: "50.01px", height: "30.5px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AnimationOnImg>
                  <img
                    src={PineLabs}
                    alt="PineLabs"
                    style={{ width: "190.12px", height: "30.23px" }}
                  />
                </AnimationOnImg>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Our clients love our easy process Here’s Why */}
      <Box sx={{ marginTop: "60px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, fontSize: "30px" }}
            >
              Our
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...gradientText, fontSize: "30px" }}
            >
              Clients Love Our Easy Process
            </Typography>
          </Fade>
        </Box>
        <Paper elevation={0} sx={{ width: "auto", height: "90%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ ...gradientSubHeadTypo, fontSize: "30px" }}>
              Here’s Why ?
            </Typography>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              width: "100%",
              height: "auto",
              maxHeight: "540px",
            }}
          >
            <video
              controls
              autoPlay
              controlsList="nodownload"
              src={SampleVideo}
              style={{
                width: "80%",
                // width: '980px',
                height: "auto",
                maxHeight: "540px",
                borderRadius: "34px",
              }}
            />
          </Box> */}
          <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
            <video
              // controls
              autoPlay
              controlsList="nodownload"
              src={
                "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/bxi+website+final_1.mp4"
              }
              style={{
                width: "100%",
                height: "75vh",
                objectFit: "cover",
                borderRadius: "17.449px 17.449px 17.449px 17.449px",
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default HowitworksPageBody;
const gradientText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xs: "22px",
    sm: "28px",
    md: "32px",
    lg: "32px",
    xl: "32px",
  },
  letterSpacing: "0.5px",
  lineHeight: "65px",
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(75deg, #375DBB 29.17%, #00B1FF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  textTransform: "uppercase",
};
const headingStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xs: "22px",
    sm: "28px",
    md: "32px",
    lg: "32px",
    xl: "32px",
  },
  letterSpacing: "0.5px",
  lineHeight: "65px",
  display: "flex",
  alignItems: "center",
  color: "#0D0E0E",
  marginRight: "10px",
  textTransform: "uppercase",
};
const gradientSubHeadTypo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xs: "22px",
    sm: "28px",
    md: "32px",
    lg: "32px",
    xl: "32px",
  },
  lineHeight: "30px",
  display: "flex",
  alignItems: "center",
  color: "#494B7A",
};
const IBCBTypo = {
  width: "452.89px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "30px",
  display: "flex",
  alignItems: "center",
  color: "#494B7A",
  marginLeft: "20px",
};

const BoxLine = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

const BoxLineText = {
  width: {
    xl: "228px",
    lg: "228px",
    md: "188px",
    sm: "158px",
    xs: "158px",
  },
  height: "89px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "18px",
    sm: "15px",
    xs: "15px",
  },
  // lineHeight: "30px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#494B7A",
};

const CoinWorks = {
  width: {
    xl: "230px",
    lg: "230px",
    md: "188px",
    sm: "158px",
    xs: "158px",
  },
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "20px",
    lg: "20px",
    md: "20px",
    sm: "16px",
    xs: "16px",
  },
  lineHeight: "37px",
  display: "flex",
  alignItems: "center",
  textAlign: "right",
  color: "#494B7A",
  marginRight: "20px",
};

const CoinWorks2 = {
  width: {
    xl: "385px",
    lg: "385px",
    md: "340px",
    sm: "300px",
    xs: "300px",
  },
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "20px",
    lg: "20px",
    md: "20px",
    sm: "16px",
    xs: "16px",
  },
  lineHeight: "37px",
  display: "flex",
  alignItems: "center",
  textAlign: {
    xl: "left",
    lg: "left",
    md: "center",
    sm: "center",
    xs: "center",
  },
  color: "#494B7A",
  marginLeft: "20px",
};
