import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useFetch } from "@/api/fetching";
import { Skeleton } from "./ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function AttendancesChart() {
  const { data, isLoading, error } = useFetch("/absences");
  const [selectedClass, setSelectedClass] = useState("");

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-2 h-96 w-full">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-5 w-32 mb-5" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-5 w-32 mb-5 ms-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 flex justify-center items-center">
        <p className="text-red-500 text-[15px] text-center">Cannot get attendance data. Please try again later.</p>
      </div>
    );
  }

  const classes = Array.from(new Set(data.map(item => item.class_name)));


  const filteredData = selectedClass
    ? data.filter(record => record.class_name === selectedClass)
    : data;

  const AbsenceCount = (type, day) => {
    return filteredData.reduce((total, record) => {
      const dayName = new Date(record.date).toLocaleString('en-US', { weekday: 'short' });
      if (dayName === day) {
        const count = record.students.filter(s => s.status === type).length;
        return total + count;
      }
      return total;
    }, 0);
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const AbsencData = weekDays.map(day => ({
    name: day,
    present: AbsenceCount("P", day),
    absent: AbsenceCount("A", day)
  }));

  return (
    <div className="bg-white rounded-lg p-2 h-96 w-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg ">Attendance</h1>
        <Select onValueChange={setSelectedClass}>
          <SelectTrigger className="w-fit  shadow-none ">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((className, index) => (
              <SelectItem key={index} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={AbsencData} barSize={15}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
          <Legend align="right" verticalAlign="top" wrapperStyle={{ paddingBottom: "40px" }} />
          <Bar dataKey="present" fill="#C8E6F1" legendType="circle" radius={[10, 10, 0, 0]} />
          <Bar dataKey="absent" fill="#D8CAF1" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
