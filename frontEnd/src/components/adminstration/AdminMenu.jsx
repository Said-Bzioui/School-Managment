import { BookA, BookCheck, BookOpenCheck, BookOpenText, CalendarDays, CircleUser, ClipboardList, GraduationCap, House, LayoutGrid, LogOut, Megaphone, MessageCircleMore, Settings, UserRoundCheck, Users, UsersRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const AdminMenu = () => {
    const location = useLocation();
    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: <House />,
                    label: "Dashboard",
                    href: "/admin",
                },
                {
                    icon: <GraduationCap />,
                    label: "Formateurs",
                    href: "/admin/teachers",
                },
                {
                    icon: <Users />,
                    label: "Stagiaires",
                    href: "/admin/students",
                },
                {
                    icon: <UsersRound />,
                    label: "Parents",
                    href: "/admin/parents",
                },
                {
                    icon: <ClipboardList />,
                    label: "Modules",
                    href: "/admin/subjects",
                },
                {
                    icon: <LayoutGrid />,
                    label: "Groupes",
                    href: "/admin/classes",
                },
                {
                    icon: <BookOpenText />,
                    label: "Leçons",
                    href: "/admin/lessons",
                },
                {
                    icon: <BookCheck />,
                    label: "Examens",
                    href: "/admin/exams",
                },
                {
                    icon: <BookOpenCheck />,
                    label: "Devoirs",
                    href: "/admin/assignments",
                },
                {
                    icon: <BookA />,
                    label: "Résultats",
                    href: "/admin/results",
                },
                {
                    icon: <UserRoundCheck />,
                    label: "Présence",
                    href: "/admin/attendance",
                },
                {
                    icon: <CalendarDays />,
                    label: "Événements",
                    href: "/admin/events",
                },
                {
                    icon: <MessageCircleMore />,
                    label: "Messages",
                    href: "/admin/messages",
                },
                {
                    icon: <Megaphone />,
                    label: "Annonces",
                    href: "/admin/announcements",
                },
            ],
        },
        {
            title: "AUTRE",
            items: [
                {
                    icon: <CircleUser />,
                    label: "Profil",
                    href: "/admin/profile",
                },
                {
                    icon: <Settings />,
                    label: "Paramètres",
                    href: "/admin/settings",
                },
                {
                    icon: <LogOut />,
                    label: "Déconnexion",
                    href: "/logout",
                },
            ],
        },
    ];

    return (
        <>
            <div className="flex justify-center items-center w-full pt-2">
                <img src="/logo.png" alt="Logo" className="w-6" />
            </div>
            <div className="mt-5 px-2 md:px-4 text-sm ">
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
                                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-muted ${isActive ? "bg-primary hover:bg-primary text-white font-semibold" : ""
                                        }`}
                                >
                                    {/* <img src={item.icon} alt="" width={20} height={20} /> */}
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