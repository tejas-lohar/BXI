import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
  Tooltip,
} from "@mui/material";
// import { useQuery } from "use-query";
import Logout from "../Logout";
import Footer from "./Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
// import { createTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import WalletAmmount from "./WalletAmmount";
import axios from "axios";
import { async } from "q";
import ListingProduct from "./ListingProduct";
// import useGetRecomendedProducts from "../../Hooks/useGetRecomendedProducts";

import useGetServicesType from "../../Hooks/useGetServicesType";
import { toast, ToastContainer } from "react-toastify";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Home = () => {
  // const closeList = () => {
  //   setItems([]);
  // };

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [fileName, setFileName] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateDialogueOpen, setUpdatedialogueOpen] = useState(false);
  const [updateDialogueOpenService, setUpdatedialogueOpenService] =
    useState(false);
  const [storeId, setStoreId] = useState();

  // console.log(fileName, "fileName");
  const [storeIdService, setStoreIdService] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  // const handleOpenUpdate = (id) => {
  //   setOpen(true);
  //   FetchAllWallet(id);
  //   console.log(id);
  // };

  const handleCloseUpdateService = () => {
    setUpdatedialogueOpenService(false);
  };
  const handleCloseUpdate = () => {
    setUpdatedialogueOpen(false);
  };
  const [items, setItems] = useState([]);
  const [selctedCate, setSelectedCate] = useState();
  const [valueTo, setValue] = useState("");
  const [productName, setProductName] = useState();
  const [productType, setProductType] = useState();
  const [productQty, setProductQty] = useState();
  const [productDesc, setProductDesc] = useState();
  const [productPrice, setProductPrice] = useState();
  const [companyId, setCompanyId] = useState();
  const [sampleAvail, setSampleAvail] = useState();
  const [delProduct, setDelProduct] = useState();
  const [UpdateId, , setUpdateId] = useState(0);
  const [UpdateIdService, , setUpdateIdService] = useState(0);
  const [serviceType, setServiceType] = useState();
  const [serviceName, setServiceName] = useState();
  const [serviceDesc, setServiceDesc] = useState();
  const [servicePrice, setServicePrice] = useState();
  const [companyIdService, setCompanyIdService] = useState();
  const [listedBy, setListedBy] = useState();
  const [traits, setTraits] = useState([]);
  const [traitsData, setTraitsData] = useState();
  console.log("traits", traits);
  useEffect(() => {
    setTraits(...traits, traitsData);
  }, [traitsData]);
  // const [categoryData,setCategoryData] = useState(cate.map(e) => {
  //   {e.options : e.optionValue}
  // })
  // const {
  //   data: RecomendedProductData,
  //   isLoading: RecomendedProductLoading,
  //   isError: RecomendedProductError,
  // } = useGetRecomendedProducts();

  const addItem = (event) => {
    event.preventDefault();
    setItems([...items, valueTo]);
    setValue("");
  };

  const [valueTab, setValueTab] = useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const [list, setListGet] = useState();
  const [listService, setListServiceGet] = useState();
  const [cate, setCate] = useState();

  const FerchAllCate = async () => {
    setCate((await axios.get("/category")).data);
  };
  const {
    data: servicesData,
    isLoading: serviceLoading,
    isError: serviceError,
  } = useGetServicesType();

  // const add = async () => {
  //   console.log("====>", add);
  //   await axios
  //     .post("/product/add_product", {
  //       ProductName: productName,
  //       ProductType: selctedCate,
  //       traits: [{ name: productName, value: [traits] }],
  //       ProductQty: productQty,
  //       ProductPrice: productPrice,
  //       ProductDesc: productDesc,
  //       CompanyId: companyId,
  //       SampleAvailabilty: sampleAvail,
  //       ImageUrl: fileName,
  //     })
  //     .then((res) => {
  //       console.log("========>", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const addService = async () => {
    await axios
      .post("/services/add_services", {
        ServiceType: serviceType,
        ServiceName: serviceName,
        ServiceDesc: serviceDesc,
        ServicePrice: servicePrice,
        CompanyId: companyIdService,
        ListedBy: listedBy,
      })
      .then((res) => {
        console.log("====>", res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const FetchAllWallet = async () => {
    await axios
      .get("/product/get_products")
      .then((res) => {
        console.log(res);
        setListGet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FetchAllService = async () => {
    await axios
      .get("/services/get_services")
      .then((res) => {
        // console.log(res);
        setListServiceGet(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    FerchAllCate();
    FetchAllService();
  }, []);

  const DeleteAllProduct = async (props) => {
    let id = props;
    await axios
      .delete(`product/deleteProduct/${id}`)
      .then((res) => {
        // console.log(res);
        FetchAllWallet();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const DeleteAllServices = async (props) => {
    let id = props;
    await axios
      .delete(`services/delete_services/${id}`)
      .then((res) => {
        // console.log(res);
        FetchAllService();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    FetchAllService();
    FetchAllWallet();
  }, []);

  const UpdateAllProduct = async (UpdateId) => {
    await axios
      .put(`product/update_product`, {
        id: storeId,
        _id: storeIdService,

        ProductName: productName,
        ProductType: productType,
        ProductQty: productQty,
        ProductPrice: productPrice,
        ProductDesc: productDesc,
        CompanyId: companyId,
        SampleAvailabilty: sampleAvail,
      })
      .then((res) => {
        FetchAllWallet();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateAllServices = async () => {
    await axios
      .put(`services/update_service/${storeIdService}`, {
        id: storeIdService,
        ServiceType: serviceType,
        ServiceName: serviceName,
        ServiceDesc: serviceDesc,
        ServicePrice: servicePrice,
        CompanyId: companyIdService,
        ListedBy: listedBy,
      })
      .then((res) => {
        console.log(res);
        FetchAllWallet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    FetchAllWallet();
  }, []);

  const [userInfo, setuserInfo] = useState({
    file: [],
    // filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      // ...userInfo,
      file: event.target.files,
      // filepreview: URL.createObjectURL(event.target.files),
    });
  };

  // console.log("====", userInfo.file);

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

  const [api2, setapi2] = useState([]);
  const [dropvalue, setDropValue] = useState("");
  const [storeAPiData, setSToreAPiDats] = useState([]);
  // console.log(dropvalue?._id, "DROPDOWN");

  const fun1 = async () => {
    let res = await axios.get(
      "http://localhost:5000/product_type/get_productTypes"
    );
    setapi2(res.data);
    // console.log(setapi2);
  };

  // async function GetRecomendedProduct() {
  //   await axios.get("recommeded").then((res) => {
  //     console.log("recomended pro-->", res);
  //   });
  // }

  async function GetService() {
    await axios.get("services").then((res) => {
      console.log("recomended pro-->", res);
    });
  }

  const addToCart = async (id) => {
    await axios
      .post("/product/add_to_cart", {
        ProductId: id,
      })
      .then((res) => {
        console.log("=====>", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fun1();
    // GetRecomendedProduct();
    GetService();
  }, []);

  return (
    <>
      // <ToastContainer style={{ fontSize: "16px" }} />
      <Paper elevation={0}>
        <Logout />
        <WalletAmmount />
        <h2>Home page</h2>
        <Grid container sx={grdMargin} spacing={5}>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6}>
                {/* <Button variant="contained" color="primary" onClick={handleOpen}>
                Product Listing
              </Button> */}
                {/* <ListingProduct /> */}
                <ListingProduct />
              </Grid>
              <Grid item xl={6} lg={6} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen1}
                >
                  Services Listing
                </Button>
              </Grid>
            </Grid>

            <Dialog
              open={open1}
              onClose={handleClose1}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Box
                mt={5}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Box>
                  <TextField
                    value={serviceType}
                    onChange={(e) => {
                      setServiceType(e.target.value);
                    }}
                    label="serviceType "
                  ></TextField>
                  <TextField
                    value={serviceName}
                    onChange={(e) => {
                      setServiceName(e.target.value);
                    }}
                    label="add serviceName"
                  ></TextField>
                  <TextField
                    value={serviceDesc}
                    onChange={(e) => {
                      setServiceDesc(e.target.value);
                    }}
                    label="serviceDesc"
                  ></TextField>
                  <TextField
                    value={servicePrice}
                    onChange={(e) => {
                      setServicePrice(e.target.value);
                    }}
                    label="servicePrice"
                  ></TextField>
                  <TextField
                    value={companyIdService}
                    onChange={(e) => {
                      setCompanyIdService(e.target.value);
                    }}
                    label="companyIdService"
                  ></TextField>
                  <TextField
                    value={listedBy}
                    onChange={(e) => {
                      setListedBy(e.target.value);
                    }}
                    label="listedBy"
                  ></TextField>
                </Box>
                <Box>
                  <Button onClick={addService} size="small" variant="contained">
                    add Services
                  </Button>
                </Box>
              </Box>
            </Dialog>
            <Dialog
              open={updateDialogueOpen}
              onClose={handleCloseUpdate}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Box
                mt={5}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                {/* <Box>
                <TextField
                  value={serviceType}
                  onChange={(e) => {
                    setServiceType(e.target.value);
                  }}
                  label="serviceType "
                ></TextField>
                <TextField
                  value={serviceName}
                  onChange={(e) => {
                    setServiceName(e.target.value);
                  }}
                  label="add serviceName"
                ></TextField>
                <TextField
                  value={serviceDesc}
                  onChange={(e) => {
                    setServiceDesc(e.target.value);
                  }}
                  label="serviceDesc"
                ></TextField>
                <TextField
                  value={servicePrice}
                  onChange={(e) => {
                    setServicePrice(e.target.value);
                  }}
                  label="servicePrice"
                ></TextField>
                <TextField
                  value={companyIdService}
                  onChange={(e) => {
                    setCompanyIdService(e.target.value);
                  }}
                  label="companyIdService"
                ></TextField>
                <TextField
                  value={listedBy}
                  onChange={(e) => {
                    setListedBy(e.target.value);
                  }}
                  label="listedBy"
                ></TextField>
              </Box> */}
                <Box>
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
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    sx={{ height: "40px", width: "200px" }}
                    value={dropvalue.ProductTypeName}
                    onChange={(e) => setDropValue(e.target.value)}
                    label="Product Type"
                  >
                    {api2?.map((val, idx) => {
                      console.log(val.ProductTypeName);
                      return (
                        <MenuItem value={val} key={idx}>
                          {val.ProductTypeName}
                        </MenuItem>
                      );
                    })}
                  </Select>

                  {/* <Select
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
                
                <Paper elevation={5}>
                  {selctedCate &&
                    cate
                      .find((e) => e.name === selctedCate)
                      .traits.map((e) => {
                        return (
                          <div>
                            <p>{e.name}</p>
                            <select>
                              {e.options.map((op) => (
                                <option value={op}>{op}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                </Paper> */}
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
                  <TextField
                    value={companyId}
                    onChange={(e) => {
                      setCompanyId(e.target.value);
                    }}
                    label="companyId"
                  ></TextField>

                  <label>Sample Available</label>
                  <input
                    type="checkbox"
                    onChange={(e) => setSampleAvail(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      UpdateAllProduct(UpdateId);
                    }}
                    size="small"
                    variant="contained"
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Dialog>
            <Dialog
              open={updateDialogueOpenService}
              onClose={handleCloseUpdateService}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Box
                mt={5}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Box>
                  <TextField
                    value={serviceType}
                    onChange={(e) => {
                      setServiceType(e.target.value);
                    }}
                    label="serviceType "
                  ></TextField>
                  <TextField
                    value={serviceName}
                    onChange={(e) => {
                      setServiceName(e.target.value);
                    }}
                    label="add serviceName"
                  ></TextField>
                  <TextField
                    value={serviceDesc}
                    onChange={(e) => {
                      setServiceDesc(e.target.value);
                    }}
                    label="serviceDesc"
                  ></TextField>
                  <TextField
                    value={servicePrice}
                    onChange={(e) => {
                      setServicePrice(e.target.value);
                    }}
                    label="servicePrice"
                  ></TextField>
                  <TextField
                    value={companyIdService}
                    onChange={(e) => {
                      setCompanyIdService(e.target.value);
                    }}
                    label="companyIdService"
                  ></TextField>
                  <TextField
                    value={listedBy}
                    onChange={(e) => {
                      setListedBy(e.target.value);
                    }}
                    label="listedBy"
                  ></TextField>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      UpdateAllServices(UpdateIdService);
                    }}
                    size="small"
                    variant="contained"
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Dialog>
            <Box
              sx={{ width: "200%", typography: "body1", marginTop: "150px" }}
            >
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange} aria-label="lab ">
                    <Tab label="Product" value="1" />
                    <Tab
                      label="Services"
                      value="2"
                      // onClick={() => setView(!view)}
                    />
                    <Tab
                      label="Recomended"
                      value="3"
                      // onClick={() => setView(!view)}
                    />
                  </TabList>
                  <TabPanel value="1">
                    <Table
                      sx={{ minWidth: 750 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Product Name</TableCell>
                          <TableCell align="left">Product Desc</TableCell>
                          <TableCell align="left">Product Qty</TableCell>
                          <TableCell align="left">Product Price</TableCell>
                          <TableCell align="left">Available</TableCell>
                          <TableCell align="left">ProductType</TableCell>
                          <TableCell align="left">Delete</TableCell>
                          <TableCell align="left">Update</TableCell>
                          <TableCell align="left">Add To Cart</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {list?.map((e) => {
                          return (
                            <TableRow
                              key={e.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">
                                {e.ProductName}
                              </TableCell>
                              <TableCell align="left">
                                {e.ProductDesc}
                              </TableCell>
                              <TableCell align="left">{e.ProductQty}</TableCell>
                              <TableCell align="left">
                                {e.ProductPrice}
                              </TableCell>
                              <TableCell align="left">
                                {e.SmapleAvailabilty}
                              </TableCell>
                              <TableCell align="left">
                                {e.ProductType}
                              </TableCell>
                              <TableCell align="left">
                                <Button
                                  onClick={() => {
                                    DeleteAllProduct(e._id);
                                  }}
                                >
                                  <DeleteForeverIcon />
                                </Button>
                              </TableCell>
                              <TableCell align="left">
                                <Button
                                  onClick={(el) => {
                                    setUpdatedialogueOpen(!updateDialogueOpen);
                                    setStoreId(e?._id);

                                    UpdateAllProduct(e._id);
                                    setUpdateId(e._id);
                                  }}
                                >
                                  <EditIcon />
                                </Button>
                              </TableCell>

                              <TableCell>
                                <Button
                                  onClick={() => {
                                    addToCart(e?._id);
                                  }}
                                >
                                  <ShoppingCartIcon />
                                </Button>{" "}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TabPanel>
                </Box>
                <TabPanel value="2">
                  {/* {view ? (
                  <ul>
                    {items.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </ul>
                ) : null} */}
                  <Table
                    sx={{ minWidth: 750 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">serviceType</TableCell>
                        <TableCell align="left">add serviceName</TableCell>
                        <TableCell align="left">serviceDesc</TableCell>
                        <TableCell align="left">servicePrice</TableCell>
                        <TableCell align="left">companyIdService</TableCell>
                        <TableCell align="left">listedBy</TableCell>
                        <TableCell align="left">Delete</TableCell>
                        <TableCell align="left">Update</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listService?.map((e) => {
                        return (
                          <TableRow
                            key={e.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left">{e.ServiceType}</TableCell>
                            <TableCell align="left">{e.ServiceName}</TableCell>
                            <TableCell align="left">{e.ServiceDesc}</TableCell>
                            <TableCell align="left">{e.ServicePrice}</TableCell>
                            <TableCell align="left">{e.CompanyId}</TableCell>
                            <TableCell align="left">{e.ListedBy}</TableCell>
                            <TableCell>
                              <Tooltip title="Delete" placement="right">
                                <Button
                                  onClick={() => {
                                    DeleteAllServices(e._id);
                                  }}
                                >
                                  <DeleteForeverIcon />
                                </Button>
                              </Tooltip>
                            </TableCell>
                            <TableCell align="left">
                              <Tooltip title="update" placement="right">
                                <Button
                                  onClick={(el) => {
                                    setUpdatedialogueOpenService(
                                      !updateDialogueOpenService
                                    );
                                    setStoreIdService(e?._id);
                                  }}
                                >
                                  <EditIcon />
                                </Button>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabPanel>
                {/* <TabPanel value="3">
                <Table
                  sx={{ minWidth: 750 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Product Name</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Product Desc</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">ProductType</TableCell>
                      <TableCell align="left">SampleAvailabilty</TableCell>
                      <TableCell align="left">Delete</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {RecomendedProductData?.data?.map((e) => {
                      return (
                        <TableRow
                          key={e.name}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left">{e.ProductName}</TableCell>
                          <TableCell align="left">{e.ProductPrice}</TableCell>
                          <TableCell align="left">{e.ProductDesc}</TableCell>
                          <TableCell align="left">{e.ProductQty}</TableCell>
                          <TableCell align="left">{e.ProductType}</TableCell>
                          <TableCell align="left">
                            {e.SampleAvailabilty}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete">
                              <Button
                                onClick={() => {
                                  DeleteAllServices(e._id);
                                }}
                              >
                                <DeleteForeverIcon />
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabPanel> */}
              </TabContext>
            </Box>
          </Grid>

          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Link to="/createduser" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  p: 8,
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
                width={100}
                height={50}
                bgcolor="primary.main"
                color="primary.contrastText"
                borderRadius={10}
                p={2}
              >
                Created User
              </Box>
            </Link>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Link
              to="/createduser"
              style={{
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  p: 8,
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
                width={100}
                height={50}
                bgcolor="primary.main"
                color="primary.contrastText"
                borderRadius={10}
                p={2}
              >
                Bid
              </Box>
            </Link>
          </Grid>
        </Grid>
        <Footer />
      </Paper>
    </>
  );
};

export default Home;

const grdMargin = {
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "100px",
};
