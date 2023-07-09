import React, { useState } from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/system";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateCalendar from "@mui/lab/DatePicker";
import PickersDay from "@mui/lab/PickersDay";

dayjs.extend(isBetweenPlugin);

function ReturnDaysFromTimeline(timeline) {
  if (timeline === "Day") {
    return 0;
  } else if (timeline === "Week") {
    return 6;
  } else if (timeline === "Month") {
    return 29;
  } else if (timeline === "Year") {
    return 364;
  }
}

function fetchDatesBetween(startDate, endDate) {
  var dates = [];
  var currentDate = new Date(startDate);
  endDate = new Date(endDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const CustomPickersDay = styled(PickersDay)(
  ({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(isLastDay && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  })
);

function Day(props) {
  const { day, selectedDay, TimelineData, ...other } = props;
  const [boughtDatesArray, setBoughtDatesArray] = useState([]);

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const start = selectedDay;
  const end = start.add(ReturnDaysFromTimeline(TimelineData), "day");
  const BoughtDatesArray = fetchDatesBetween(start, end);
  console.log("BoughtDatesArray", BoughtDatesArray);

  // Update boughtDatesArray state when BoughtDatesArray is calculated
  if (boughtDatesArray.length === 0 && BoughtDatesArray.length > 0) {
    setBoughtDatesArray(BoughtDatesArray);
  }

  const dayIsBetween = day.isBetween(start, end, null, "[]");
  const isFirstDay = day.isSame(start, "day");
  const isLastDay = day.isSame(end, "day");

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
  );
}

export default function CustomDay() {
  const [value, setValue] = useState(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue)}
        components={{ day: Day }}
        componentsProps={{
          day: {
            selectedDay: value,
          },
        }}
      />
    </LocalizationProvider>
  );
}
