import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calender.module.css";

const CalendarComponent = ({ highlightDate }) => {
  const [date, setDate] = useState(highlightDate || new Date());
  
  // Update date state when highlightDate prop changes
  useEffect(() => {
    if (highlightDate) {
      setDate(highlightDate);
    }
  }, [highlightDate]);

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          
          const isToday = date.toDateString() === new Date().toDateString();
          const isDueDate = highlightDate && date.toDateString() === highlightDate.toDateString();
          
          if (isDueDate && isToday) {
            return `${styles.highlightDueDate} ${styles.isToday}`;
          } else if (isDueDate) {
            return styles.highlightDueDate;
          } else if (isToday) {
            return styles.isToday;
          }
          
          return "";
        }}
      />
    </div>
  );
};

export default CalendarComponent;