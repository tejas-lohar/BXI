const TransportationStyle = {
  CommonTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6B7A99",
  },
  ConfirmButtonStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#FFFFFF",
    background: "#2F80ED",
    borderRadius: "4px",
    padding: "10px 20px",
    height:"40px",
    width:"200px",
    "&:hover": {
      background: "#2F80ED",
    },
  },
  CancelButtonStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#2F80ED",
    background: "#FFFFFF",
    borderRadius: "4px",
    border:"1px solid #2F80ED",
    padding: "10px 20px",
    height:"40px",
    width:"200px",
    "&:hover": {
      background: "#FFFFFF",
    },
  },
};

export { TransportationStyle };
