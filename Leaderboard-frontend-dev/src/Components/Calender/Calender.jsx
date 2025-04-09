import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calender.module.css"; // Import CSS

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) =>
          view === "month" && date.toDateString() === new Date().toDateString()
            ? styles.highlight
            : ""
        }
      />
    </div>
  );
};

export default CalendarComponent;
