import AcademicDepartment from "../pages/admin/academicManagement/academicDepartmentManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/academicFacultyManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemesterManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/academicDepartmentManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFacultyManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/academicSemesterManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminData from "../pages/admin/userManagement/adminUser/AdminData";
import CreateAdmin from "../pages/admin/userManagement/adminUser/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/facultyUser/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/studentUser/CreateStudent";
import FacultyData from "../pages/admin/userManagement/facultyUser/FacultyData";
import StudentData from "../pages/admin/userManagement/studentUser/StudentData";
import StudentDetails from "../pages/admin/userManagement/studentUser/StudentDetails";
import FacultyDetails from "../pages/admin/userManagement/facultyUser/FacultyDetails";
import AdminDetails from "../pages/admin/userManagement/adminUser/AdminDetails";
import StudentUpdate from "../pages/admin/userManagement/studentUser/StudentUpdate";
import CreateSemesterRegistration from "../pages/admin/courseManagement/semesterRegistration/CreateSemesterRegistration";
import SemesterRegistration from "../pages/admin/courseManagement/semesterRegistration/SemesterRegistration";
import CreateCourse from "../pages/admin/courseManagement/course/CreateCourse";
import Courses from "../pages/admin/courseManagement/course/Courses";
import CreateOfferedCourses from "../pages/admin/courseManagement/offeredCourses/CreateOfferedCourses";
import OfferedCourses from "../pages/admin/courseManagement/offeredCourses/OfferedCourses";
import OfferedCourseDetails from "../pages/admin/courseManagement/offeredCourses/OfferedCourseDetails";

export const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: 'Academic Management',
        children: [
            {
                name: 'Create A. Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />,
            },
            {
                name: 'Academic Semester',
                path: 'academic-semester',
                element: <AcademicSemester />,
            },
            {
                name: 'Create A. Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />,
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty />,
            },
            {
                name: 'Create A. Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />,
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment />,
            },
        ]
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Student Data',
                path: 'student-data',
                element: <StudentData />,
            },
            {
                path: 'student-details-data/:studentId',
                element: <StudentDetails />,
            },
            {
                path: 'student-update-data/:studentId',
                element: <StudentUpdate />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },
            {
                name: 'Faculty Data',
                path: 'faculty-data',
                element: <FacultyData />,
            },
            {
                path: 'faculty-details-data/:facultyId',
                element: <FacultyDetails />,
            },
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Admin Data',
                path: 'admin-data',
                element: <AdminData />,
            },
            {
                path: 'admin-details-data/:adminId',
                element: <AdminDetails />,
            }
        ]
    },
    {
        name: 'Course Management',
        children: [
            {
                name: 'Semester Registration',
                path: 'semester-registration',
                element: <CreateSemesterRegistration />,
            },
            {
                name: 'Registered Semesters',
                path: 'registered-semesters',
                element: <SemesterRegistration />,
            },
            {
                name: 'Create Course',
                path: 'create-course',
                element: <CreateCourse />,
            },
            {
                name: 'Courses',
                path: 'courses',
                element: <Courses />,
            },
            {
                name: 'Create Offer Course',
                path: 'offer-course',
                element: <CreateOfferedCourses />,
            },
            {
                name: 'Offered Courses',
                path: 'offered-courses',
                element: <OfferedCourses />,
            },
            {
                path: 'offered-course-details-data/:offeredCourseId',
                element: <OfferedCourseDetails />,
            },
        ],
    },
];