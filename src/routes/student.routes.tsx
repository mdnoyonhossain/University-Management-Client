import MyProfile from "../pages/MyProfile";
import MySchedule from "../pages/student/MySchedule/MySchedule";
import MyScheduleDetails from "../pages/student/MySchedule/MyScheduleDetails";
import StudentOfferedCourse from "../pages/student/OfferedCourseManagement/StudentOfferedCourse";
import StudentOfferedCourseDetails from "../pages/student/OfferedCourseManagement/StudentOfferedCourseDetails";
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
    {
        path: 'offered-course-details-data/:offeredCourseId',
        element: <StudentOfferedCourseDetails />,
    },
    {
        name: 'My Schedule',
        path: 'my-schedule',
        element: <MySchedule />,
    },
    {
        path: 'my-schedule-details-data/:enrolledId',
        element: <MyScheduleDetails />,
    },
    {
        path: 'my-profile',
        element: <MyProfile />,
    },
];