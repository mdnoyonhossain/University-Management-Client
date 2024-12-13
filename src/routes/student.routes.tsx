import StudentOfferedCourse from "../pages/student/OfferedCourseManagement/StudentOfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <StudentDashboard />
    },
    {
        name: 'Offered Course',
        path: 'offered-course',
        element: <StudentOfferedCourse />,
    },
    // {
    //     name: 'My Schedule',
    //     path: 'schedule',
    //     element: <MySchedule />,
    // },
];