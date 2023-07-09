import React, { useEffect, useState } from "react";
import axios from "axios";
import bxifeature from "../assets/bxilogosinglearr1.svg";
const FeatureName = (props) => {
  console.log(props?.name);
  const [keyfeatureName, setKeyFeatureName] = useState();

  async function GetFeaturesNames() {
    await axios
      .post(
        "keyfeature/get_KeyFeatures_ByName",
        { KeyFeature: props?.name },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("hellodataaja", res);
        setKeyFeatureName(res.data);
      });
  }

  console.log("keyfeatureName", keyfeatureName);

  useEffect(() => {
    GetFeaturesNames();
  }, []);
  return (
    <>
      <img
        src={keyfeatureName?.URL ? keyfeatureName?.URL : bxifeature}
        style={{ height: "50px", width: "50px" }}
      />
    </>
  );
};

export default FeatureName;
