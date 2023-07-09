import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";

const HsnCode = () => {
  const [hsnCode, setHsnCode] = useState();
  const [hsnFilter, setHsnFilter] = useState("");

  const [datatomap, setDatatomap] = useState();
  async function getHsnCode() {
    console.log(hsnFilter);
    try {
      await axios
        .post(
          "hsn/Get_HSNCode",
          {
            hsnFilter,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  let DatastoreArray = [];

  //   hsnCode?.filter((item) => {
  //     if (item.HSNCodeSubCatName.toString() === hsnFilter.toString()) {
  //       item.HsnCodeSubCatData.map((newitem) => {
  //         DatastoreArray.push(newitem);
  //       });
  //     }
  //   });

  useEffect(() => {
    getHsnCode();
  }, [hsnFilter]);

  return (
    <>
      <Select onChange={(e) => setHsnFilter(e.target.value)}>
        <MenuItem value="Women">Women</MenuItem>
        <MenuItem value="Men">Men</MenuItem>
        <MenuItem value="Kids">Kids</MenuItem>
      </Select>

      <Select onChange={(e) => setDatatomap(e.target.value)}>
        {DatastoreArray &&
          DatastoreArray.map((newitem) => {
            return (
              <MenuItem key={newitem.HSN} value={newitem.HSN}>
                {newitem.HSN}
              </MenuItem>
            );
          })}
      </Select>
      <Select>
        {DatastoreArray &&
          DatastoreArray.map((newitem) => {
            if (newitem.HSN === datatomap) {
              return (
                <MenuItem key={newitem.GST} value={newitem.GST}>
                  {newitem.GST}
                </MenuItem>
              );
            }
          })}
      </Select>
    </>
  );
};

export default HsnCode;

