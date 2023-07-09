import { makeStyles } from '@material-ui/core/styles';

const voucherStyle = makeStyles(theme => ({
    templateHeader: {
        display: 'flex !important',
        flexDirection: 'row !important',
        justifyContent: 'space-between !important'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'space-between !important'
    },
    formField: {
        '& label': {
            fontSize: '16px'
        },
        '& input': {
            fontSize: '16px'
        }
    },
    templateEditIconButton: {
        background: 'none',
        border: 'none',
        color: '#445FD2',
        cursor: 'pointer'
    },
    templateLabel: {
        color: '#6B7A99  !important',
        fontFamily: "Poppins  !important",
        fontWeight: '400  !important',
        margin: '10px 0  !important'
    },
    templateUploadImageLabel: {
        fontSize: '14px  !important',
        fontWeight: '400  !important',
        color: '#6B7A99 !important',
        fontFamily: "Poppins !important",
        margin: '40px 0 12px 0 !important'
    },
    template1Icon: {
        margin: '0 auto',
        display: 'flex',
        '& svg': {
            width: '10px !important',
            height: '10px !important'
        }
    },
    template2Icon: {
        '& svg': {
            width: '10px !important',
            height: '10px !important'
        }
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    left: {
        flex: '1 0 50%',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box'
    },
    right: {
        flex: '1 0 50%',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box'
    },
    cardZeroPadding: {
        paddingTop: '0 !important'
    },
    templateThreeBox: {
        width: '102px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#FFF',
        border: '1px solid #FFF',
        borderRadius: '0px 0px 5.74291px 5.74291px',
        alignItems: 'center'
    },
    offerSection: {
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0',
        alignItems: 'center'
    },
    templateOneImage:{
        width:'30%',
        display:'inline-block',
        paddingTop: '0 !important'
    },
    companyLogo:{
        "& .MuiAvatar-circular":{
            width:'20px !important',
            height:'20px !important',
            fontSize:'1rem !important'
        }
    }

}))

export { voucherStyle }