import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  MenuItem,
  Select,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
const ListingProduct = () => {
  //   const [items, setItems] = useState([]);
  const [selctedCate, setSelectedCate] = useState();
  //   const [valueTo, setValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [productName, setProductName] = useState();
  const [productType, setProductType] = useState();
  const [productQty, setProductQty] = useState();
  const [productDesc, setProductDesc] = useState();
  const [productPrice, setProductPrice] = useState();
  //   const [companyId, setCompanyId] = useState();
  const [sampleAvail, setSampleAvail] = useState(false);
  //   const [delProduct, setDelProduct] = useState();
  //   const [UpdateId, , setUpdateId] = useState(0);
  const [list, setListGet] = useState();
  const [cate, setCate] = useState();
  const [traits, setTraits] = useState([]);
  const [traitsData, setTraitsData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleInputChange = (event) => {
    setuserInfo({
      // ...userInfo,
      file: event.target.files,
      // filepreview: URL.createObjectURL(event.target.files),
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const add = async () => {
    // console.log("====>", add);
    await axios
      .post("/product/add_product", {
        ProductName: productName,
        ProductType: selctedCate,
        // ProductType: dropvalue,
        traits: [...traitsData],
        ProductQty: productQty,
        ProductPrice: productPrice,
        ProductDesc: productDesc,
        // CompanyId: companyId,
        SampleAvailabilty: sampleAvail,
        ImageUrl: fileName,
      })
      .then((res) => {
        console.log("========>", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FetchAllWallet = async () => {
    await axios
      .get("/product/get_products")
      .then((res) => {
        // console.log(res);
        setListGet(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  //   const UpdateAllProduct = async (UpdateId) => {
  //     await axios
  //       .put(`product/update_product`, {
  //         id: storeId,
  //         _id: storeIdService,

  //         ProductName: productName,
  //         ProductType: productType,
  //         ProductQty: productQty,
  //         ProductPrice: productPrice,
  //         ProductDesc: productDesc,
  //         CompanyId: companyId,
  //         SampleAvailabilty: sampleAvail,
  //       })
  //       .then((res) => {
  //         FetchAllWallet();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const FerchAllCate = async () => {
    setCate((await axios.get("/category")).data);
  };
  useEffect(() => {
    FerchAllCate();
    FetchAllWallet();
  }, []);
  const [userInfo, setuserInfo] = useState({
    file: [],
    // filepreview: null,
  });
  const fileSelected = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);

    if (formdata) {
      await axios
        .post("product/store_product_img", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          // console.log(res, "res");
        })
        .then((res) => {
          // console.log(res, "res");
          if (res.status === 200) {
            axios
              .post(
                "product/add_Image",
                {
                  documentPath: res.data.path,
                  filename: res.data.filename,
                },
                { withCredentials: true }
              )
              .then((ress) => {
                console.log(ress);
              });
          }
        });
    } else {
      // alert("Please fill all the details");
      return toast.error("Please fill all the details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <Paper elevation={0}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Product Listing
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box mt={5} sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box>
              <input
                type="file"
                required={true}
                className="docs-upload"
                name="upload_file"
                multiple
                onChange={handleInputChange}
              />
              <Button onClick={fileSelected}>Upload</Button>
              <TextField
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                label="add product"
              ></TextField>

              {/* <TextField
                  value={productType}
                  onChange={(e) => {
                    setProductType(e.target.value);
                  }}
                  label="productType"
                ></TextField> */}

              <InputLabel id="demo-select-small">Product Type</InputLabel>
              {/* <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  sx={{ height: "40px", width: "200px" }}
                  value={dropvalue.ProductTypeName}
                  onChange={(e) => {
                    console.log(e.target.value, "VALUE");
                    setDropValue(e.target.value);
                  }}
                  label="Product Type"
                >
                  {api2?.map((val, idx) => {
                    return (
                      <MenuItem value={val.ProductTypeName} key={idx}>
                        {val.ProductTypeName}
                      </MenuItem>
                    );
                  })}
                </Select> */}

              <Select
                labelId="demo-select-medium"
                id="demo-select-medium"
                value={selctedCate}
                onChange={(e) => {
                  setSelectedCate(e.target.value);
                }}
                label="Product Type"
              >
                {cate &&
                  cate.map((e) => {
                    return <MenuItem value={e.name}>{e.name}</MenuItem>;
                  })}
              </Select>
              {/* {selctedCate &&
                  JSON.stringify(cate.find((e) => e.name === selctedCate))} */}

              <Paper elevation={5}>
                {selctedCate &&
                  cate
                    .find((findE) => findE.name === selctedCate)
                    .traits.map((Mape) => {
                      console.log(Mape.name);
                      // setTraits({e.name : e.options});
                      return (
                        <div>
                          <p>{Mape.name}</p>
                          <select
                            value={traits}
                            onChange={(e) => {
                              setTraits(e.target.value);
                              setTraitsData([
                                ...traitsData,
                                {
                                  [Mape.name]: e.target.value,
                                },
                              ]);
                              console.log("====>this ", {
                                traitsData,
                              });
                              //   setTraitsData([
                              //     ...traitsData,
                              //    [
                              //     {e.name : e.target.value}
                              //    ]
                              //   ]);
                            }}
                          >
                            {Mape.options.map((op) => (
                              <option value={op}>{op}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
              </Paper>

              <TextField
                value={productQty}
                onChange={(e) => {
                  setProductQty(e.target.value);
                }}
                label="productQty"
              ></TextField>
              <TextField
                value={productPrice}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                label="productPrice"
              ></TextField>
              <TextField
                value={productDesc}
                onChange={(e) => {
                  setProductDesc(e.target.value);
                }}
                label="productDesc"
              ></TextField>
              {/* <TextField
              value={companyId}
              onChange={(e) => {
                setCompanyId(e.target.value);
              }}
              label="companyId"
            ></TextField> */}

              <label>Sample Available</label>
              <input
                type="checkbox"
                onSelect={(e) => {
                  setSampleAvail(!sampleAvail);
                }}
                onChange={(e) => setSampleAvail(e.target.checked)}
              />
            </Box>
            <Box>
              <Button onClick={add} size="small" variant="contained">
                add Product
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Paper>
    </>
  );
};

export default ListingProduct;
