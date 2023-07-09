import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles((theme) => ({
    voucherContainer: {
        width: "100%",
        maxWidth: "716px",
        height: "auto",
    },
    innerContainer: {
        padding: "0 30px",
        height: "auto",
        maxHeight: "600px",
        background: "#FAFBFD",
        overflow: "scroll",
    },
    scrollBox: {
        backgroundColor: "#FAFBFD",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        padding: "10px 0",
    },
    pageTitle: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: '14px',
        color: "#6B7A99",
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
        fontFamily: 'Roboto'
    },
    infoIcon: {
        width: "28px",
        height: "auto",
        cursor: "pointer",
    },
    fieldBox: {
        display: "grid",
        gap: "10px",
        padding: "10px 0",
    },
    fieldLabel: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        color: "#6B7A99",
        marginTop: '0',
        "&.MuiMenuItem-root": {
            marginTop: "0 !important",
            "& p": {
                fontSize: '14px'
            }
        }
    },
    fieldLabel2: {
        color: "#6B7A99 !important",
        fontSize: "20px !important",
        fontFamily: "Poppins !important",
    },
    fieldLabel3: {
        fontFamily: "Poppins",
        color: " #6B7A99",
        marginTop: "25px",
        marginLeft: "0px",
        fontSize: "12px",
        height: "41px",
        background: "#FFFFFF",
        borderRadius: "9px",
    },

    textField: {
        fontFamily: "Poppins",
        color: "rgb(107, 122, 153)",
        fontSize: "12px",
        display: "grid",
        textAlign: "left",
        fontWeight: "bold",
        "& MuiInput-root": {
            background: "#FFF"
        },
        "&:focus": {
            border: "1px solid #E8E8E8",
        },
        "& input": {
            color: '#445FD2'
        }
    },
    textAreaField: {
        width: "100%",
        height: "80px !important",
        background: "#fff",
        borderRadius: "9px",
        border: "none",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        color: "rgb(107, 122, 153)",
        overflow: "auto",
        paddingLeft: "0px",
        "&:focus": {
            outline: "none",
        },
        "& textarea": {
            color: '#445FD2'
        }
    },
    radioField: {
        justifyContent: "start",
        gap: "40px",
        width: "100%",
        margin: "0 auto",
        "& .MuiFormControlLabel-label": {
            fontSize: "15px",
            color: "rgb(173, 184, 204)",
        },
        "& .MuiIconButton-root": {
            color: "rgba(0, 0, 0, 0.6)",
            borderRadius: "50%",
            padding: "0 2px",
        },
    },
    selectField: {
        background: "#fff",
        border: "none",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 14,
        color: "#6B7A99",
        borderRadius: "9px",
        height: "48px",
        width: "100%",
        boxShadow: "none",
        padding: '0 10px',
        ".MuiSelect-select:focus": {
            backgroundColor: '#FFF !important'
        },
        " &.MuiInput-underline::before": {
            border: "none !important"
        },
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        ".MuiSvgIcon-root ": {
            fontSize: "2rem",
        },
        "& p": {
            fontSize: '14px',
            color: '#445FD2'
        }
    },
    formNavigation: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    formNavigationBar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#FAFBFD",
        padding: "10px",
        alignItems: 'center'
    },
    resetLabel: {
        marginRight: "auto",
        padding: "2%",
        fontFamily: "Poppins",
        fontStyle: "normal",
        color: "#6B7A99",
        fontSize: 14,
        display: "flex",
        gap: "10px",
        background: 'transparent',
        border: 'none'
    },
    navigationButtonSection: {
        display: "flex",
        gap: "10px",
        padding: 1,
        width: "50%",
    },
    navigationCancelButton: {
        width: "100%",
        height: "32px",
        borderRadius: "10px",
        background: "#fff",
        color: "#636161",
        fontSize: "14px",
        border: 'none',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        letterSpacing: '0.02857em',
        fontWeight: '600',
        "&:hover": {
            background: "#FAFBFD",
            color: "#000",
        },
    },
    navigationSubmitButton: {
        width: "100%",
        height: "32px",
        borderRadius: "10px",
        background: "#445FD2",
        color: "#fff",
        fontSize: "14px",
        border: 'none',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        letterSpacing: '0.02857em',
        fontWeight: '600',
        "&:hover": {
            background: "#445FD2",
        },
        "&:disabled":{
            backgroundColor:'rgba(239, 239, 239, 0.3)',
            color:'rgba(16, 16, 16, 0.3)',
            borderColor: 'rgba(118, 118, 118, 0.3)'
        }
    },
    selectedRadioGroup: {
        " & span": {
            color: "rgb(68, 95, 210) !important",
        },
    },
    ".MuiSelect-select:focus": {
        background: "none !important"
    },
    fileBox: {
        border: "2px dashed #445FD2",
        width: "auto",
        maxWidth: "670px",
        padding: '24px',
        marginTop: "3%",
        position: "relative",
        marginBottom: "10px",
        cursor: "pointer"
    },
    fileInnerBox: {
        display: "grid",
        width: "60%",
        margin: "0 auto",
    },
    fileBoxContainer: {
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        tetxAlign: "center",
    },
    dragLabel: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10px",
        color: "#6B7A99",
        cursor: "pointer",
        "&:hover": {
            color: "blue",
        },
    },
    supportText: {
        fontFamily: "Mulish",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "8px",
        color: "#676767",
        textAlign: "center",
    },
    uploadedLabel: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10px",
        color: "#6B7A99",
    },
    uploadedFileBox: {
        background: "#fff",
        border: "1px solid green",
        borderRadius: "9px",
        height: "42px",
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0 ",
        padding: "0 8px",
    },
    uploadedFileName: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10px",
        color: "#6B7A99",
    },
    goLiveBoxContainer: {
        maxWidth: "716px",
        height: "100%",
        // minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
        padding: " 20px",
        // backgroundColor: "red",
        backgroundColor: "#f3f6f9",
    },
    goLiveBoxInner: {
        width: "100%",
        maring: "0 auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        padding: "10px 0",
    },
    goLiveSelectBox: {
        width: "20%",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        background: "#FFFFFF",
        height: "100%",
        color: "#6B7A99",
        fontSize: "12px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        borderRadius: "0px 10px 10px 0px",
    },
    goLiveMenuItems: {
        fontSize: "12px",
        color: "#6B7A99",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
    },
    goLivetextField: {
        width: "80%",
        height: "100%",
        background: "#FFFFFF",
        borderRadius: "10px 0px 0px 10px",
    },
    goLiveFieldBox: {
        display: 'flex'
    },
    ".MuiInput-underline:before": {
        borderBottom: 'none !important'
    },
    textileBox: {
        flexDirection: "column",
        width: "100%",
        margin: " 0 auto",
        display: "flex",
        justifyContent: "flex-start",
        gap: "10px",
    },
    textileGenderBox: {
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        gap: "10px",
        height: "100%",
        alignItems: 'self-start'
    },
    textileSelect: {
        background: "#fff",
        border: "none",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 14,
        color: "#6B7A99",
        borderRadius: "9px",
        height: "48px",
        width: "100%",
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
        {
            border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
            border: 0,
        },
        "&.MuiSelect-select:focus": {
            background: "none",
        },
        "&.MuiSelect-select": {
            background: "none",
        },
        ".MuiSvgIcon-root ": {
            fill: "#ADB8CC !important",
            fontSize: "2rem",
        },
    },
    validationError: {
        margin: "0",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
        color: "red"
    },
    prevTable: {
        "& .MuiTableHead-root": {
            "& .MuiTableCell-root": {
                fontFamily: "Poppins",
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#6B7A99"
            }
        },
        "& .MuiTableBody-root": {
            "& .MuiTableCell-root": {
                fontFamily: "Poppins",
                fontSize: "10px",
                fontWeight: "600",
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#B1B1B1"
            }
        }
    },
    priceCard: {
        "& .MuiChip-label": {
            display: 'flex !important',
            alignItems: 'center !important'
        }
    },
    htmlSelectStyle: {
        display: "flex",
        width: "100%",
        padding: "10px",
        background: "#fff",
        border: "none",
        color: "#445FD2",
        borderRadius: "10px",
        fontFamily: 'Poppins',
        fontWeight: "500",
        fontSize:'14px'
    },
    customTable: {
        width: "100%",
        textAlign: 'center',
        "& thead": {
            fontSize: "14px",
            color: "#6B7A99",
            fontFamily: 'POPPINS',
            fontWeight: 600,
            lineHeight: "21px"
        },
        "& tbody": {
            textAlign: 'center',
            fontSize: "12px",
            color: "#B1B1B1",
            fontFamily: 'POPPINS',
            fontWeight: 600,
            lineHeight: "21px",
            // "& tr:first-child": {
            //     textAlign: 'left',
            // }
        }
    },
    sectionTitle: {
        fontFamily: "'POPPINS' !important",
        fontWeight: "600 !important",
        fontSize: "20px !important",
        lineHeight: "30px !important",
        color: '#6B7A99 !important',
        marginBottom: "10px !important"
    },
    subTitle: {
        fontFamily: "'POPPINS' !important",
        fontWeight: "600 !important",
        fontSize: "16px !important",
        lineHeight: "30px !important",
        color: '#6B7A99 !important'
    },
    titleDesc: {
        fontFamily: "'POPPINS' !important",
        fontWeight: "400 !important",
        fontSize: "16px !important",
        lineHeight: "30px !important",
        color: '#6B7A99 !important'
    },
}));

export { styles };
