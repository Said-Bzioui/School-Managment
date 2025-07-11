// "use client";

// import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFetch } from "@/api/fetching";
import { Skeleton } from "./ui/skeleton";


const EventCalendar = () => {
  const [value, onChange] = useState(new Date());

  const { data, isLoading } = useFetch("/events");


  const formattedDate = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  const filteredEvents = data?.data.filter(event => event.date === formattedDate);




  return (
    <div className="md:w-1/2 lg:w-full bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} className={''}/>
      <div className="flex items-center justify-between">
        <h1 className="text-lg mb-3 ">Events</h1>
        <img src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {isLoading ? (
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-3 ">
            <div className="flex items-center justify-between ">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Skeleton className="h-4 w-[280px]" />
          </div>
          <div className="flex flex-col space-y-3 ">
            <div className="flex items-center justify-between ">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Skeleton className="h-4 w-[280px]" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEvents?.length > 0 ? (
            filteredEvents.map((evt) => (
              <div
                className="p-3 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-primary even:border-t-orange"
                key={evt.id}
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-gray-600">{evt.title}</h1>
                  <span className="text-gray-300 text-xs">{evt.date}</span>
                </div>
                <p className="mt-2 truncate  text-gray-400 text-sm">{evt.description}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between">
              <h1 className="font-light  text-primary text-md mx-auto">No events On this day</h1>
            </div>
          )}
        </div>
      )}
    </div >
  );
};

export default EventCalendar;
