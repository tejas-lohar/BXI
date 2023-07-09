import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    TextField,
    FormControl,
    ThemeProvider,
    Select,
    MenuItem,
    Input,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress
} from "@mui/material";
import { voucherStyle } from './EditVoucherStyle'
import UploadtoCloud from "../../../assets/UploadtoCloud.svg";
import DeleteIcon from "../../../assets/Images/CommonImages/DeleteIcon.svg";
import ProductAddTheme from "../../../components/GlobalStyle/MaterialUiGlobalStyle";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const validityVoucherOptions = [
    "1 Month",
    "2 Months",
    "3 Months",
    "4 Months",
    "5 Months",
    "6 Months",
    "7 Months",
    "8 Months",
    "9 Months",
    "10 Months",
    "11 Months",
    "12 Months",
    "13 Months",
    "14 Months",
    "15 Months",
    "16 Months",
    "17 Months",
    "18 Months",
]

const EditVoucherForm = ({ cardData, closePopup, updateFormData }) => {
    const inputRef = useRef();
    const [files, setFiles] = useState(null);
    const [selectedValue, setSelectedValue] = useState("");


    const [productName, setProductName] = useState(cardData?.productName)
    const [productSubtitle, setproductSubtitle] = useState(cardData?.productSubtitle)
    // const [validityOfVoucherUnit, setValidityOfVoucherUnit] = useState(cardData?.validityOfVoucherUnit)
    const [validityOfVoucherValue, setValidityOfVoucherValue] = useState(cardData?.validityOfVoucherValue)
    const [pricePerUnit, setPricePerUnit] = useState(cardData?.pricePerUnit)
    const [redemptionType, setRedemptionType] = useState(cardData?.redemptionType)
    const [inclusions, setInclusions] = useState(cardData?.inclusions)
    const [exclusions, setExclusions] = useState(cardData?.exclusions)
    const [redemptionURL, setRedemptionURL] = useState(cardData?.redemptionURL)
    const [voucherType, setVoucherType] = useState(cardData?.voucherType)

    const classes = voucherStyle()

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (event) => {
        event.preventDefault();
        // setFiles(event.dataTransfer.files);
    };
    const handleChangeone = (event) => {
        setSelectedValue(event.target.value);
    };

    const schema = z.object({
        productname: z.string().nonempty('This field is required').min(5, "Product name should be at least 5 characters long").max(25, "Product name should be at most 25 characters long"),
        productsubtitle: z.string().nonempty('This field is required').min(10, "Product subtitle should be at least 10 characters long").max(50, "Product subtitle should be at most 50 characters long"),
        validityOfVoucherValue: z.string().min(1),
        // validityOfVoucherUnit: z.string().min(1),
        Exclusions: z.string().min(1),
        Inclusions: z.string().min(1),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    let updateDetails = handleSubmit((data) => {
        // console.log(data)
        let productDetails = {
            productName: data.productname,
            productSubtitle: data.productsubtitle,
            // validityOfVoucherUnit: data.validityOfVoucherUnit,
            validityOfVoucherValue: data.validityOfVoucherValue,
            inclusions: data.Inclusions,
            exclusions: data.Exclusions,
            pricePerUnit: pricePerUnit,
            redemptionType: redemptionType,
            redemptionURL: redemptionURL,
            voucherType: voucherType
        }
        updateFormData(productDetails);
        closePopup()
        // mutateAsync(
        //   {
        //     ProductName: data.productname.trim(),
        //     productSubtitle: data.productsubtitle.trim(),
        //     ProductDescription: star.trim(),
        //     ProductSubCategory: data.subcategory.trim(),
        //   },
        //   {
        //     onSuccess: (response) => {
        //       if (response?.data._id) {
        //         navigate("/home/hotels/hotelsproductinfo/" + response?.data._id);
        //       } else {
        //         alert("Somethings has gone wrong");
        //       }
        //     },
        //     onError: (error) => {},
        //   }
        // );
    });


    return (
        <form onSubmit={updateDetails}>
            <Box style={{ display: 'flex', gap: '20px', padding: '20px 10px' }} spacing={6}>
                <Box item xs={12} sm={6} md={6} style={{ flex: '0.5' }} >
                    <Box>
                        <Typography sx={CommonTextStyle}>Product Name</Typography>
                        <ThemeProvider theme={ProductAddTheme}>
                            <TextField
                                focused
                                placeholder="Product Name"
                                multiline
                                variant="standard"
                                InputProps={InputPropsStyle}
                                sx={TextFieldStyle}
                                {...register("productname")}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </ThemeProvider>
                        <Typography sx={ErrorStyle}>
                            {errors["productname"]?.message}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "grid", gap: "10px", py: "10px" }}>
                        <Typography sx={TypographyStyle}>Inclusions</Typography>
                        <TextField
                            id="standard-multiline-static"
                            multiline
                            rows={4}
                            variant="standard"
                            placeholder="Inclusions"
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "10px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            {...register("Inclusions")}
                            value={inclusions}
                            sx={textfieldstyle}
                            onChange={(e) => setInclusions(e.target.value)}
                        />
                        <Typography sx={ErrorStyle}>
                            {errors["Inclusions"]?.message}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "140px",
                        }}
                    >
                        <Typography sx={CommonTextStyle}>Validity of Voucher</Typography>

                        <Box
                            sx={{
                                width: "100%",
                                // maxWidth: "1000px",
                                height: "42px",
                                mt: "1%",
                                borderRadius: "10px",
                            }}
                        >
                            <Select
                                sx={{ ...GW, width: '98%' }}
                                defaultValue={validityOfVoucherValue}
                                {...register("validityOfVoucherValue")}
                            >
                                {
                                    validityVoucherOptions.map((x, ind) => {
                                        return (
                                            <MenuItem sx={MenuItems} value={x}>
                                                {x}
                                            </MenuItem>
                                        )
                                    })
                                }


                            </Select>
                        </Box>
                        <Typography sx={ErrorStyle}>
                            {errors["validityOfVoucherUnit"]?.message}
                        </Typography>
                        {/* <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                            {errors?.PricePerUnit?.message}
                        </Typography> */}
                    </Box>
                </Box>
                <Box item xs={12} sm={6} md={6} style={{ flex: '0.5' }} >
                    <Box>
                        <Typography sx={CommonTextStyle}> Product Subtitle </Typography>
                        <TextField
                            focused
                            placeholder="Product Subtitle "
                            multiline
                            variant="standard"
                            sx={TextFieldStyle}
                            InputProps={InputPropsStyle}
                            {...register("productsubtitle")}
                            value={productSubtitle}
                            onChange={(e) => setproductSubtitle(e.target.value)}
                        />
                        <Typography sx={ErrorStyle}>
                            {errors["productsubtitle"]?.message}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "grid", gap: "10px", py: "10px" }}>
                        <Typography sx={TypographyStyle}>Exclusions </Typography>
                        <TextField
                            id="standard-multiline-static"
                            multiline
                            rows={4}
                            variant="standard"
                            placeholder="Exclusions"
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "10px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            {...register("Exclusions")}
                            value={exclusions}
                            sx={textfieldstyle}
                            onChange={(e) => setExclusions(e.target.value)}
                        />
                        <Typography sx={ErrorStyle}>
                            {errors["Exclusions"]?.message}
                        </Typography>
                    </Box>
                    {
                        voucherType != "Offer Specific" &&
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                mt: 1,
                                width: "100%"
                            }}
                        >
                            <Typography sx={CommonTextStyle}>Voucher Type</Typography>
                            <Box
                                sx={{
                                    width: "100%",
                                    // maxWidth: "1000px",
                                    height: "42px",
                                    mt: "1%",
                                    borderRadius: "10px",
                                }}
                            >
                                <Select
                                    sx={GW}
                                    value={voucherType}
                                    onChange={(e) => setVoucherType(e.target.value)}
                                    name="voucherType"
                                >
                                    <MenuItem sx={MenuItems} value="Gift Card">
                                        Gift Card
                                    </MenuItem>
                                    <MenuItem sx={MenuItems} value="Value Voucher">
                                        Value Voucher
                                    </MenuItem>
                                </Select>
                            </Box>
                            <Typography sx={ErrorStyle}>
                                {errors["validityOfVoucherUnit"]?.message}
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "10px", p: 1, width: "100%" }}>
                <Button
                    onClick={() => { closePopup() }}
                    sx={{
                        width: "100%",
                        height: "32px",
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#636161",
                        fontSize: "14px",
                        "&:hover": {
                            background: "#f3f6f9",
                            color: "#000",
                        },
                    }}
                    variant="contained"
                >
                    cancel
                </Button>

                <Button
                    type="submit"
                    sx={{
                        width: "100%",
                        height: "32px",
                        borderRadius: "10px",
                        background: "#445FD2",
                        fontSize: "14px",
                        "&:hover": {
                            background: "#445FD2",
                        },
                    }}
                    variant="contained"
                    onClick={() => updateDetails()}
                >
                    Save
                    {/* {isLoading ? <CircularProgress /> : "Next"} */}
                </Button>
            </Box>
        </form>
    );
};

