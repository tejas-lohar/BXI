//  material ui global style
import { createTheme } from "@material-ui/core/styles";

const ProductAddTheme = createTheme({
  
  background: {
    default: "#000",
  },

  height: {
    height: "100%",
    maxHeight: "45px",
    minHeight: "45px",
  },
  width: {
    width: "100%",
    minWidth: 500,
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export default ProductAddTheme;
