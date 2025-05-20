import Announcements from "../../components/Announcements";
import BigCalendar from "../../components/BigCalender";

const ProfilePage = () => {
    return (
        <>
            {/* LEFT SIDE */}
            <div className="w-full  lg:w-4/6 space-y-4 ">
                <div className="flex">
                    {/* USER INFO CARD */}
                    <div className="bg-sky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <img
                                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt=""
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            </p>
                            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <img src="/blood.png" alt="" width={14} height={14} />
                                    <span>A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <img src="/date.png" alt="" width={14} height={14} />
                                    <span>January 2025</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <img src="/mail.png" alt="" width={14} height={14} />
                                    <span>user@gmail.com</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <img src="/phone.png" alt="" width={14} height={14} />
                                    <span>+1 234 567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SMALL CARDS */}
                    <div className="flex flex-col gap-4  w-full bg-amber-500">
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <img
                                src="/singleAttendance.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className=""></div>
                            <h1 className="text-xl font-semibold">90%</h1>
                            <span className="text-sm text-gray-400">Attendance</span>
                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
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
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
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
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
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
            <div className="w-full lg:w-2/6 flex flex-col md:flex-row  lg:flex-col space-y-4 md:space-y-0 md:gap-3">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <a className="p-3 rounded-md bg-lamaSkyLight" href="/">
                            Teacher&apos;s Classes
                        </a>
                        <a className="p-3 rounded-md bg-lamaPurpleLight" href="/">
                            Teacher&apos;s Students
                        </a>
                        <a className="p-3 rounded-md bg-lamaYellowLight" href="/">
                            Teacher&apos;s Lessons
                        </a>
                        <a className="p-3 rounded-md bg-pink-50" href="/">
                            Teacher&apos;s Exams
                        </a>
                        <a className="p-3 rounded-md bg-lamaSkyLight" href="/">
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
