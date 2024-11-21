import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { facultyPaths } from "./faculty.routes";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import { studentPaths } from "./student.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";

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
        element: <App />,
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
        element: <App />,
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
        element: <App />,
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
        path: "/register",
        element: <Register />
    },
]);

export default router;