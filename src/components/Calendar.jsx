import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateClick = (date) => {
    const dateIndex = selectedDates.findIndex((d) => d.getTime() === date.getTime());

    if (dateIndex !== -1) {
      // Date already selected, remove it from the selected dates
      const updatedDates = [...selectedDates];
      updatedDates.splice(dateIndex, 1);
      setSelectedDates(updatedDates);
    } else {
      // Date not selected, add it to the selected dates
      setSelectedDates([...selectedDates, date]);
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const selectedMonth = selectedDates.length > 0 ? selectedDates[0].getMonth() : currentMonth;
    const selectedYear = selectedDates.length > 0 ? selectedDates[0].getFullYear() : today.getFullYear();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    const calendarDates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const isSelected = selectedDates.some((d) => d.getTime() === date.getTime());
      const isDisabled = date < today;

      calendarDates.push(
        <div
          key={i}
          className={`calendar-date ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return calendarDates;
  };

  return (
    <div className="calendar-container">
      <div className="calendar">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