export default EditVoucherForm;


const CommonTextStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    color: " #6B7A99",
    paddingBottom: "8px",
};


const InputPropsStyle = {
    disableUnderline: true,
    style: {
        background: "#fff",
        fontFamily: "Poppins",
        color: "#445FD2",
        borderRadius: "9px",
        height: "100%",
        paddingLeft: "10px",
        fontSize: "14px",
    },
};
const TextFieldStyle = {
    width: "100%",
    height: "48px",
    background: "#fff",
    borderRadius: "9px",
    border: "none",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    color: "#445FD2",
    overflow: "auto",
    paddingLeft: "0px",
    "&:focus": {
        outline: "none",
    },
};

const ErrorStyle = {
    color: "red",
};

const GW = {
    width: "55%",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
    },
    background: "#FFFFFF",
    height: "100%",
    color: "#445FD2",
    fontSize: "12px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    borderRadius: "0px 10px 10px 0px",
};

const MenuItems = {
    fontSize: "12px",
    color: "#6B7A99",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
};

const lablechange = {
    fontFamily: "Poppins",
    color: "#6B7A99",
    fontSize: "12px",
    display: "grid",
    textAlign: "left",
    marginTop: "2rem",
    fontWeight: "bold",
    "&:focus": {
        border: "1px solid #E8E8E8",
    },
};
const TypographyStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    color: "#6B7A99",
};

const textfieldstyle = {
    width: "100%",
    height: "100px",
    background: "#FFFFFF",
    borderRadius: "10px",
    color: "red",
    fontSize: "14px",
};
