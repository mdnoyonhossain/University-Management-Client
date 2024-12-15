import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses/MyCourses";
import MyStudents from "../pages/faculty/MyCourses/MyStudents";

export const facultyPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <FacultyDashboard />
    },
    {
        name: 'My Courses',
        path: 'my-courses',
        element: <MyCourses />
    },
    {
        path: 'my-courses/:registerSemesterId/:courseId',
        element: <MyStudents />
    },
];