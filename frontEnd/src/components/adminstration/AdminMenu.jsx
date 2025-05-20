import { Link, useLocation } from "react-router-dom";
import { role } from "../../lib/data.js";
import { School } from "lucide-react";

export const AdminMenu = () => {
    const location = useLocation();

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: "/home.png",
                    label: "Home",
                    href: "/admin",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/teacher.png",
                    label: "Teachers",
                    href: "/admin/teachers",
                    visible: ["admin", "teacher"],
                },
                {
                    icon: "/student.png",
                    label: "Students",
                    href: "/admin/students",
                    visible: ["admin", "teacher"],
                },
                {
                    icon: "/parent.png",
                    label: "Parents",
                    href: "/admin/parents",
                    visible: ["admin", "teacher"],
                },
                {
                    icon: "/subject.png",
                    label: "Subjects",
                    href: "/admin/subjects",
                    visible: ["admin"],
                },
                {
                    icon: "/class.png",
                    label: "Classes",
                    href: "/admin/classes",
                    visible: ["admin", "teacher"],
                },
                {
                    icon: "/lesson.png",
                    label: "Lessons",
                    href: "/admin/lessons",
                    visible: ["admin", "teacher"],
                },
                {
                    icon: "/exam.png",
                    label: "Exams",
                    href: "/admin/exams",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/assignment.png",
                    label: "Assignments",
                    href: "/admin/assignments",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/result.png",
                    label: "Results",
                    href: "/admin/results",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/attendance.png",
                    label: "Attendance",
                    href: "/admin/attendance",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/calendar.png",
                    label: "Events",
                    href: "/admin/events",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/message.png",
                    label: "Messages",
                    href: "/admin/messages",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/announcement.png",
                    label: "Announcements",
                    href: "/admin/announcements",
                    visible: ["admin", "teacher", "student", "parent"],
                },
            ],
        },
        {
            title: "OTHER",
            items: [
                {
                    icon: "/profile.png",
                    label: "Profile",
                    href: "/admin/profile",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/setting.png",
                    label: "Settings",
                    href: "/admin/settings",
                    visible: ["admin", "teacher", "student", "parent"],
                },
                {
                    icon: "/logout.png",
                    label: "Logout",
                    href: "/logout",
                    visible: ["admin", "teacher", "student", "parent"],
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
            <div className="mt-10 lg:ps-4 text-sm">
                {menuItems.map((i) => (
                    <div className="flex flex-col gap-2" key={i.title}>
                        <span className="hidden lg:block text-gray-400 font-light my-4">
                            {i.title}
                        </span>
                        {i.items.map((item) => {
                            if (role && item.visible.includes(role)) {
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
                            }
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}