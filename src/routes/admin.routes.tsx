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
                path: 'student-data/:studentId',
                element: <StudentDetails />,
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
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Admin Data',
                path: 'admin-data',
                element: <AdminData />,
            }
        ]
    },
];