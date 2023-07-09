import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
const adminstyles = makeStyles((theme) => ({
    homebtn : {
        position: "absolute",
        background: "#445FD2",
        borderRadius:"10px",
        color : "#FFFFFF"
    },
    sidebarbox:{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        position: "inherit !important",
    },  
    sidebartext:{
        "& span" : {
        fontFamily: 'Poppins !important',
        fontStyle: "normal !important",
        fontWeight: "500 !important",
        fontSize: "13px !important",
        }
    }
})
)

export { adminstyles };