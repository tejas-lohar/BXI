import React from "react";
import Avatar from "@mui/material/Avatar";

const AvatarGenerator = (props) => {
  let comname = "";
  let comnametwo = "";

  let data = props.companyname
    ? props.companyname?.split(" ")
    : "Company Name".split(" ");

  let datatwo = data && data?.map((word) => word[0]);
  comname = datatwo[0] && datatwo[0].toLowerCase();
  let datathree = (datatwo[0] && datatwo[0]) + datatwo[1];
  comnametwo = datathree;

  if (
    comname === "a" ||
    comname === "d" ||
    comname === "g" ||
    comname === "j" ||
    comname === "m" ||
    comname === "p" ||
    comname === "s" ||
    comname === "v" ||
    comname === "y" ||
    comname === "z"
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {" "}
        <Avatar sx={{ bgcolor: "#445FD2" }}>{comnametwo}</Avatar>{" "}
        
      </div>
    );
  } else if (
    comname === "b" ||
    comname === "e" ||
    comname === "h" ||
    comname === "k" ||
    comname === "n" ||
    comname === "q" ||
    comname === "t" ||
    comname === "w" ||
    comname === "x"
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {" "}
        <Avatar sx={{ bgcolor: "blue" }}>{comnametwo}</Avatar>
      </div>
    );
  } else if (
    comname === "c" ||
    comname === "f" ||
    comname === "i" ||
    comname === "l" ||
    comname === "o" ||
    comname === "r" ||
    comname === "u"
  ) {
    {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {" "}
          <Avatar sx={{ bgcolor: "maroon" }}>{comnametwo}</Avatar>
        </div>
      );
    }
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {" "}
        <Avatar sx={{ bgcolor: "orange" }}>{comnametwo}</Avatar>
      </div>
    );
  }
};

export default AvatarGenerator;
