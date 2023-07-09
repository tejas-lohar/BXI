import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import AirlineIcon from "../../assets/FilterCarousel/AirlineIcon.svg";
import ElectronicsIcon from "../../assets/FilterCarousel/ElectronicsIcon.svg";
import EntertainmentAndEventsIcon from "../../assets/FilterCarousel/EntertainmentAndEventsIcon.svg";
import FMCGIcon from "../../assets/FilterCarousel/FMCGIcon.svg";
import HotelIcon from "../../assets/FilterCarousel/HotelIcon.svg";
import LifestyleIcon from "../../assets/FilterCarousel/LifestyleIcon.svg";
import MediaIcon from "../../assets/FilterCarousel/MediaIcon.svg";
import MobilityIcon from "../../assets/FilterCarousel/MobilityIcon.svg";
import OfficeSupplyIcon from "../../assets/FilterCarousel/OfficeSupplyIcon.svg";
import OthersIcon from "../../assets/FilterCarousel/OthersIcon.svg";
import QSRIcon from "../../assets/FilterCarousel/QSRIcon.svg";
import TextileIcon from "../../assets/FilterCarousel/TextileIcon.svg";
import GoLeftImage from "../../assets/Images/CommonImages/GoLeftImg.png";
import GoRightImage from "../../assets/Images/CommonImages/GoRightImg.png";
import { getCompanyType } from "../../redux/action/Company/CompanyTypeActions";
import { getCompanyDetails } from "../../redux/action/CompanyActions";
import { getProduct } from "../../redux/action/Home-Filter/products";
import "./Carousel.css";

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

const Images = [
  {
    name: "Advertising & broadcast",
    img: MediaIcon,
  },
  {
    name: "Airlines",
    img: TextileIcon,
  },
  {
    name: "Apparel",
    img: LifestyleIcon,
  },
  {
    name: "Automobiles",
    img: HotelIcon,
  },
  {
    name: "Beauty & cosmetics",
    img: MobilityIcon,
  },
  {
    name: "Business products",
    img: FMCGIcon,
  },
  {
    name: "Automobiles",
    img: AirlineIcon,
  },
  {
    name: "Beauty & cosmetics",
    img: OfficeSupplyIcon,
  },
  {
    name: "Business products",
    img: ElectronicsIcon,
  },
  {
    name: "Beauty & cosmetics",
    img: QSRIcon,
  },
  {
    name: "Business products",
    img: OthersIcon,
  },
  {
    name: "Beauty & cosmetics",
    img: EntertainmentAndEventsIcon,
  },
];

// const CustomLeftArrow = () => {
//   return (
//     <Button
//       sx={{
//         width: "40px",
//         height: "auto",
//         position: "absolute",
//       }}
//     >
//       <img src={GoLeftImage} alt="GoLeftImage" width={"100%"} height={"100%"} />
//     </Button>
//   );
// };

export let Category_Id = "";
export let Category_Ids = null;

function CustomRightArrow({ onClick }) {
  function handleClick() {
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      style={{
        background: "transparent",
        position: "absolute",
        right: "-2px",
        width: "40px",
        height: "auto",
        border: "none",
        cursor: "pointer",
        padding: "0",
        outline: "none",
        justifyItems: "center",
        alignItems: "center",
        display: "flex",
        alignContent: "center",
        marginTop: "10px",
      }}
      aria-label="Go to next slide"
      // className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
    >
      <img
        src={GoRightImage}
        alt="GoRightImage"
        width={"100%"}
        height={"auto"}
      />
    </button>
  );
}

function CustomLeftArrow({ onClick }) {
  function handleClick() {
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      style={{
        background: "transparent",
        position: "absolute",
        left: "0px",
        width: "40px",
        height: "auto",
        border: "none",
        cursor: "pointer",
        padding: "0",
        outline: "none",
        justifyItems: "center",
        alignItems: "center",
        display: "flex",
        alignContent: "center",
        marginTop: "10px",
      }}
      aria-label="Go to next slide"
      // className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
    >
      <img src={GoLeftImage} alt="GoLeftImage" width={"100%"} height={"auto"} />
    </button>
  );
}

