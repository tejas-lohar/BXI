import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Stack, Typography } from "@mui/material";
// import FooterPage from "../Pages/Footer/FooterPage,jsx";
const Footer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dataGet, setDataGet] = useState([]);
  const [text, setText] = useState("");


  const data = [
    { id: 1, Adress: "rahul", Balance: "2500$" },
    { id: 2, Adress: "alex", Balance: "3620$" },
    { id: 3, Adress: "sam", Balance: "3650$" },
  ];

  const filteredData = data.filter((item) =>
    item.Adress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      elevation={0}
      sx={{
        background: "transparent",
        maxWidth: "2000px",

        width: "100%",
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "1rem",
        }}
      ></div>
      <Grid
        container
        sx={{
          width: "90%",
          maxWidth: "2500px",
          marginLeft: "auto",
          marginRight: "auto",
          height: "100%",
          maxHeight: "400px",
          marginTop: "3rem",
        }}
      >
        <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
          <Typography sx={mainfootertext}>Menus</Typography>
          <Stack>


            <a to="/" style={{ textDecoration: "none" }}>
              <Typography sx={subFooterText}>Home</Typography>
            </a>
            <a to="/careers" style={{ textDecoration: "none" }}>
              <Typography sx={subFooterText}>Careers</Typography>
            </a>
            <a to="/contact" style={{ textDecoration: "none" }}>
              <Typography sx={subFooterText}>Contact</Typography>
            </a>

          </Stack>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={6} sx={{}}>
          <Typography sx={mainfootertext}>Contact</Typography>
          <Stack>
            <Typography sx={subFooterText}>
              <span style={{ color: "rgba(0, 0, 0, 1)" }}> T </span> : +91
              9834262853
            </Typography>
            <Typography sx={subFooterText}>
              <span style={{ color: "rgba(0, 0, 0, 1)" }}> F </span> : +91
              9834262853
            </Typography>
            <Typography sx={subFooterText}>
              <span style={{ color: "rgba(0, 0, 0, 1)" }}> E </span> : +91
              9834262853
            </Typography>
          </Stack>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={6} sx={{}}>
          <Typography sx={mainfootertext}>Address</Typography>
          <Stack sx={mStack}>
            <Typography sx={boxTextNew2}>
              550 Iscon Emporio, Besides Star ,
            </Typography>
            <Typography sx={boxTextNew2}>Ahmedabad</Typography>
          </Stack>
        </Grid>
        {/* <Box mt={3}> */}

        {/* </Box> */}
      </Grid>
      <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "1rem",
        }}
      ></div>

      {/* <TextField
        type="text"
        label="search Adress "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Adress</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td onClick={() => setShow(initialData)}>{item.id}</td>
              <td>{item.Adress}</td>
              <td>{item.Balance}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* <Box>
        <TextField
          type="text"
          label="search Adress "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell align="left">Wallet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDatas?.map((row) => (
              <TableRow
                onClick={() => {
                  navigate(`/transition/${row.walletAddress}`);
                }}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{row.walletAddress}</TableCell>
                <TableCell align="right">{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box> */}
      
    </Paper>
  );
};

export default Footer;

const mainfootertext = {
  display: "flex",
  justifyContent: {
    xl: "flex-start",
    lg: "flex-start",
    md: "flex-start",
    sm: "center",
    xs: "center",
  },
  fontFamily: "PT Sans",
  fontWeight: 700,
  fontSize: {
    xl: "1.3rem",
    lg: "1.3rem",
    md: "1.3rem",
    sm: "1rem",
    xs: "1rem",
  },
  color: "#000",
  textTransform: "uppercase",
  mb: "1rem",
  mt: { sm: "1rem", xs: "2rem" },
};

const subFooterText = {
  display: "flex",
  justifyContent: {
    xl: "flex-start",
    lg: "flex-start",
    md: "flex-start",
    sm: "center",
    xs: "center",
  },
  fontFamily: "PT Sans",
  fontWeight: 400,
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.1rem",
    sm: "0.8rem",
    xs: "0.8rem",
  },
  lineHeight: "3.1rem",
  //   color: "rgba(0, 0, 0, 0.69)",
};
const boxTextNew2 = {
  //   marginTop: "0.5rem",
  display: "flex",
  justifyContent: {
    xl: "flex-start",
    lg: "flex-start",
    md: "flex-start",
    sm: "center",
    xs: "center",
  },
  color: " rgba(0, 0, 0, 0.69)",
  fontFamily: "PT Sans",
  fontWeight: 400,
  fontSize: {
    xl: "1.3rem",
    lg: "1.3rem",
    md: "1.3rem",
    sm: "1rem",
    xs: "1rem",
  },
  lineHeight: "2.2rem",
};


const footerbottomText = {
  color: "rgba(112, 112, 112, 0.5)",
  fontWeight: 400,
  fontFamily: "PT Sans",
  fontSize: "1rem",
  letterSpacing: "0.4rem",
  textTransform: "uppercase",
  marginBottom: "5px",
};
const footerbottomText1 = {
  color: "rgba(112, 112, 112, 0.5)",
  fontWeight: 400,
  fontFamily: "PT Sans",
  fontSize: "1rem",
  letterSpacing: "0.4rem",
};

const mStack = {
  mt: { xl: 3, lg: 3, md: 3, sm: 2, xs: 1 },
};
