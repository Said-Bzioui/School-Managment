import { Link, useLocation } from "react-router-dom";
import { School } from "lucide-react";

export const StudentMenu = () => {
    const location = useLocation();

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: "/home.png",
                    label: "Home",
                    href: "/student",

                },
                {
                    icon: "/subject.png",
                    label: "Subjects",
                    href: "/student/subjects",
                },
                {
                    icon: "/lesson.png",
                    label: "Lessons",
                    href: "/student/lessons",
                },
                {
                    icon: "/exam.png",
                    label: "Exams",
                    href: "/student/exams",

                },
                {
                    icon: "/assignment.png",
                    label: "Assignments",
                    href: "/student/assignments",

                },
                {
                    icon: "/result.png",
                    label: "Results",
                    href: "/student/results",

                },
                {
                    icon: "/attendance.png",
                    label: "Attendance",
                    href: "/student/attendance",

                },
                {
                    icon: "/calendar.png",
                    label: "Events",
                    href: "/student/events",

                },
                {
                    icon: "/message.png",
                    label: "Messages",
                    href: "/student/messages",

                },
                {
                    icon: "/announcement.png",
                    label: "Announcements",
                    href: "/student/announcements",

                },
            ],
        },
        {
            title: "OTHER",
            items: [
                {
                    icon: "/profile.png",
                    label: "Profile",
                    href: "/student/profile",

                },
                {
                    icon: "/setting.png",
                    label: "Settings",
                    href: "/student/settings",

                },
                {
                    icon: "/logout.png",
                    label: "Logout",
                    href: "/logout",

                },
            ],
        },
    ];

    return (
        <>
            <div className="flex justify-center items-center w-full pt-2">
                <School />
                <h1 className="text-gray-600 text-xl hidden lg:block font-semibold uppercase ">Said</h1>
            </div>
            <div className="my-10 lg:ps-4 text-sm">
                {menuItems.map((i) => (
                    <div className="flex flex-col gap-2" key={i.title}>
                        <span className="hidden lg:block text-gray-400 font-light my-4">
                            {i.title}
                        </span>
                        {i.items.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    to={item.href}
                                    key={item.label}
                                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gray-200 ${isActive ? "bg-sky font-semibold" : ""
                                        }`}
                                >
                                    <img src={item.icon} alt="" width={20} height={20} />
                                    <span className="hidden lg:block">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}