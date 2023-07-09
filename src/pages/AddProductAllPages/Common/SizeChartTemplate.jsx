import React, { useState, useEffect } from "react";
import {
    Box,
    Input,
    Typography,
    Select,
    MenuItem,
    Button,
    FormGroup,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";
// import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { map, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import { Form } from "react-hook-form";
import Bxitoken from "../../../assets/Images/CommonImages/BXIToken.svg";
const lengthSizearr = ["", "mm", "cm", "m", "km", "in", "ft", "yd", "mi", "nmi"];
const SizesXLarr = [
    "xs",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "XXXXL",
    "XXXXXL",
    "plus",
];
const NumericslSizeArr = [
    "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52",
];
const unitsForVolume = ["ml", "oz", "l", "cu ft"];
const unitsForShelfLife = ["days", "months", "Years"];
const UnitsOfTemprature = ["C", "F"];
const UnitsOfNutritonValue = ["g", "%DV", "tonne", "kg", "g", "mlg", "mig"];
const unitsForWeight = ["oz", "g", "kg", "lb", "l", "ml", "cu ft"];
const unitsForBatteryCapacity = ["mAh", "Ah"];
const unitsForPowerConsumption = ["W", "KW", "HP", "V", "A"];
const unitsForStorage = [
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
    "Tons",
    "Liters",
];
const unitsOfResolutions = ["PX", "DPI", "PPI", "LPI"];
const unitsOfFrequency = ["Hz", "KHz", "MHz", "GHz"];
const unitsOfVolumes = ["ml", "oz", "L", "cu ft"];
const showSizesToRender = {
    "US": ['',
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
        49, 50,
    ],
    "UK": [
        '', 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10.5, 11, 11.5,
    ],
    "EU": ['', 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
}

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

const GSTOptions = [0, 5, 12, 18, 28]
export default function SizeChartTemplate(props) {

    const [StoreGst, setStoreGST] = useState();
    const [customhsnFields, setCustomHSNFields] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [storehsn, setStorehsn] = useState();
    const [selected, SetSelected] = useState(false);
    const [color, setColor] = useState("#ffffff");
    const [TotalValueUploaded, setTotalValueUploaded] = useState()


    const schema = z.object({
        ProductColor: localStorage.getItem("digitalData") === "Offer Specific" ?
            (
                localStorage.getItem("companyType") === "Textile"
                || localStorage.getItem("companyType") === "Mobility"
                || localStorage.getItem("companyType") === "Electronics"
                || localStorage.getItem("companyType") === "Office Supply"
                || localStorage.getItem("companyType") === "Lifestyle"
            )
                ?
                z.string().length(7) : z.string().optional() : z.string().optional(),
        OfferingType: localStorage.getItem("digitalData") === "Offer Specific" ?
            (localStorage.getItem("companyType") === "Hotel" || localStorage.getItem("companyType") === "QSR") ?
                z.string().min(1).max(25) : z.string().optional() : z.string().optional(),
        Flavor: localStorage.getItem("digitalData") === "Offer Specific" ?
            localStorage.getItem("companyType") === "FMCG" ?
                z.string().min(1) : z.any() : z.any(),
        ShoeSize:
            props.size === "Shoes"
                ? z.coerce.number().min(1)
                : z.string().optional(),
        ShoeSizeUnit:
            props.size === "Shoes"
                ? z.string().min(1)
                : z.string().optional(),
        DateOfTheEvent: z.string().optional(),
        ProductSize: z.any(),
        GST: z.any(),
        HSN: z.coerce.number().min(1).max(999999,"please enter valid HSN."),
        validityOfVoucherValue: z.any(),
        // validityOfVoucherUnit: z.string().min(1),
        PricePerUnit: z.string().min(1).max(10),
        MinOrderQuantity: z.string().min(1).max(10),
        MaxOrderQuantity: z.string().min(1).max(10),
        TotalAvailableQty: z.string().min(1).max(10),
        // TotalValueUploaded: z.string().optional(),
        length: localStorage.getItem("digitalData") === "Offer Specific" ?
            (
                localStorage.getItem("companyType") != "Hotel"
                && localStorage.getItem("companyType") != "QSR"
                && localStorage.getItem("companyType") != "Entertainment & Events"
                && localStorage.getItem("companyType") != "Airlines Tickets"
            )
                ?
                props.size === "Length" ||
                    props.size === "Length x Height" ||
                    props.size === "Length x Height x Width" ||
                    props.size === "Custom Size" ||
                    props.size === "GSM"
                    ? z.string().min(1)
                    : z.string().optional()
                : z.string().optional() : z.string().optional(),
        width:
            props.size === "Length x Height x Width"
                ? z.string().min(1)
                : z.string().optional(),
        height:
            props.size === "Length x Height" ||
                props.size === "Length x Height x Width"
                ? z.string().min(1)
                : z.string().optional(),
        measureMentUnit: localStorage.getItem("digitalData") === "Offer Specific" ?
            (localStorage.getItem("companyType") != "Hotel" && localStorage.getItem("companyType") != "Lifestyle" && localStorage.getItem("companyType") != "Entertainment & Events" && localStorage.getItem("companyType") != "Airlines Tickets"  && localStorage.getItem("companyType") != "QSR") ?
                z.string().min(1, "Please select Unit.") : z.any() : z.any(),
        listPeriod: z.any(),
        weight:
            props.size === "Weight" ? z.string().min(1) : z.string().optional(),
        batteryCapacity:
            props.size === "BatteryCapacity"
                ? z.string().min(1)
                : z.string().optional(),
        powerConsumption:
            props.size === "PowerConsumption"
                ? z.string().min(1)
                : z.string().optional(),
        volume:
            props.size === "Volume" ? z.string().min(1) : z.string().optional(),
        calories:
            props.size === "CalorieCount"
                ? z.string().min(1)
                : z.string().optional(),
        shelfLife:
            props.size === "ShelfLife"
                ? z.string().min(1)
                : z.string().optional(),
        nutritioninfo:
            props.size === "NutritionalInformation"
                ? z.string().min(1)
                : z.string().optional(),
        temprature:
            props.size === "Temprature"
                ? z.string().min(1)
                : z.string().optional(),
        storageCapacity:
            props.size === "StorageCapacity"
                ? z.string().min(1)
                : z.string().optional(),
        resolution:
            props.size === "Resolution"
                ? z.string().min(1)
                : z.string().optional(),
        amplification:
            props.size === "Amplification"
                ? z.string().min(1)
                : z.string().optional(),
        frequency:
            props.size === "Frequency"
                ? z.string().min(1)
                : z.string().optional(),

    })


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        trigger,
        setError,
        formState: { errors, isValid },
        watch
    } = useForm({
        resolver: zodResolver(schema),
    });


    const watchTotalAvailableQty = watch('TotalAvailableQty', '');
    const watchPricePerUnit = watch('PricePerUnit', '');


    useEffect(()=>{
        console.log("props.defaultValue",props)
    },[props.defaultValue])

    useEffect(() => {
        if (props.defaultValue == null) {
            return;
        }
        // setValue(props.defaultValue);
        for (let [key, value] of Object.entries(props.defaultValue)) {
            if(key == 'PricePerUnit' || key == 'MinOrderQuantity' || key == 'MaxOrderQuantity'){
                value = value.toLocaleString("en-US")
            }
            setValue(key, value);
        }
        updateTotalUploadedPrice()
    }, [props.defaultValue]);

    function stopPropagate(callback) {
        return (e) => {
            e.stopPropagation();
            callback();
        };
    }

    useEffect(() => {
        setValue("ProductColor", color);
        setValue("height", "");
        setValue("width", "");
        // setValue("measureMentUnit", "");
        setValue(
            "ProductSize",
            getValues("height") + getValues("width") + getValues("length")
        );
    }, [color]);



    useEffect(() => {
        updateTotalUploadedPrice({ TotalAvailableQty: watchTotalAvailableQty, PricePerUnit: watchPricePerUnit });
    }, [watchTotalAvailableQty, watchPricePerUnit]);


    const updateTotalUploadedPrice = () => {
        if(watchPricePerUnit && watchTotalAvailableQty){
            const TotalAvailableQty = parseFloat(watchTotalAvailableQty.toString().replace(/,/g, ''));
            const PricePerUnit = parseFloat(watchPricePerUnit.toString().replace(/,/g, ''));
            const total = isNaN(TotalAvailableQty) || isNaN(PricePerUnit) ? '' : (TotalAvailableQty * PricePerUnit);
            setTotalValueUploaded(total.toLocaleString("en-US"))
        }
        
    }


    const formatDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <Box>

            <Box
                sx={{
                    my: 3,
                    border: "1px solid #E3E3E3",
                    borderRadius: "10px",
                    height: "auto",
                    minHeight: "100px",
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    gap: "5px",
                    px: 2,
                    py: 2,
                }}
                className="voucher-variations"
            >

                {/* price per unit start */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Price/Voucher<span style={{ color: "red" }}> *</span></Typography>

                    <Box sx={{ position: "relative" }}>
                        <Input
                            disableUnderline
                            // value={data.mro}
                            placeholder="1000"
                            {...register("PricePerUnit", {
                                onChange: (event) => {
                                    event.target.value = parseInt(
                                        event.target.value.replace(/[^\d]+/gi, "") || 0
                                    ).toLocaleString("en-US");
                                },
                            })}
                            sx={{
                                width: "139px",
                                height: "42px",
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                fontSize: "12px",
                                px: 1,
                                color: "#445FD2",
                                border: errors["PricePerUnit"] ? "1px solid red" : null,
                            }}
                        />

                        <img
                            src={Bxitoken}
                            style={{
                                position: "absolute",
                                width: "20px",
                                right: "7%",
                                bottom: "20%",
                            }}
                        />
                    </Box>

                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.PricePerUnit?.message}
                    </Typography>
                </Box>
                {/* price per unit ends */}

                {/* Total Available QTY start */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Total Available QTY<span style={{ color: "red" }}> *</span></Typography>

                    <Input
                        disableUnderline
                        // value={data.minimum}
                        placeholder="1"
                        {...register("TotalAvailableQty", {
                            onChange: (event) => {
                                event.target.value = parseInt(
                                    event.target.value.replace(/[^\d]+/gi, "") || 0
                                ).toLocaleString("en-US");
                            },
                        })}
                        sx={{
                            width: "139px",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            fontSize: "12px",
                            color: "#445FD2",
                            px: 1,
                            border: errors["TotalAvailableQty"] ? "1px solid red" : null,
                        }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.TotalAvailableQty?.message}
                    </Typography>
                </Box>

                {/* Total Available QTY ends */}



                {/* min order start */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Min order Quantity<span style={{ color: "red" }}> *</span></Typography>

                    <Input
                        disableUnderline
                        // value={data.minimum}
                        placeholder="1"
                        {...register("MinOrderQuantity", {
                            onChange: (event) => {
                                event.target.value = parseInt(
                                    event.target.value.replace(/[^\d]+/gi, "") || 0
                                ).toLocaleString("en-US");
                            },
                        })}
                        sx={{
                            width: "139px",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            fontSize: "12px",
                            color: "#445FD2",
                            px: 1,
                            border: errors["MinOrderQuantity"] ? "1px solid red" : null,
                        }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.MinOrderQuantity?.message}
                    </Typography>
                </Box>

                {/* min order ends */}


                {/* Max order starts */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "135px",
                    }}
                >
                    <Typography sx={{ ...CommonTextStyle }}>
                        {" "}
                        Max order Quantity<span style={{ color: "red" }}> *</span>
                    </Typography>

                    <Input
                        disableUnderline
                        // value={data.maximum}
                        placeholder="1000"
                        {...register("MaxOrderQuantity", {
                            onChange: (event) => {
                                event.target.value = parseInt(
                                    event.target.value.replace(/[^\d]+/gi, "") || 0
                                ).toLocaleString("en-US");
                            },
                        })}
                        sx={{
                            width: "139px",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            fontSize: "12px",
                            color: "#445FD2",
                            px: 1,
                            border: errors["MaxOrderQuantity"] ? "1px solid red" : null,
                        }}
                    />

                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.MaxOrderQuantity?.message}
                    </Typography>
                </Box>

                {/* Max order end */}

                {/* Total Uploaded value starts */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "148px",
                    }}
                >
                    <Typography sx={{ ...CommonTextStyle }}>
                        Total Uploaded value
                    </Typography>

                    <Input
                        disableUnderline
                        name="TotalValueUploaded"
                        onChange={(event) => {
                            event.target.value = parseInt(
                                event.target.value.replace(/[^\d]+/gi, "") || 0
                            ).toLocaleString("en-US");
                        }}
                        // value={data.maximum}
                        // {...register("TotalValueUploaded", {
                        //   onChange: (event) => {
                        //     event.target.value = parseInt(
                        //       event.target.value.replace(/[^\d]+/gi, "") || 0
                        //     ).toLocaleString("en-US");
                        //   },
                        // })}
                        placeholder="1000"
                        disabled
                        value={TotalValueUploaded}
                        sx={{
                            width: "139px",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            fontSize: "12px",
                            color: "#445FD2",
                            px: 1,
                        }}
                    />


                </Box>

                {/* Total Uploaded value end */}

                {/* HSN GST start */}
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "140px",
                        }}
                    >
                        <Typography sx={CommonTextStyle}>HSN<span style={{ color: "red" }}> *</span></Typography>

                        <Box sx={{ position: "relative" }}>
                            <Input
                                disableUnderline
                                // required={true}
                                placeholder="998346"
                                {...register("HSN")}
                                sx={{
                                    width: "130px",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    borderRadius: "10px",
                                    px: 1,
                                    fontSize: "12px",
                                    color: "#445FD2",
                                    border: errors["HSN"] ? "1px solid red" : null,
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === " " && e.target.selectionStart === 0) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Box>
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                            {errors?.HSN?.message}
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
                        <Typography sx={CommonTextStyle}>GST<span style={{ color: "red" }}> *</span></Typography>

                        <Box sx={{ position: "relative" }}>
                            <Select
                                sx={{ ...GW, width: '98%' }}
                                defaultValue="0"
                                {...register("GST")}
                            >
                                {
                                    GSTOptions.map((x, ind) => {
                                        return (
                                            <MenuItem sx={MenuItems} value={x}>
                                                {x}
                                            </MenuItem>
                                        )
                                    })
                                }


                            </Select>

                            <Typography
                                sx={{
                                    position: "absolute",
                                    right: "25%",
                                    bottom: "25%",
                                    color: "#979797",
                                    fontSize: "15px",
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === " " && e.target.selectionStart === 0) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                %
                            </Typography>
                        </Box>
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                            {errors?.GST?.message}
                        </Typography>
                    </Box>
                </>
                {/* HSN GST end */}


                {/* color box start */}
                {localStorage.getItem("digitalData") === "Offer Specific"
                    && (localStorage.getItem("companyType") === "Textile"
                        || localStorage.getItem("companyType") === "Mobility"
                        || localStorage.getItem("companyType") === "Electronics"
                        || localStorage.getItem("companyType") === "Office Supply"
                        || localStorage.getItem("companyType") === "Lifestyle"
                    ) &&
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "140px",
                        }}
                    >
                        <Typography sx={CommonTextStyle}>Color</Typography>
                        <Box
                            sx={{
                                // width: "139px",
                                // height: "42px",
                                // background: "#FFFFFF",
                                borderRadius: "10px",
                                // px: 1,
                                background: "white",
                                width: "139px",
                                height: "42px",
                                display: "flex",
                                // justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                                color: "#445FD2",
                            }}
                        >
                            <input
                                // disableUnderline
                                // value={getValues("ProductColor")}
                                type="color"
                                // {...register("ProductColor", {
                                //   onChange: (e) => {
                                //     // console.log(e.target.value);
                                //     trigger("ProductColor");
                                //   },
                                // })}
                                value={color}
                                onChange={(e) => {
                                    setColor(e.target.value);
                                    // setValue("ProductColor", e.target.value);
                                    // trigger("ProductColor");
                                }}
                                style={{
                                    height: "40px",
                                    width: "60px",
                                    border: "1px",
                                    cursor: "pointer",
                                    color: "#445FD2",
                                    fontSize: "12px",
                                }}
                            // label={ProductColor}
                            />
                            <Input
                                disableUnderline
                                value={color}
                                onChange={(e) => {
                                    setColor(e.target.value);
                                }}
                                // {...register("ProductSize")}
                                {...register("ProductColor")}
                                sx={{
                                    width: "139px",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    borderRadius: "10px",
                                    px: 1,
                                    color: "#445FD2",
                                }}
                            />
                        </Box>
                        {/* {errors?.ProductColor?.message} */}
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                            {errors?.ProductColor?.message}
                        </Typography>
                    </Box>
                }

                {/* color box end */}

                {
                    localStorage.getItem("digitalData") === "Offer Specific" && (localStorage.getItem("companyType") != "undefined" && localStorage.getItem("companyType") != "Hotel" && localStorage.getItem("companyType") != "Entertainment & Events" && localStorage.getItem("companyType") != "Airlines Tickets" && localStorage.getItem("companyType") != "QSR") && <SizeChart size={props.size} register={register} errors={errors} />
                }

                {/* offering type box start */}
                {localStorage.getItem("digitalData") === "Offer Specific" && (localStorage.getItem("companyType") == "Hotel" || localStorage.getItem("companyType") == "QSR") &&
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "140px",
                        }}
                    >
                        <Typography sx={CommonTextStyle}>Offering Type</Typography>
                        <Box sx={{ position: "relative" }}>
                            <Input
                                disableUnderline
                                // value={data.mro}
                                placeholder={localStorage.getItem("companyType") == "Hotel" ? "Single Room" : "Lorem"}
                                {...register("OfferingType")}
                                sx={{
                                    width: "139px",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    px: 1,
                                    color: "#445FD2",
                                    border: errors["OfferingType"] ? "1px solid red" : null,
                                }}
                            />


                        </Box>

                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                            {errors?.OfferingType?.message}
                        </Typography>
                    </Box>
                }

                {/* offering type box end */}


                {/* Flavor Box Starts */}
                {localStorage.getItem("digitalData") === "Offer Specific" && localStorage.getItem("companyType") == "FMCG" &&
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "140px",
                        }}
                    >
                        <Typography sx={CommonTextStyle}>Flavor</Typography>
                        <Input
                            disableUnderline
                            // value={data.maximum}
                            {...register("Flavor")}
                            sx={{
                                width: "139px",
                                height: "42px",
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                fontSize: "12px",
                                color: "#445FD2",
                                px: 1,
                                border: errors["Flavor"] ? "1px solid red" : null
                            }}
                        />
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                            {errors?.Flavor?.message}
                        </Typography>
                    </Box>
                }
                {/* Flavor Box Ends */}


                {/* date of event start */}
                {
                    localStorage.getItem("digitalData") == "Offer Specific" && localStorage.getItem("companyType") == "Entertainment & Events" && 
                    <Box sx={boxStyle2} >
                        <Typography sx={CommonTextStyle}>Date of the Event</Typography>
                        <Box sx={box3} >
                            <TextField type="date" id="standard-basic" variant="standard"
                                defaultValue={formatDate()}
                                {...register("DateOfTheEvent")}
                                InputProps={{
                                    disableUnderline: "true",
                                    style: {
                                        color: "rgba(68, 95, 210, 1)",
                                        fontSize: "14px",
                                        padding: "7px",
                                        background: "transparent",
                                    },
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: "red",
                                    },
                                }}
                                sx={{
                                    width: "auto",
                                    height: "100%",
                                    background: "#fff",
                                    borderRadius: "10px",
                                }}
                            />
                        </Box>

                    </Box>
                }
                {/* date of event end */}
                {/* validity start */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Validity of Voucher<span style={{ color: "red" }}> *</span></Typography>
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
                            defaultValue="1 Month"
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
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.validityOfVoucherValue?.message}
                    </Typography>
                </Box>
                {/* validity ends */}

            </Box>


            <Box>
                <Button
                    // onClick={handleAdd}
                    onClick={async () => {
                        if ((await trigger()) === false) {
                            console.log('getValues().TotalValueUploaded', getValues().TotalValueUploaded)
                            console.log(errors, "errors=====>", props.size);
                            return;
                        }
                        if (
                            parseFloat(getValues().MaxOrderQuantity.replace(/,/g, "")) <
                            parseFloat(getValues().MinOrderQuantity.replace(/,/g, ""))
                        ) {
                            setError("MaxOrderQuantity", {
                                type: "custom",
                                message:
                                    "Max Order Quantity can not be less than Min Order Quantity",
                            });
                        } else if (
                            parseFloat(getValues().TotalAvailableQty.replace(/,/g, "")) <
                            parseFloat(getValues().MaxOrderQuantity.replace(/,/g, ""))
                        ) {
                            setError("MaxOrderQuantity", {
                                type: "custom",
                                message:
                                    "Max Order Quantity can not be greater than Total Quantity",
                            });
                        } else {
                            
                            if (localStorage.getItem("digitalData") === "Offer Specific") {
                                if (props.size === "Length x Height x Width") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().length}${getValues().measureMentUnit} x ${getValues().height
                                        }${getValues().measureMentUnit} x ${getValues().width}${getValues().measureMentUnit
                                        }`
                                    );
                                } else if (props.size === "Length x Height") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().length}${getValues().measureMentUnit} x ${getValues().height
                                        }${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Custom Size") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().length}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Length") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().length}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Size S to 3XL") {
                                    setValue("ProductSize", `${getValues().measureMentUnit}`);
                                } else if (props.size === "Size 26 to 42") {
                                    setValue("ProductSize", `${getValues().measureMentUnit}`);
                                } else if (props.size === "GSM") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().length}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Weight") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().weight}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "BatteryCapacity") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().batteryCapacity}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "PowerConsumption") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().powerConsumption}${getValues().measureMentUnit
                                        }`
                                    );
                                } else if (props.size === "StorageCapacity") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().storageCapacity}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Resolution") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().resolution}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Amplification") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().amplification}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Frequency") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().frequency}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "CalorieCount") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().calories}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "ShelfLife") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().shelfLife}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "NutritionalInformation") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().nutritioninfo}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Temprature") {
                                    setValue(
                                        "ProductSize",
                                        `${getValues().temprature}${getValues().measureMentUnit}`
                                    );
                                } else if (props.size === "Shoes") {
                                    setValue("ProductSize", `${getValues().ShoeSizeUnit} - ${getValues().ShoeSize}`);
                                }
                            }

                            setValue("TotalValueUploaded", parseFloat(TotalValueUploaded.replace(/,/g, "")))
                            console.log(getValues(), "getValues");
                            props.append(getValues(), props.index);
                            // reset();
                            reset((formValues) => ({
                                formValues,
                                PricePerUnit: "",
                                // // DiscountedPrice: "",
                                MinOrderQuantity: "",
                                MaxOrderQuantity: "",
                                TotalAvailableQty: "",
                                // length: "",
                                // height: "",
                                // width: "",
                                // weight: "",
                            }));
                        }
                    }}
                    sx={{
                        width: "100%",
                        height: "41px",
                        background: "#445FD2",
                        borderRadius: "10px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#FFFFFF",
                        textTransform: "none",
                        "&:hover": {
                            background: "#445FD2",
                        },
                        my: 3,
                    }}
                >
                    Proceed to ADD
                </Button>
            </Box>
        </Box>
    );
}

const CommonTextStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "21px",
    color: "#6B7A99",
};

const MenuItems = {
    fontSize: "14px",
    color: "#445FD2",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
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
    background: "#fff",
    height: "100%",
    color: "#445FD2",
    fontSize: "12px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    borderRadius: "0px 10px 10px 0px",
    padding: 0
};

function SizeChart(props) {
    const [shoeSizeCountry, setShoeSizeCountry] = useState();

    switch (props.size) {
        case "Length":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >

                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="L"
                            type="number"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                inputProps: { min: 0 },
                                style: {
                                    color: "#445FD2",
                                    fontSize: "12px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}

                            {...props.register("measureMentUnit")}
                        >

                            {lengthSizearr?.map((item, idx) => {
                                return (
                                    <MenuItem sx={MenuItems} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.length?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Length x Height":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        // gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>
                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: 1,
                            mx: "auto",
                            borderRadius: "10px",
                            // background: "red",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="L"
                            type="number"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...register("List")}
                            InputProps={{
                                inputProps: { min: 0 },
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "35%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />
                        <TextField
                            // value={data.size}
                            {...props.register("height")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="H"
                            type="number"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...register("List")}
                            InputProps={{
                                inputProps: { min: 0 },
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "35%",
                                height: "100%",
                                background: "#FFFFFF",
                                // borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={{ ...GW, width: "30%" }}
                            InputLabelProps={{ padding: 0 }}
                            {...props.register("measureMentUnit")}
                        >
                            {lengthSizearr?.map((item, idx) => {
                                return (
                                    <MenuItem sx={MenuItems} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {/* <Typography sx={ErrorStyle}>{errors["List"]?.message}</Typography> */}
                    </Box>

                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.length?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.height?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Length x Height x Width":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        // gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>
                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: 1,
                            mx: "auto",
                            borderRadius: "10px",
                            // background: "red",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="L"
                            type="number"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...register("List")}
                            InputProps={{
                                inputProps: { min: 0 },
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "20%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />
                        <TextField
                            // value={data.size}
                            {...props.register("height")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="H"
                            type="number"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...register("List")}
                            InputProps={{
                                inputProps: { min: 0 },
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "20%",
                                height: "100%",
                                background: "#FFFFFF",
                                // borderRadius: "10px 0px 0px 10px",
                            }}
                        />
                        <TextField
                            // value={data.size}
                            {...props.register("width")}
                            // {...register("ProductSize")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="W"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...register("List")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "20%",
                                height: "100%",
                                background: "#FFFFFF",
                                // borderRadius: "10px 0px 0px 10px",
                            }}
                        />
                        <Select
                            sx={{ ...GW, width: "40%" }}

                            // {...register("ListPeriod")}
                            {...props.register("measureMentUnit")}
                        >
                            {lengthSizearr?.map((item, idx) => {
                                return (
                                    <MenuItem sx={MenuItems} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {/* <Typography sx={ErrorStyle}>{errors["List"]?.message}</Typography> */}
                    </Box>
                    {/* <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
      {errors?.ProductSize?.message}
    </Typography> */}
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.length?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.height?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.width?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Size S to 3XL":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>

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
                            sx={{ ...GW, width: "100%", borderRadius: "10px 10px 10px 10px" }}
                            defaultValue={"S"}
                            {...props.register("measureMentUnit")}
                        >
                            {SizesXLarr?.map((item, idx) => {
                                return (
                                    <MenuItem sx={MenuItems} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Size 26 to 42":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>

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
                            sx={{ ...GW, width: "100%", borderRadius: "10px 10px 10px 10px" }}
                            defaultValue={"28"}
                            {...props.register("measureMentUnit")}
                        >
                            {NumericslSizeArr?.map((item, idx) => {
                                return (
                                    <MenuItem sx={MenuItems} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "GSM":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            type="number"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                inputProps: { min: 0 },
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"gsm"}
                            {...props.register("measureMentUnit")}
                        >
                            <MenuItem sx={MenuItems} value="gsm">
                                gsm
                            </MenuItem>
                            <MenuItem sx={MenuItems} value="oz">
                                oz
                            </MenuItem>
                            <MenuItem sx={MenuItems} value="sqyard">
                                sq yard
                            </MenuItem>
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.length?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Custom Size":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    {/* {if(props.size === "Length"){
      return(
        "props.size"
      )
    }} */}
                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="amount"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "50%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                                borderRight: "0.5px solid rgba(107, 122, 153)",
                            }}
                        />
                        <TextField
                            // value={data.size}
                            {...props.register("measureMentUnit")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="unit"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "49%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "0px 10px 10px 0px",
                            }}
                        />

                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.length?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Weight":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Weight</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("weight")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="Weight"
                            type="number"
                            InputProps={{
                                inputProps: { min: 0 },
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"oz"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsForWeight?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.weight?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "BatteryCapacity":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Battery Capacity</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("batteryCapacity")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"mAh"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsForBatteryCapacity?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                  db
                </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.batteryCapacity?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "PowerConsumption":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "160px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Power Consumption</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("powerConsumption")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"W"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsForPowerConsumption?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                  db
                </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.powerConsumption?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "volume":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>volume</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("volume")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="Volume"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            {...props.register("volume")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"ml"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsOfVolumes?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                  db
                </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.volume?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Custom Size":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="amount"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                                borderRight: "0.5px solid rgba(107, 122, 153)",
                            }}
                        />
                        <TextField
                            // value={data.size}
                            {...props.register("measureMentUnit")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="unit"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "0px 10px 10px 0px",
                            }}
                        />

                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.length?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "StorageCapacity":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Storage Capacity</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("storageCapacity")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"MB"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsForStorage?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.storageCapacity?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Resolution":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Resolution</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("resolution")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"PX"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsOfResolutions?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.resolution?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Amplification":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Amplification</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("amplification")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"DB"}
                            {...props.register("measureMentUnit")}
                        >
                            {/* {unitsOfResolutions?.map((unit) => {
                            return ( */}
                            <MenuItem sx={MenuItems} value={"DB"}>
                                DB
                            </MenuItem>
                            {/* ); */}
                            {/* })} */}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.amplification?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Frequency":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Frequency</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("frequency")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"Hz"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsOfFrequency?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.frequency?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "CalorieCount":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Calorie Count</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                            border: props?.errors?.calories?.message
                                ? "1px solid red"
                                : null,
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("calories")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"cal"}
                            {...props.register("measureMentUnit")}
                        >
                            {/* {unitsForBatteryCapacity?.map((unit) => {
                            return ( */}
                            <MenuItem sx={MenuItems} value={"cal"}>
                                cal
                            </MenuItem>
                            {/* ); */}
                            {/* })} */}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.calories?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "ShelfLife":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Shelf Life</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                            border: props?.errors?.shelfLife?.message
                                ? "1px solid red"
                                : null,
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("shelfLife")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"days"}
                            {...props.register("measureMentUnit")}
                        >
                            {unitsForShelfLife?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.shelfLife?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "NutritionalInformation":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Nutritional</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                            border: props?.errors?.nutritioninfo?.message
                                ? "1px solid red"
                                : null,
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("nutritioninfo")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"MB"}
                            {...props.register("measureMentUnit")}
                        >
                            {UnitsOfNutritonValue?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.nutritioninfo?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Temprature":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Temprature</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                            border: props?.errors?.temprature?.message
                                ? "1px solid red"
                                : null,
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("temprature")}
                            id="standard-basic"
                            variant="standard"
                            placeholder="Temprature"
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "#445FD2",
                                    fontSize: "14px",
                                    padding: "7px",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"PX"}
                            {...props.register("measureMentUnit")}
                        >
                            {UnitsOfTemprature?.map((unit) => {
                                return (
                                    <MenuItem sx={MenuItems} value={unit}>
                                        {unit}
                                    </MenuItem>
                                );
                            })}
                            {/* <MenuItem sx={MenuItems} value="db">
                            db
                          </MenuItem> */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.temprature?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.measureMentUnit?.message}
                    </Typography>
                </Box>
            );
        case "Shoes":
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >
                    <Typography sx={CommonTextStyle}>Size</Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                            display: "flex",
                        }}
                    >
                        <Select

                            {...props.register("ShoeSizeUnit")}
                            sx={{
                                ...GW,
                                borderRadius: "10px 0px 0px 10px",
                                borderRight: "0.5px solid grey",
                            }}
                            // defaultValue={usShoeSizes}
                            onChange={(e) => {
                                setShoeSizeCountry(e.target.value);
                            }}
                        >
                            <MenuItem sx={MenuItems} value={'US'}>
                                US
                            </MenuItem>
                            <MenuItem sx={MenuItems} value={'UK'}>
                                UK
                            </MenuItem>
                            <MenuItem sx={MenuItems} value={'EU'}>
                                EU
                            </MenuItem>
                        </Select>

                        <Select sx={GW} defaultValue={"30"} {...props.register("ShoeSize")}>
                            {
                                shoeSizeCountry && showSizesToRender[shoeSizeCountry].map((item, idx) => {
                                    return (
                                        <MenuItem sx={MenuItems} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })
                            }
                            {/* {shoeSizeCountry?.map((item, idx) => {
                          return (
                            <MenuItem sx={MenuItems} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })} */}
                        </Select>
                    </Box>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.ShoeSizeUnit?.message}
                    </Typography>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {props?.errors?.ShoeSize?.message}
                    </Typography>

                </Box>
            );
        default:
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "140px",
                    }}
                >

                    <Typography sx={CommonTextStyle}>Size<span style={{ color: "red" }}> *</span></Typography>

                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "1000px",
                            height: "42px",
                            mt: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <TextField
                            // value={data.size}
                            {...props.register("length")}
                            id="standard-basic"
                            variant="standard"
                            placeholder=""
                            // onChange={(e) => {
                            //   setListPeriod(e.target.value);
                            // }}
                            // {...props.register("listPeriod")}
                            InputProps={{
                                disableUnderline: "true",
                                style: {
                                    color: "rgba(107, 122, 153)",
                                    fontSize: "14px",
                                    padding: "7px",
                                    color: "#445FD2",
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "red",
                                },
                            }}
                            sx={{
                                width: "45%",
                                height: "100%",
                                background: "#FFFFFF",
                                borderRadius: "10px 0px 0px 10px",
                            }}
                        />

                        <Select
                            sx={GW}
                            defaultValue={"in"}
                            {...props.register("measureMentUnit")}
                        >
                            <MenuItem sx={MenuItems} value="in">
                                in
                            </MenuItem>
                            <MenuItem sx={MenuItems} value="cm">
                                cm
                            </MenuItem>
                            <MenuItem sx={MenuItems} value="gsm">
                                gsm
                            </MenuItem>
                        </Select>
                    </Box>
                </Box>
            );
    }
}




const boxStyle2 = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    mt: 1,
    maxWidth: "140px",
}
const box3 = {
    borderRadius: "10px",
    background: "white",
    width: "139px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
}