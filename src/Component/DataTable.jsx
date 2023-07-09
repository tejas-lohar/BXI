import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  console.log("Props", props?.rowdata);
  // const { row } = props?.rowdata;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props?.rowdata.element._id}
        </TableCell>
        <TableCell align="center">
          {props?.rowdata.element?.CompanyId}
        </TableCell>
        <TableCell align="center">
          {props?.rowdata.element?.DeliveryAddress}
        </TableCell>
        <TableCell align="center">
          {props?.rowdata.element?.OrderDate}
        </TableCell>
        <TableCell align="center">
          {props?.rowdata.element?.RequestdBy}
        </TableCell>

        {/* <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>DeliveryStatus</TableCell>
                    <TableCell>OrderStatus</TableCell>
                    <TableCell>ProductId</TableCell>
                    <TableCell>OrderId</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.rowdata.OrderFilteredData.map((historyRow) => (
                    <TableRow key={historyRow.DeliveryStatus}>
                      <TableCell component="th" scope="row">
                        {historyRow.DeliveryStatus}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.OrderStatus}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.ProductId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.OrderId}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(data) {
  console.log(data.data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="center">CompanyId</TableCell>
            <TableCell align="center">DeliveryAddress</TableCell>
            <TableCell align="center">OrderDate </TableCell>
            <TableCell align="center">RequestdBy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.map((row) => (
            <Row key={row} rowdata={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
