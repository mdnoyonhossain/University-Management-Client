import { useGetMyEnrolledCourseQuery } from "../../../redux/features/student/studentCourseManagementApi";

const MySchedule = () => {
    const { data: myEnrolledCourse } = useGetMyEnrolledCourseQuery(undefined);
    console.log(myEnrolledCourse);

    return (
        <div>
            {myEnrolledCourse?.data?.map((item: any) => {
                return (
                    <div>
                        <div>{item.course.title}</div>
                        <div>{item.offeredCourse.section}</div>
                        <div>
                            {item.offeredCourse.days.map((item: any) => (
                                <span> {item}</span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MySchedule;