import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  getDay,
  getDaysInMonth,
  isEqual,
  isPast,
  isSaturday,
  isSunday,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useState } from "react";

export default function Calender({
  month,
  year,
  holidayList = [],
  multiselect = false,
  selected,
  setSelected,
  disablePastDate = false,
}) {
  const propDate = new Date(year, month);
  const StartOfMonthDate = startOfMonth(propDate);
  const FirstWeekdayInMonth = getDay(StartOfMonthDate, { weekStartsOn: 0 });
  const TotalDaysInMonth = getDaysInMonth(propDate);
  const PastMonthDays = getDaysInMonth(subMonths(propDate, 1));
  const WeekList = ["SUN", "MON", "TUE", "WED", "TUR", "FRI", "SAT"];
  const selectDate = (date) => {
    // alert(date.toString());
    const data = selected.filter((OldDate) => !isEqual(OldDate, date));
    if (data.length !== selected.length) {
      setSelected([...data]);
      return;
    }

    if (multiselect) {
      setSelected([...selected, date]);
    } else {
      setSelected([date]);
    }
  };
  return (
    <Masonry columns={7}>
      {WeekList.map((e, idx) => (
        <Box textAlign={"center"} key={idx + e}>
          {e}
        </Box>
      ))}
      {[...new Array(FirstWeekdayInMonth)].map((e, idx) => (
        <Button disabled textAlign={"center"} key={idx + "Blank"}>
          <Typography>
            {" "}
            {PastMonthDays - FirstWeekdayInMonth + idx + 1}
          </Typography>
        </Button>
      ))}
      {[...new Array(TotalDaysInMonth)].map((day, idx) => (
        <DateDisplay
          holidayList={holidayList}
          date={idx + 1}
          month={month}
          year={year}
          selectedList={selected}
          disablePastDate={disablePastDate}
          onClick={() => {
            selectDate(new Date(year, month, idx + 1));
          }}
        />
      ))}
    </Masonry>
  );
}

function DateDisplay({
  holidayList = [],
  selectedList = [],
  date,
  month,
  year,
  onClick,
  disablePastDate,
}) {
  const today = new Date(year, month, date);
  const isHoliday = holidayList.find((holiday) => isEqual(today, holiday));
  const isSelected = selectedList.find((selectedDay) =>
    isEqual(today, selectedDay)
  );
  const isPastDate = disablePastDate && isPast(today) && !isToday(today);

  const isWeekend = isSunday(today) || isSaturday(today);

  if (isPastDate) {
    return (
      <Button disabled>
        <Typography color={"gray"}>{date}</Typography>
      </Button>
    );
  }

  if (isHoliday) {
    return (
      <Button disabled>
        <Typography color={"green"}>{date}</Typography>
      </Button>
    );
  }

  if (isWeekend) {
    return (
      <Button disabled>
        <Typography color="gray">{date}</Typography>
      </Button>
    );
  }

  if (isSelected) {
    return (
      <Button textAlign={"center"} onClick={onClick}>
        <Typography color="red">{date}</Typography>
      </Button>
    );
  }
  return (
    <Button textAlign={"center"} onClick={onClick}>
      <Typography color="black">{date}</Typography>
    </Button>
  );
}
