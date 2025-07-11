import { BookA, BookCheck, BookOpenCheck, CircleUser, ClipboardList, House, LogOut, MessageCircleMore, Settings} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export const StudentMenu = () => {
    const location = useLocation();

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: <House />,
                    label: "Home",
                    href: "/student",

                },
                {
                    icon: <ClipboardList />,
                    label: "Subjects",
                    href: "/student/subjects",
                },
                {
                    icon: <BookCheck />,
                    label: "Exams",
                    href: "/student/exams",

                },
                {
                    icon: <BookOpenCheck />,
                    label: "Assignments",
                    href: "/student/assignments",

                },
                {
                    icon: <BookA />,
                    label: "Results",
                    href: "/student/results",

                },
                {
                    icon: <MessageCircleMore />,
                    label: "Messages",
                    href: "/student/messages",

                },
            ],
        },
        {
            title: "OTHER",
            items: [
                {
                    icon: <CircleUser />,
                    label: "Profile",
                    href: "/student/profile",

                },
                {
                    icon: <Settings />,
                    label: "Settings",
                    href: "/student/settings",

                },
                {
                    icon: <LogOut />,
                    label: "Logout",
                    href: "/logout",

                },
            ],
        },
    ];

    return (
        <>
            <div className="flex justify-center items-center w-full pt-2">
                <img src="/logo.png" alt="Logo" className="w-8 h-10" />
            </div>
            <div className="my-10 lg:px-4 text-sm">
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
                                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gray-200 ${isActive ? "bg-primary hover:bg-primary text-white font-semibold" : ""
                                        }`}
                                >
                                    {item.icon}
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