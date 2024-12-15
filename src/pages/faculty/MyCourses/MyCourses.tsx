import { useGetAllFacultyCoursesQuery } from "../../../redux/features/faculty/facultyCourseManagementApi";

const MyCourses = () => {
    const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
    console.log(facultyCoursesData);

    return (
        <div>
            my courses
        </div>
    );
};

export default MyCourses;