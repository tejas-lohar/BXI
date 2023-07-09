import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootbox: {
    width: "100%",
    height: "123px",
    background: "#FFFFFF",
    border: "1px solid #EDEFF2",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    mt: 2,
  },
  rootboxChildOne: {
    width: "100%",
    maxWidth: {
      xl: "700px",
      lg: "700px",
      md: "700px",
      sm: "350px",
      xs: "350px",
    },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    gap: "2rem",
  },
  cartProductStrip: {
    marginLeft: "1%",
    height: "120px",
    width: "150px",
    maxHeight: "122px",
    minWidth: "150px",
    maxWidth: "150px",
    borderRadius: "10px 10px 10px 10px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  activeButton: {
    width: "33%",
    background: "#2261A2",
    height: "100%",
    textTransform: "none",
    color: "white",
    fontFamily: "Poppins",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",

  },
  unActiveButton: {
    width: "33%",
    background: "white",
    height: "100%",
    textTransform: "none",
    color: "#2261A2",
    fontFamily: "Poppins",
    fontSize: "14px",
    border: "1px solid lightgray",
    border: "none",
    cursor: "pointer",
  },
}));

export default useStyles;
