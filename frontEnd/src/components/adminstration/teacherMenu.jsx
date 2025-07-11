import { BookA, BookCheck, BookOpenCheck, CircleUser, ClipboardList, House, LogOut, MessageCircleMore, Settings} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export const TeacherMenu = () => {
    const location = useLocation();

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: <House />,
                    label: "Home",
                    href: "/teacher",

                },
                {
                    icon: <ClipboardList />,
                    label: "Subjects",
                    href: "/teacher/subjects",
                },
                {
                    icon: <BookCheck />,
                    label: "Exams",
                    href: "/teacher/exams",

                },
                {
                    icon: <BookOpenCheck />,
                    label: "Assignments",
                    href: "/teacher/assignments",

                },
                {
                    icon: <BookA />,
                    label: "Results",
                    href: "/teacher/results",

                },
                {
                    icon: <MessageCircleMore />,
                    label: "Messages",
                    href: "/teacher/messages",

                },
            ],
        },
        {
            title: "OTHER",
            items: [
                {
                    icon: <CircleUser />,
                    label: "Profile",
                    href: "/teacher/profile",

                },
                {
                    icon: <Settings />,
                    label: "Settings",
                    href: "/teacher/settings",

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