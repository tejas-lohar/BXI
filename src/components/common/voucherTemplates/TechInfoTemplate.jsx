import React, { useState, useRef, useEffect } from "react";
import {
    TextField,
    Select,
    MenuItem,
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
import DeleteIcon from "../../../assets/Images/CommonImages/DeleteIcon.svg";
import RedoIcon from "../../../assets/Images/CommonImages/RedoIcon.svg";
import { styles } from './styles/commonStyles'
import { usePostProductQuery } from "../../../Hooks/Products/AddProduct"
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import { useUpdateProductQuery } from "../../../pages/AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";
import useGetProductVoucherFields from "../../../Hooks/ProductActions/useGetProductVoucherFields"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UploadtoCloud from "../../../assets/UploadtoCloud.svg";
import ToolTip from "../../ToolTip";
import { Stack } from "@mui/system";

const formData = [
    {
        type: "dropdown",
        label: "Select Option",
        name: "option",
        options: ["Option 1", "Option 2", "Option 3"],
        required: true,
    },
    {
        type: "text",
        label: "Name",
        name: "name",
        required: true,
    },
    {
        type: "textarea",
        label: "Description",
        name: "description",
        required: true,
    },
    {
        type: "radio",
        label: "Gender",
        name: "gender",
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
        ],
        required: true,
    },
    {
        type: "file",
        label: "Upload File",
        name: "file",
        required: true,
    },
];

const dbData = {
    "StepTechInfo": [
        {
            "FieldName": "Inclusions",
            "FieldLabel": "Inclusions",
            "FieldType": "textArea",
            "MinValue": "0",
            "Input": true,
            "required": true
        },
        {
            "FieldName": "Exclusions",
            "FieldLabel": "Exclusions",
            "FieldType": "textArea",
            "MinValue": "0",
            "Input": true,
            "required": true
        },
        {
            "FieldName": "TermConditions",
            "FieldLabel": "Terms & Conditions",
            "FieldType": "textArea",
            "MinValue": "0",
            "Input": true,
            "required": true
        },
        {
            "FieldName": "RedemptionSteps",
            "FieldLabel": "Redemption Steps",
            "FieldType": "textArea",
            "MinValue": "0",
            "Input": true,
            "required": true
        },
        {
            "FieldName": "redemptionType",
            "FieldLabel": "How can it be redeemed by buyer ?",
            "FieldType": "radioGroup",
            "MinValue": "0",
            "Input": true,
            "required": true,
            "options": [{ "label": "Online", "value": "online" }, { "label": "Offline", "value": "offline" }, { "label": "Both", "value": "both" }],
            "hasDependentFields": true,
            "fields": [
                {
                    "online": [
                        {
                            "FieldName": "Link",
                            "FieldLabel": "Add URL",
                            "FieldType": "text",
                            "required": true
                        }
                    ],
                    "offline": [
                        {
                            "FieldName": "Address",
                            "FieldLabel": "Address ( If Single ) Type Below",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "Area",
                            "FieldLabel": "Area",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "Landmark",
                            "FieldLabel": "Landmark",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "City",
                            "FieldLabel": "City",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "State",
                            "FieldLabel": "State",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "HotelLocations",
                            "FieldLabel": "Upload Store List ( If Multiple Locations) ",
                            "FieldType": "file",
                            "required": true
                        }
                    ],
                    "both": [
                        {
                            "FieldName": "Address",
                            "FieldLabel": "Address ( If Single ) Type Below",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "Area",
                            "FieldLabel": "Area",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "Landmark",
                            "FieldLabel": "Landmark",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "City",
                            "FieldLabel": "City",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "State",
                            "FieldLabel": "State",
                            "FieldType": "text",
                            "required": true
                        },
                        {
                            "FieldName": "HotelLocations",
                            "FieldLabel": "Upload Store List ( If Multiple Locations) ",
                            "FieldType": "file",
                            "required": true
                        },
                        {
                            "FieldName": "Link",
                            "FieldLabel": "Add URL",
                            "FieldType": "text",
                            "required": true
                        }
                    ]
                }
            ]
        }
    ]
}




