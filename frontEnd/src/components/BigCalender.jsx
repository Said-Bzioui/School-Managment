import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { useFetch } from "../api/fetching.js";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const { data } = useFetch("/emploi") || [];
  const events =data && data.map((event) => ({
    ...event,
    start: new Date(event.start), 
    end: event.end ? new Date(event.end) : new Date(event.start),
  }));

  const [view, setView] = useState(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={data ? events : []}
      startAccessor="start"
      endAccessor="end"
      views={[Views.WORK_WEEK, Views.DAY]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 30, 0)}
      max={new Date(2025, 1, 0, 18, 30, 0)}
    />
  );
};

export default BigCalendar;
