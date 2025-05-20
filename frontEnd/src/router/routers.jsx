import { createBrowserRouter } from "react-router-dom"
import { Dashboard } from "../pages/admin/dashboard"
import { AdminLayout } from "../pages/Layouts/AdminLayout"
import ProtectedRoute from "../components/ProtectedRoute"

import StudentsList from "../pages/list/StudentsList"
import TeachersList from "../pages/list/TeachersList"
import ParentsList from "../pages/list/ParentsList"
import SubjectsList from "../pages/list/SubjectsList"
import ClassesList from "../pages/list/ClassesList"
import LessonsList from "../pages/list/LessionList"
import ExamsList from "../pages/list/ExamsList"
import AssignmentsList from "../pages/list/AssignmentsList"
import ResultsList from "../pages/list/ResultsList"
import AttendanceList from "../pages/list/AttendanceList"
import EventsList from "../pages/list/EventsList"
import AnnouncementsList from "../pages/list/AnnouncementsList"
import ProfilePage from "../pages/admin/profile"
import LoginPage from "../pages/auth/loginPage"

import StudentDashboard from "@/pages/student/dashboard"
import TeachersDashboard from "@/pages/teachers/student/dashboard"
import ParentDashboard from "@/pages/teachers/parent/dashboard"
import UnauthorizedPage from "@/components/UnauthorizedPage"
import Logout from "@/pages/auth/logout"
import { StudentLayout } from "@/pages/Layouts/studentLayout"

export const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/logout", element: <Logout /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },

    {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { path: "/admin", element: <Dashboard /> },
                    { path: "/admin/students", element: <StudentsList /> },
                    { path: "/admin/teachers", element: <TeachersList /> },
                    { path: "/admin/parents", element: <ParentsList /> },
                    { path: "/admin/subjects", element: <SubjectsList /> },
                    { path: "/admin/classes", element: <ClassesList /> },
                    { path: "/admin/lessons", element: <LessonsList /> },
                    { path: "/admin/exams", element: <ExamsList /> },
                    { path: "/admin/assignments", element: <AssignmentsList /> },
                    { path: "/admin/results", element: <ResultsList /> },
                    { path: "/admin/attendance", element: <AttendanceList /> },
                    { path: "/admin/events", element: <EventsList /> },
                    { path: "/admin/announcements", element: <AnnouncementsList /> },
                    { path: "/admin/profile", element: <ProfilePage /> },
                ],
            },
        ],
    },

    {
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [
            {
                element: <StudentLayout />,
                children: [

                    { path: "/student", element: <StudentDashboard /> },
                    { path: "/student/subjects", element: <p> subjects Page</p> },
                    { path: "/student/lessons", element: <p> lessons Page</p> },
                    { path: "/student/exams", element: <p> exams Page</p> },
                    { path: "/student/assignments", element: <p> assignments Page</p> },
                    { path: "/student/results", element: <p> results Page</p> },
                    { path: "/student/attendance", element: <p> attendance Page</p> },
                    { path: "/student/events", element: <p> events Page</p> },
                    { path: "/student/messages", element: <p> messages Page</p> },
                    { path: "/student/announcements", element: <p> announcements Page</p> },
                    { path: "/student/profile", element: <p> profile Page</p> },
                    { path: "/student/settings", element: <p> settings   Page</p> },
                ],
            },

        ],
    },

    {
        element: <ProtectedRoute allowedRoles={["teacher"]} />,
        children: [
            {
                element: <AdminLayout />,
                children: [{ path: "/teacher", element: <TeachersDashboard /> }],
            },
        ],
    },

    {
        element: <ProtectedRoute allowedRoles={["parent"]} />,
        children: [
            {
                element: <AdminLayout />,
                children: [{ path: "/parent", element: <ParentDashboard /> }],
            },
        ],
    },
])
