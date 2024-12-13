import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { facultyPaths } from "./faculty.routes";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import { studentPaths } from "./student.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AdminDashboard />
            }
        ]
    },
    {
        path: "/admin",
        element: <ProtectedRoutes role="admin">
            <App />
        </ProtectedRoutes>,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AdminDashboard />
            },
            ...routeGenerator(adminPaths)
        ]
    },
    {
        path: "/superAdmin",
        element: <ProtectedRoutes role="superAdmin">
            <App />
        </ProtectedRoutes>,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AdminDashboard />
            },
            ...routeGenerator(adminPaths)
        ]
    },
    {
        path: "/faculty",
        element: <ProtectedRoutes role="faculty">
            <App />
        </ProtectedRoutes>,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <FacultyDashboard />
            },
            ...routeGenerator(facultyPaths)
        ]
    },
    {
        path: "/student",
        element: <ProtectedRoutes role="student">
            <App />
        </ProtectedRoutes>,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <StudentDashboard />
            },
            ...routeGenerator(studentPaths)
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/change-password",
        element: <ProtectedRoutes role={undefined}>
            <ChangePassword />
        </ProtectedRoutes>
    },
]);

export default router;