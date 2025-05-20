// "use client";

// import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFetch } from "@/api/fetching";


const EventCalendar = () => {
  const [value, onChange] = useState(new Date());

  const { data, isLoading, error } = useFetch("/events");
  // if (isLoading) {
  //   return (

  //     <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 flex justify-center items-center">
  //       <div className=" animate-spin w-[20px] h-[20px] border-2 border-gray-100 border-t-blue-500 rounded-full"></div>
  //     </div>
  //   );
  // }
  if (error) {
    return (
      <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 flex justify-center items-center">
        <p className="text-red-500 text-[15px] text-center ">Cnnot get Teachers ! Please try again later.</p>
      </div>

    );
  }

  const formattedDate = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  const filteredEvents = data?.filter(event => event.date === formattedDate);




  return (
    <div className="md:w-1/2 lg:w-full bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <img src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {isLoading &&
        <div className="bg-white w-full  md:w-96 rounded-lg p-2 flex justify-center items-center">
          <div className=" animate-spin w-[20px] h-[20px] border-2 border-gray-100 border-t-blue-500 rounded-full"></div>
        </div>
      }
      <div className="flex flex-col gap-4">
        {filteredEvents?.length > 0 ? (filteredEvents.map((event) => (
          <div
            className="p-3 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky even:border-t-orange"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.date}</span>
            </div>
            <p className="mt-2 truncate  text-gray-400 text-sm">{event.description}</p>
          </div>
        ))) : (
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-red-600 mx-auto">No events On this day</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
