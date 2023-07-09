import React, { useState, useRef, useEffect } from "react";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControlLabel,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    makeStyles,
    Box,
    BottomNavigation,
    Grid,
    RadioGroup,
} from "@material-ui/core";
import { CircularProgress } from "@mui/material";

import InfoIcon from "../../../assets/InfoIcon.svg";
import help from "../../../assets/Help.svg";
import DeleteIcon from "../../../assets/Images/CommonImages/DeleteIcon.svg";
import RedoIcon from "../../../assets/Images/CommonImages/RedoIcon.svg";
import { styles } from './styles/commonStyles'
import { usePostProductQuery } from "../../../Hooks/Products/AddProduct"
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import { useUpdateProductQuery } from "../../../pages/AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";
import useGetProductVoucherFields from "../../../Hooks/ProductActions/useGetProductVoucherFields"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UploadtoCloud from "../../../assets/UploadtoCloud.svg";
const dbData = {
    "StepGoLive": [
        {
            "FieldName": "files",
            "FieldLabel": "Upload Image & Video",
            "FieldType": "file",
            "required": true
        },
        {
            "FieldName": "ListThisProductForAmount",
            "FieldLabel": "List this product for number of days ( maximum 365 days ) ",
            "FieldType": "text",
            "required": true
        }
    ]
}
const GoliveTemplate = () => {

    const productId = useParams().id;
    const classes = styles()
    const navigate = useNavigate();
    const inputRef = useRef();
    const fullPath = useLocation().pathname;

    const { data: voucherData } = useGetProductVoucherFields()

    const {
        mutate: updateProduct,
        isError,
        data: productData,
        reset,
        variables,

        error: RegisterError,
    } = useUpdateProductQuery();
    const { data: ProductData } = useGetProductById(productId);
    const { mutateAsync, isLoading } = usePostProductQuery();

    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState(null);
    const [ListThisProductForUnitOfTime, setListThisProductForUnitOfTime] = useState('Days')

    useEffect(() => {
        console.log('filesfilesfiles', files)
    }, [files])
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                [name]: files[0],
            }));
        } else {
            setFormValues((prevFormValues) =>
                Object.assign({}, prevFormValues, { [name]: value })
            );
        }
        // formValidation();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();
    };

    const formValidation = () => {
        // Perform form validation
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, submit or handle form data
            setErrors({});

            let dataToPass = { ...formValues, files: files, ListThisProductForUnitOfTime: ListThisProductForUnitOfTime, id: productId }

            mutateAsync(dataToPass, {
                onSuccess: (response) => {
                    if (response?.data._id) {

                        let chunks = fullPath.split('/');
                        let path = chunks[chunks.length - 1];
                        // navigate(`/home/mobilityVoucher/voucherdesign/` + response?.data._id);
                        navigate(`/home/vouchers/voucherdesign/` + response?.data._id);
                    } else {
                        alert("Somethings has gone wrong");
                    }
                },
                onError: (error) => { },
            }
            );
        } else {
            // Form has validation errors, update error state
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};
        // Validate each field based on its type
        voucherData["StepGoLive"].forEach((field) => {
            if (field.required) {
                if (field.FieldType === "dropdown" && !formValues[field.FieldName]) {
                    errors[field.FieldName] = "This field is required";
                } else if (field.FieldType === "text" && !formValues[field.FieldName]) {
                    errors[field.FieldName] = "This field is required";
                } else if (field.FieldType === "textArea" && !formValues[field.FieldName]) {
                    errors[field.FieldName] = "This field is required";
                } else if (field.FieldType === "file" && files == null) {
                    errors[field.FieldName] = "Please select a file";
                }
            }
        });

        return errors;
    };

    const renderFormFields = (fields) => {
        return fields.map((ele, ind) => {
            switch (ele.FieldType) {
                case "text":
                    return (
                        <Box className={classes.fieldBox}>
                            <label className={classes.fieldLabel}>
                                {ele.FieldLabel}
                            </label>
                            <Box className={classes.goLiveFieldBox}>
                                <TextField
                                    variant="standard"
                                    name={ele.FieldName}
                                    placeholder={ele.FieldLabel}
                                    InputProps={{
                                        disableUnderline: "true",
                                        style: {
                                            fontSize: "14px",
                                            padding: "10px",
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: "red",
                                        },
                                    }}
                                    //   {...register("productname")}
                                    value={formValues[ele.FieldName] || ""}
                                    onChange={handleChange}
                                    className={classes.goLivetextField}
                                    error={!!errors[ele.FieldName]}
                                />
                                <Select
                                    className={classes.goLiveSelectBox}
                                    defaultValue={"Days"}
                                    name="ListThisProductForUnitOfTime"
                                    // {...register("ListPeriod")}
                                    onChange={(e) => { setListThisProductForUnitOfTime(e.target.value) }}
                                >
                                    
                                    <MenuItem className={classes.goLiveMenuItems} value="Days">
                                        Days
                                    </MenuItem>
                                </Select>

                            </Box>
                            {errors[ele.FieldName] && (
                                <span style={{ color: "red" }}>{errors[ele.FieldName]}</span>
                            )}
                        </Box>
                    );

                case "textArea":
                    return (
                        <Box className={classes.fieldBox} >
                            <label className={classes.fieldLabel}>{ele.FieldLabel}</label>
                            <TextField
                                multiline
                                minRows={4}
                                variant="standard"
                                name={ele.FieldName}
                                placeholder={ele.FieldLabel}
                                InputProps={{
                                    disableUnderline: "true",
                                    style: {
                                        fontSize: "14px",
                                        padding: "10px",
                                    },
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: "red",
                                    },
                                }}
                                // {...register("Inclusions")}
                                value={formValues[ele.FieldName] || ""}
                                className={classes.textAreaField}
                                onChange={handleChange}
                                error={!!errors[ele.FieldName]}
                            />
                            {errors[ele.FieldName] && (
                                <span style={{ color: "red" }}>{errors[ele.FieldName]}</span>
                            )}
                        </Box>
                    );
                case "file":
                    return (
                        <>
                            <Box>
                                <label className={classes.fieldLabel} style={{ mt: "2rem" }} >
                                    {ele.FieldLabel}
                                </label>
                            </Box>
                            <Box className={classes.fileBox} onDragOver={handleDragOver} onDrop={handleDrop}>
                                <Box className={classes.fileInnerBox} >
                                    <Box className={classes.fileBoxContainer} >
                                        <Box component="img" src={UploadtoCloud} sx={{ position: "absolute", left: "10%", }} />
                                        <label className={classes.dragLabel} onClick={() => inputRef.current.click()}>
                                            Drag & Drop upload or browse to choose a file
                                        </label>
                                        <label className={classes.supportText} >
                                            Supported format : JPEG, PNG, XLSX
                                        </label>
                                    </Box>
                                </Box>
                                <input
                                    type="file"
                                    name={ele.FieldName}
                                    multiple
                                    onChange={(event) => {
                                        console.log("event Here", event.target.files[0]);
                                        setFiles(event.target.files[0]);
                                    }}
                                    hidden
                                    accept=".png,.jpeg,.xlsx"
                                    ref={inputRef}
                                />
                            </Box>
                            {files && (
                                <Box sx={{ width: "90%", my: "2%", }} >
                                    <label className={classes.uploadedLabel} > Uploaded </label>
                                    <Box className={classes.uploadedFileBox} >
                                        <label className={classes.uploadedFileName} > {files?.name} </label>
                                        <Box component="img" src={DeleteIcon} sx={{ height: "20px", width: "20px", cursor: "pointer", }} onClick={() => { setFiles(null); }} />
                                    </Box>
                                </Box>
                            )}
                            {errors[ele.FieldName] && (
                                <span style={{ color: "red" }}>{errors[ele.FieldName]}</span>
                            )}
                        </>


                    )
                default:
                    return ('')
            }

        })

    }


    return (
        <form onSubmit={handleSubmit} >
            <Box className={classes.voucherContainer}>
                <Box className={classes.innerContainer}>
                    <Box className={classes.scrollBox}>
                        <label className={classes.pageTitle} >
                            Go Live
                        </label>
                        <Box
                            className={classes.infoIcon}
                            component="img"
                            src={InfoIcon}
                        />
                    </Box>
                    {
                        voucherData && voucherData["StepGoLive"] && voucherData["StepGoLive"].length > 0 ? renderFormFields(voucherData["StepGoLive"]) : null
                    }

                    <div className={classes.formNavigation}>
                        <div className={classes.formNavigationBar}>
                            <button className={classes.resetLabel} onClick={() => { setFormValues({}) }} >
                                <Box component="img" sx={{ width: "23px", height: "23px" }} src={RedoIcon} alt="" /> Reset to Default
                            </button>
                            <div className={classes.navigationButtonSection}>
                                <button className={classes.navigationCancelButton}
                                    variant="contained"
                                    onClick={() => {
                                        let confirm = window.confirm(
                                            "Are you sure you want to cancel the product?"
                                        );
                                        if (confirm) {
                                            navigate("/home/physical");
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={classes.navigationSubmitButton}
                                    variant="contained"
                                >
                                    {isLoading ? <CircularProgress size={20} /> : "Next"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
        </form>
    )
};

export default GoliveTemplate;