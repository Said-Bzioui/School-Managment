import { CalendarDays, Mail, Phone } from "lucide-react";
import Announcements from "../../components/Announcements";
import BigCalendar from "../../components/BigCalender";

const ProfilePage = () => {
    return (
        <>
            {/* LEFT SIDE */}
            <div className="w-full  lg:w-4/6 space-y-4 ">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* USER INFO CARD */}
                    <div className="bg-sky py-6 px-4  rounded-md ">
                        <div className="flex gap-4  mb-4">
                            <img
                                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                className="w-36 h-28 rounded-lg object-cover "
                            />
                            <div className=" ">
                                <h1 className="font-bold text-2xl text-gray-600 mb-1">Said bzioui</h1>
                                <p className="text-sm text-gray-500">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-around gap-2 md:flex-row flex-wrap  text-gray-500  ">
                            <span className=" flex gap-2 "><Mail />user@gmail.com</span>
                            <span className=" flex gap-2 "><Phone />+212767366906</span>
                            <span className=" flex gap-2 "> <CalendarDays />Nov 2002</span>
                        </div>



                    </div>
                    {/* SMALL CARDS */}
                    <div className="grid grid-cols-2 gap-4 ">
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 items-center ">
                            <img
                                src="/singleAttendance.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>

                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 items-center ">
                            <img
                                src="/singleBranch.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">2</h1>
                                <span className="text-sm text-gray-400">Branches</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 items-center ">
                            <img
                                src="/singleLesson.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 items-center ">
                            <img
                                src="/singleClass.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-400">Classes</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Teacher&apos;s Schedule</h1>
                    <BigCalendar />
                </div>

            </div>
            {/* RIGHT SIDE */}
            <div className="w-full lg:w-2/6 flex flex-col md:flex-row  lg:flex-col space-y-4 md:space-y-0 md:gap-2">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <a className="p-2 rounded-md bg-sky" href="/">
                            Teacher&apos;s Classes
                        </a>
                        <a className="p-2 rounded-md bg-purpl" href="/">
                            Teacher&apos;s Students
                        </a>
                        <a className="p-2 rounded-md bg-blue" href="/">
                            Teacher&apos;s Lessons
                        </a>
                        <a className="p-2 rounded-md bg-orange" href="/">
                            Teacher&apos;s Exams
                        </a>
                        <a className="p-2 rounded-md bg-sky" href="/">
                            Teacher&apos;s Assignments
                        </a>
                    </div>
                </div>
                <Announcements />
            </div>
        </>
    )
};

export default ProfilePage;
