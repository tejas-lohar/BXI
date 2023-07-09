import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Calender from "./Calender";

export default function App() {
  const [month, setMonth] = React.useState(8);
  const [year, setYear] = React.useState(2022);
  const [selected, setSelected] = React.useState([
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
  ]);

  return (
    <Box sx={{ width: 500, minHeight: 393 }}>
      <Box>
        <Button
          onClick={(e) => {
            if (month === 1) {
              setMonth(12);
              return;
            }
            setMonth(month - 1);
          }}
        >
          {" "}
          -
        </Button>
        {month}
        <Button
          onClick={(e) => {
            if (month === 12) {
              setMonth(1);
              return;
            }
            setMonth(month + 1);
          }}
        >
          +
        </Button>
      </Box>

      <Box>
        <Button
          onClick={(e) => {
            setYear(year - 1);
          }}
        >
          -
        </Button>
        {year}
        <Button
          onClick={(e) => {
            setYear(year + 1);
          }}
        >
          +
        </Button>
      </Box>
      <Calender
        month={month - 1}
        year={year}
        multiselect
        selected={selected}
        setSelected={setSelected}
        holidayList={[new Date(2022, 6 - 1, 6), new Date(2022, 8 - 1, 6)]}
        // disablePastDate={true}
      />
    </Box>
  );
}