const TechInfoTemplate = () => {
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


    useEffect(() => {
        if (ProductData && voucherData) {
            updateFieldWithDBValues()
        }
    }, [ProductData, voucherData])

    const updateFieldWithDBValues = () => {
        if (voucherData && voucherData.StepTechInfo) {
            voucherData && voucherData.StepTechInfo.forEach(element => {
                if (ProductData.hasOwnProperty(element.FieldName)) {
                    if (element.FieldName === "file") {
                        // setFormValues((prevFormValues) => ({
                        //     ...prevFormValues,
                        //     [element.FieldLabel]: files[0],
                        // }));
                    } else {
                        setFormValues((prevFormValues) =>
                            Object.assign({}, prevFormValues, { [element.FieldName]: ProductData[element.FieldName] })
                        );
                    }
                }
                if (element.hasDependentFields) {
                    element.fields.forEach(x => {
                        console.log('element', x[ProductData[element.FieldName]])
                        if (x[ProductData[element.FieldName]]) {
                            if (x[ProductData[element.FieldName]] && x[ProductData[element.FieldName]].length > 0) {
                                x[ProductData[element.FieldName]].forEach(y => {
                                    if (ProductData.hasOwnProperty(y.FieldName) || y.FieldName == "HotelLocations") {
                                        if (element.FieldType === "radioGroup" && element.FieldName == "HotelLocations") {
                                            if (ProductData?.HotelsListUrls && !files) {
                                                console.log('testtest---', ProductData.HotelsListUrls)
                                                setFiles({ name: ProductData.HotelsListUrls[0]['nameKey'] })
                                            }
                                        } else {
                                            setFormValues((prevFormValues) =>
                                                Object.assign({}, prevFormValues, { [y.FieldName]: ProductData[y.FieldName] })
                                            );
                                        }
                                    }
                                });
                            }
                        }

                    });
                }
            });
        }
    }

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
            if (formValues['redemptionType'] != 'online') {
                if (!files && !formValues['Address']) {
                    setErrors({ Address: 'Complete store address or Store list is required.' });
                    return
                }
                if (formValues['Address'] && (!formValues['Area'] || !formValues['Landmark'] || !formValues['City'] || !formValues['State'])) {
                    setErrors({ Address: 'Complete store address is required.' });
                    return
                }
                if (formValues['redemptionType'] == 'both' && !formValues['Link']) {
                    setErrors({ Link: 'This field is required.' });
                    return
                }

                if (formValues['redemptionType'] == 'both' && formValues['Link'] && !formValues['Link'].match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    setErrors({ Link: 'This field is required.' });
                    return
                }
            } else {
                if (!formValues['Link']) {
                    setErrors({ Link: 'This field is required.' });
                    return
                }
                if (formValues['Link'] && !formValues['Link'].match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    setErrors({ Link: 'Please enter valid URL.' });
                    return
                }
            }

            setErrors({});
            // new code starts


            var formData = new FormData();
            formData.append("HotelLocations", files);

            Object.entries(formValues).map(([key, value]) => {
                return formData.append(key, value);
            });
            formData.append("id", productId);

            mutateAsync(formData, {
                onSuccess: (response) => {
                    if (response?.data._id) {

                        let chunks = fullPath.split('/');
                        let path = chunks[chunks.length - 1];
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
        voucherData["StepTechInfo"].forEach((field) => {
            if (field.required) {
                if (field.FieldType === "dropdown" && !formValues[field.FieldName]) {
                    errors[field.FieldName] = "This field is required";
                } else if (field.FieldType === "text" || field.FieldType === "textArea") {
                    if (!formValues[field.FieldName]) {
                        errors[field.FieldName] = "This field is required";
                    } else if (field?.MinLength && formValues[field.FieldName].length < field.MinLength) {
                        errors[field.FieldName] = `This field must contain at least ${field.MinLength} character(s)`;
                    } else if (field?.MaxLength && formValues[field.FieldName].length > field.MaxLength) {
                        errors[field.FieldName] = `This field must contain less than ${field.MaxLength} character(s)`;
                    }
                } else if (field.FieldType === "file" && !formValues[field.FieldName]) {
                    errors[field.FieldName] = "Please select a file";
                } else if (field.FieldType === "file" && !formValues[field.FieldName]) {
                    errors[field.FieldName] = "Please select a file";
                } else if (!formValues[field.FieldName]) {
                    errors[field.FieldName] = "Please select an option";
                }
            }

            // if (field?.hasDependentFields && formValues[field.FieldName]) {
            //     let t = field.fields[0][formValues[field.FieldName]]
            //     if (t && t.length > 0) {
            //         t.forEach(element => {
            //             if (element.FieldType === "text" && !formValues[element.FieldName]) {
            //                 errors[element.FieldName] = "This field is required";
            //             } 
            //             // else if (element.FieldType === "file" && (!files)) {
            //             //     errors[element.FieldName] = "Please select a file";
            //             // }
            //         });
            //     }

            // }
        });

        return errors;
    };
    const renderlabel = (FieldLabel) =>{
        return (<>{FieldLabel} <span style={{ color: "red" }}> *</span></>);
    }
    const renderFormFields = (fields) => {
        return fields.map((ele, ind) => {
            switch (ele.FieldType) {
                case "text":
                    return (
                        <Box className={classes.fieldBox}>
                            <label className={classes.fieldLabel}>
                                {ele.FieldLabel}<span style={{ color: "red" }}> *</span>
                            </label>
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
                                className={classes.textField}
                                error={!!errors[ele.FieldName]}
                            />
                            {errors[ele.FieldName] && (
                                <span className={classes.validationError}>{errors[ele.FieldName]}</span>
                            )}
                        </Box>
                    );

                case "textArea":
                    return (
                        <Box className={classes.fieldBox} >
                            <label className={classes.fieldLabel}>{ele.FieldLabel}<span style={{ color: "red" }}> *</span></label>
                            <TextField
                                multiline
                                
                                variant="standard"
                                name={ele.FieldName}
                                placeholder={ele.FieldLabel}
                                
                                InputLabelProps={{
                                    style: {
                                        color: "red",
                                    },
                                }}
                                // {...register("Inclusions")}
                                value={formValues[ele.FieldName] || ""}
                                sx={{ ...TextFieldStyle, height: "100%" }}
                                minRows={3}
                                InputProps={InputPropsStyle}
                                onChange={handleChange}
                                error={!!errors[ele.FieldName]}
                            />
                            {errors[ele.FieldName] && (
                                <span className={classes.validationError}>{errors[ele.FieldName]}</span>
                            )}
                        </Box>
                    );
                case "radioGroup":
                    return (
                        <Box className={classes.fieldBox} >
                            <label className={classes.fieldLabel}>{ele.FieldLabel}<span style={{ color: "red" }}> *</span></label>
                            <RadioGroup row name={ele.FieldName} className={classes.radioField} value={ele?.options[0]?.value}>
                                {
                                    ele?.options ?
                                        <>
                                            {
                                                ele.options.map(element => {
                                                    return (<FormControlLabel
                                                        value={element.value}
                                                        key={element.value}
                                                        control={<Radio />}
                                                        label={element.label}
                                                        name={element.FieldName}
                                                        checked={formValues[ele.FieldName] === element.value}
                                                        onChange={handleChange}
                                                        className={formValues[ele.FieldName] === element.value && classes.selectedRadioGroup}
                                                        style={{
                                                            color: formValues[ele.FieldName] === element.value ? "rgb(68, 95, 210)" : "#ADB8CC",
                                                        }}
                                                    />)
                                                })
                                            }
                                        </> : null
                                }

                            </RadioGroup>
                            {errors[ele.FieldName] && (
                                <span className={classes.validationError}>{errors[ele.FieldName]}</span>
                            )}
                            {
                                ele?.hasDependentFields && formValues[ele.FieldName] ?
                                    <Box style={{ display: "flex", justifyContent: "flex-start", flexDirection: 'column' }}>
                                        {
                                            ele?.fields[0][formValues[ele.FieldName]].map((x, i) => {
                                                return (
                                                    <>
                                                        {
                                                            x.FieldType == 'text' && <>
                                                                <TextField
                                                                    variant="standard"
                                                                    type="text"
                                                                    label={renderlabel(x.FieldName)}
                                                                    name={x.FieldName}
                                                                    value={formValues[x.FieldName] || ""}
                                                                    onChange={handleChange}
                                                                    className={classes.textField}
                                                                    style={{margin:'10px 0'}}
                                                                    InputLabelProps={{
                                                                        className: classes.fieldLabel2,
                                                                    }}
                                                                    InputProps={{
                                                                        disableUnderline: true,
                                                                        endAdornment: (
                                                                            <label
                                                                                variant="body1"
                                                                                style={{ fontFamily: "Poppins" }}
                                                                            ></label>
                                                                        ),
                                                                        startAdornment: (
                                                                            <label sx={{ marginLeft: "inherit" }}></label>
                                                                        ),
                                                                        style: {
                                                                            fontFamily: "Poppins",
                                                                            color: " #6B7A99",
                                                                            marginTop: "25px",
                                                                            marginLeft: "0px",
                                                                            fontSize: "14px",
                                                                            height: "41px",
                                                                            background: "#FFFFFF",
                                                                            borderRadius: "9px",
                                                                            padding:'10px'
                                                                        },
                                                                    }}
                                                                //   error={!!errors[field.name]}
                                                                //   helperText={errors[field.name]}
                                                                />
                                                                {/* {errors[x.FieldName] && (
                                                                    <span className={classes.validationError}>{errors[x.FieldName]}</span>
                                                                )} */}
                                                            </>
                                                        }

                                                        {
                                                            x.FieldType == 'file' && <>
                                                                <Box>
                                                                    <label className={classes.fieldLabel} style={{ mt: "2rem" }} >
                                                                        {x.FieldLabel}<span style={{ color: "red" }}> *</span>
                                                                    </label>
                                                                </Box>
                                                                <Box className={classes.fileBox} onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => inputRef.current.click()}>
                                                                    <Box className={classes.fileInnerBox} >
                                                                        <Box className={classes.fileBoxContainer} >
                                                                            <Box component="img" src={UploadtoCloud} sx={{ position: "absolute", left: "10%", }} />
                                                                            <label className={classes.dragLabel} onClick={() => inputRef.current.click()}>
                                                                                Drag & Drop upload or browse to choose a file
                                                                            </label>
                                                                            <label className={classes.supportText} >
                                                                                Supported format : JPEG, PNG, XLSX, PDF
                                                                            </label>
                                                                        </Box>
                                                                    </Box>
                                                                    <input
                                                                        type="file"
                                                                        name={x.FieldName}
                                                                        multiple
                                                                        onChange={(event) => {
                                                                            console.log("event Here", event.target.files[0]);
                                                                            setFiles(event.target.files[0]);
                                                                        }}
                                                                        hidden
                                                                        accept=".png,.jpeg,.xlsx,.pdf"
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
                                                            </>
                                                        }

                                                        {errors[x.FieldName] && (
                                                            <span className={classes.validationError}>{errors[x.FieldName]}</span>
                                                        )}

                                                    </>
                                                )
                                            })
                                        }

                                    </Box>
                                    : null
                            }

                        </Box>
                    )
                default:
                    return ('')
            }

        })

    }

    return (
        <form onSubmit={handleSubmit} >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "716px",
                    height: "auto",
                }}
            >
                <Box
                    sx={{
                        px: "30px",
                        height: "auto",
                        maxHeight: "490px",
                        background: "#FAFBFD",
                        overflow: "scroll",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#FAFBFD",
                            width: "100%",
                            mx: "auto",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "0",
                            py: "10px",
                        }}
                    >
                        <label className={classes.pageTitle} >
                            Technical Information
                        </label>
                        <ToolTip
                            info={
                                "Technical Information refers to specific details and specifications about a product's technical aspects, packaging Material, packing size, Dimensions, logistic or go live information for your offered product, This is Critical Information from Logistic & Buying Perspective for Making Informed Decisions"
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            
                            height: "100%",
                            maxHeight: "400px",
                            overflowY: "scroll",
                        }}
                    >
                        <Stack
                            sx={{
                                overflow: "auto",
                                "::-webkit-scrollbar": {
                                    display: "flex",
                                },
                                "::-webkit-scrollbar-thumb": {
                                    dynamic: "#8d8e90",
                                    minHeight: "10px",
                                    borderRadius: "8px",
                                },
                                "::-webkit-scrollbar-thumb:vertical": {
                                    maxHeight: "30px",
                                },
                                maxHeight: "410px",
                                height: "600px",
                                p: 1,
                            }}
                        >
                            {
                                voucherData && voucherData["StepTechInfo"] && voucherData["StepTechInfo"].length > 0 ? renderFormFields(voucherData["StepTechInfo"]) : null
                            }
                        </Stack>
                    </Box>
                </Box>
                <div className={classes.formNavigation}>
                    <div className={classes.formNavigationBar} style={{padding:"0 30px"}}>
                        <button className={classes.resetLabel} onClick={() => { setFormValues({}) }} >
                            &nbsp;{/* <Box component="img" sx={{ width: "23px", height: "23px" }} src={RedoIcon} alt="" /> Reset to Default */}
                        </button>
                        <div className={classes.navigationButtonSection}  style={{padding:"10px"}}>
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
        </form>
    );
};

export default TechInfoTemplate;



const InputPropsStyle = {
    disableUnderline: true,
    style: {
        background: "#fff",
        fontFamily: "Poppins",
        color: "#445fd2",
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
    color: "#445fd2",
    overflow: "auto",
    paddingLeft: "0px",
    "&:focus": {
        outline: "none",
    },
};
