import { Table, Tag, Divider, Space, Button } from "antd";
import { useGetMyEnrolledCourseQuery } from "../../../redux/features/student/studentCourseManagementApi";
import { InfoCircleOutlined } from '@ant-design/icons';
import Loading from "../../Loading";

const MySchedule = () => {
    const { data: myEnrolledCourse, isLoading } = useGetMyEnrolledCourseQuery(undefined);

    const columns = [
        {
            title: "Course Title",
            dataIndex: "courseTitle",
            key: "courseTitle",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Section",
            dataIndex: "section",
            key: "section",
        },
        {
            title: "Semester",
            dataIndex: "semester",
            key: "semester",
            render: (semester: string) => <Tag color="green">{semester}</Tag>,
        },
        {
            title: "Faculty",
            dataIndex: "faculty",
            key: "faculty",
            render: (faculty: string) => <span>{faculty}</span>,
        },
        {
            title: "Enrollment Status",
            dataIndex: "enrollmentStatus",
            key: "enrollmentStatus",
            render: (status: boolean) => (
                <Tag color={status ? "green" : "red"}>{status ? "Enrolled" : "Not Enrolled"}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => {
                return (
                    <Space size="small">
                        <Button
                            icon={<InfoCircleOutlined />}
                            type="default"
                            size="small"
                            style={{ backgroundColor: "#52c41a", color: "#fff", borderColor: "#52c41a" }}
                        >
                            Details
                        </Button>
                    </Space>
                );
            },
            width: "1%",
        }
    ];

    if (isLoading) {
        return <Loading />
    }

    const data = myEnrolledCourse?.data?.map((item: any) => ({
        key: item._id,
        courseTitle: item.course.title,
        section: item.offeredCourse.section,
        semester: `${item.academicSemester.name} ${item.academicSemester.year}`,
        faculty: item.faculty.fullName,
        enrollmentStatus: item.isEnrolled,
    })) || [];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                rowKey="key"
                style={{ marginTop: "20px" }}
            />
            <Divider />
        </div>
    );
};

export default MySchedule;
