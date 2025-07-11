import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";

export default function StudentDashboard() {
    return (
        <>
            {/* LEFT SIDE */}
            <div className="w-full bg-white rounded-lg  lg:w-4/6 space-y-4 p-4 ">
            <h1 className="text-lg font-semibold">My Schedule</h1>
                <div className="h-[650px] w-full">
                    <BigCalendar className="" />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-2/6 flex flex-col md:flex-row  lg:flex-col space-y-4 md:space-y-0 md:gap-3">
                <EventCalendar />
                <Announcements />
            </div>
        </>
    )
}
