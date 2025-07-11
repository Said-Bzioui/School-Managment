import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useFetch } from "@/api/fetching";
import CustomEvent from "./calendarTooltip";

const formats = {
  timeGutterFormat: (date) => moment(date).format('HH[h]mm'),
};
moment.updateLocale('en', { week: { dow: 1 } });

const localizer = momentLocalizer(moment);

const BigCalendar = () => {

  const user = JSON.parse(localStorage.getItem("userData"))
  const { data } = useFetch(`/classes/${user.class_id}/lessons`);

  const rawData = data?.classData?.lessons?.map((ls) => ({
    day: ls.day,
    start_time: ls.start_time,
    end_time: ls.end_time,
    title: ls.teacher.prenom,
    room: ls.classroom.name,
  })) || [];


  useEffect(() => {
    if (data?.classData?.lessons) {
      console.log("📚 Lessons:", data.classData.lessons);
      console.log(" rawData:", rawData);
    }
  }, [data]);



  function getRecurringEvents(item, startDate, endDate) {
    const events = [];
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const targetDay = dayMap[item.day];
    let current = new Date(startDate);

    while (current <= endDate) {
      if (current.getDay() === targetDay) {
        const [startHour, startMinute] = item.start_time.split(":").map(Number);
        const [endHour, endMinute] = item.end_time.split(":").map(Number);
        const start = new Date(current);
        const end = new Date(current);
        start.setHours(startHour, startMinute, 0);
        end.setHours(endHour, endMinute, 0);

        events.push({
          title: `${item.title}(${item.room})`,
          start,
          end,
        });
      }
      current.setDate(current.getDate() + 1);
    }

    return events;
  }

  const startDate = new Date(2025, 3, 20);
  const endDate = new Date(2025, 7, 30);

  let events = [];
  rawData?.forEach((item) => {
    events = [...events, ...getRecurringEvents(item, startDate, endDate)];
  });



  const [view, setView] = useState(Views.WEEK);

  const handleOnChangeView = (selectedView) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      formats={formats}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="work_week"
      views={[Views.WEEK, Views.DAY]}
      weekStartsOn={1}
      view={view}
      style={{ height: "50%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 0, 1, 8, 30)}
      max={new Date(2025, 0, 1, 18, 30)}
      step={150}
      timeslots={1}
      components={{
        event: CustomEvent
      }}
    />

  );
};

export default BigCalendar;