const ProductDetailsCarousel = () => {
  const dispatch = useDispatch();

  const [categoryId, setcategoryId] = useState("");
  const [categoryIdList, setcategoryIdList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  Category_Id = categoryId;
  Category_Ids = categoryIdList;
  let CategoryData = [];

  async function storecategory(props) {
    CategoryData.push(props);
  }

  const { CompanyTypeData } = useSelector((state) => state.CompanyType);

  // console.log("CompanyTypeData", CompanyTypeData);
  const { company } = useSelector((state) => state.companyDetails);

  window.onload = () => {
    setRefresh(true);
  };
  window.addEventListener("beforeunload", function (event) {
    // console.log("hiiiii");
    // setRefresh(true);
  });
  // console.log(window.location.reload());

  // useEffect(() => {
  //   const storedObj = JSON.parse(localStorage.getItem("myObj"));
  //   if (storedObj === true) {
  //     setRefresh(true);
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct("", "", "", "", "", categoryIdList, refresh));
  }, [dispatch, categoryId, categoryIdList]);

  useEffect(() => {
    dispatch(getCompanyType());
  }, [dispatch]);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100px",
        zIndex: 1,
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <Carousel
        additionalTransfrom={0}
        scrollable
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          superLargeDesktop: {
            breakpoint: {
              max: 4000,
              min: 1440,
            },
            items: 6,
            partialVisibilityGutter: 50,
          },
          desktop: {
            breakpoint: {
              max: 1440,
              min: 768,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 768,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 320,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {CompanyTypeData?.length > 0 &&
          CompanyTypeData?.map((item, index) => {
            return (
              <Box
                onClick={() => {
                  localStorage.removeItem("myObj");
                  setRefresh(false);
                  storecategory(item._id);
                  setcategoryId(item._id);
                  if (!categoryIdList.some((user) => user === item._id)) {
                    setcategoryIdList([...categoryIdList, item._id]);
                  } else if (categoryIdList.some((user) => user === item._id)) {
                    setcategoryIdList(
                      categoryIdList.filter((id) => id !== item._id)
                    );
                  }
                }}
                key={index}
                sx={{
                  px: "5px",
                  borderRadius: "10px",
                  ml: 1,
                  py: 2,
                  width: "auto",
                }}
              >
                <Paper
                  sx={{
                    ...FilterPaper,
                    border: categoryIdList.includes(item._id)
                      ? "2px solid #445FD2"
                      : "2px solid #FFFFFF",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: categoryId !== item._id ? 500 : 600,
                    fontSize: "13px",
                    textAlign: "center",
                    mt: 1,
                    color: categoryId !== item._id ? "#6F6F6F" : "#445FD2",
                    "&:hover": {
                      border: "2px solid #E0F0FF",
                      cursor: "pointer",
                      color: "#445FD2",
                      fontWeight: 600,
                      background: "#E0F0FF",
                    },
                  }}
                  key={index}
                  elevation={0}
                >
                  <img
                    src={Images[index].img}
                    alt="filter"
                    width="26px"
                    height="23px"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "14px",
                      textAlign: "center",
                      color: "#6F6F6F",
                    }}
                  >
                    {item.CompanyTypeName}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
      </Carousel>
    </Paper>
  );
};

export default ProductDetailsCarousel;

const FilterPaper = {
  background: "#ffffff",
  // boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
  borderRadius: "20px",
  width: {
    xl: "100%",
    lg: "100%",
    md: "100%",
    sm: "90%",
    xs: "80%",
  },
  minWidth: "180px",
  // maxWidth: "170px",
  // px: "20px",
  mx: "auto",
  height: "100%",
  minHeight: "80px",
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  cursor: "pointer",
  // mx: {
  //   xl: 0,
  //   lg: 0,
  //   md: 0,
  //   sm: 1,
  //   xs: 1,
  // },
};
