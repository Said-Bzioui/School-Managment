import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useFetch } from "@/api/fetching";
import CustomEvent from "./calendarTooltip";
import { useState } from "react";
import { Button } from "./ui/button";

const formats = {
    timeGutterFormat: (date) => moment(date).format('HH[h]mm'),
};
moment.updateLocale('en', { week: { dow: 1 } });

const localizer = momentLocalizer(moment);

const ExamsCalendar = () => {

    const user = JSON.parse(localStorage.getItem("userData"));
    const { data } = useFetch(`/classes/${user.class_id}/exams`);

    const rawData = data?.map((exam) => {
        const start = new Date(`${exam.date}T${exam.start_time}`);
        const end = new Date(`${exam.date}T${exam.end_time}`);

        return {
            title: `${exam.subject.code} (${exam.type}) - ${exam.classroom.name}`,
            start,
            end,
            teacher: exam.teacher.prenom,
        };
    }) || [];


    const [view, setView] = useState(Views.WEEK);

    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
    };


    // ------------------

    const handleDownloadExcel = () => {
        // حضر البيانات اللي بغيت تصدرها
        const excelData = rawData.map((item) => ({
            Subject: item.title,
            Start: moment(item.start).format("YYYY-MM-DD HH:mm"),
            End: moment(item.end).format("YYYY-MM-DD HH:mm"),
            Teacher: item.teacher || "", // إذا بغيت تظهر اسم الأستاذ
        }));

        // أنشئ ورقة عمل (worksheet)
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // أنشئ مصنف (workbook)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Exams");

        // حوّل المصنف إلى بايتس
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // أنشئ Blob من البيانات
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

        // حمّل الملف
        saveAs(dataBlob, "exams_schedule.xlsx");
    };
    return (
        <>
            <Button onClick={handleDownloadExcel} style={{ marginBottom: 10 }}>
                Download(Excel)
            </Button>

            <Calendar
                localizer={localizer}
                formats={formats}
                events={rawData}
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
        </>
    );
};

export default ExamsCalendar;
