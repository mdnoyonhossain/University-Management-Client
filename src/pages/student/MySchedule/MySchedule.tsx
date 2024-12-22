// import { Table, Tag, Divider, Space, Button, Row, Col, Pagination } from "antd";
// import { useGetMyEnrolledCourseQuery } from "../../../redux/features/student/studentCourseManagementApi";
// import { ArrowLeftOutlined, ArrowRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
// import Loading from "../../Loading";
// import { useState } from "react";
// import { TQueryParam } from "../../../types";
// import { Link } from "react-router-dom";

// const MySchedule = () => {
//     const [params, setParams] = useState<TQueryParam[]>([]);
//     const [page, setPage] = useState(1);

//     const { data: myEnrolledCourse, isLoading } = useGetMyEnrolledCourseQuery([
//         { name: "page", value: page },
//         { name: "sort", value: "id" },
//         { name: "limit", value: 6 },
//         ...params
//     ]);

// const columns = [
//     {
//         title: "Course Name",
//         dataIndex: "courseTitle",
//         key: "courseTitle",
//         render: (text: string) => <strong>{text}</strong>,
//     },
//     {
//         title: "Section",
//         dataIndex: "section",
//         key: "section",
//     },
//     {
//         title: "Semester",
//         dataIndex: "semester",
//         key: "semester",
//         render: (semester: string) => <Tag color="green">{semester}</Tag>,
//     },
//     {
//         title: "Faculty",
//         dataIndex: "faculty",
//         key: "faculty",
//         render: (faculty: string) => <span>{faculty}</span>,
//     },
//     {
//         title: "Enrollment Status",
//         dataIndex: "enrollmentStatus",
//         key: "enrollmentStatus",
//         render: (status: boolean) => (
//             <Tag color={status ? "green" : "red"}>{status ? "Enrolled" : "Not Enrolled"}</Tag>
//         ),
//     },
//     {
//         title: "Course Status",
//         key: "isCompleted",
//         dataIndex: "isCompleted",
//         render: (text: any) => text ? <Tag color="green">COMPLETED</Tag> : <Tag color="red">INCOMPLETED</Tag>,
//     },
//     {
//         title: "Grade Points",
//         key: "gradePoints",
//         dataIndex: "gradePoints",
//         ellipsis: true,
//         render: (text: any) => <Tag color="blue">{text}</Tag>
//     },
//     {
//         title: "Actions",
//         key: "actions",
//         render: (item: any) => (
//             <Space size="small" wrap>
//                 <Link to={`/student/my-schedule-details-data/${item.key}`}>
//                     <Button
//                         icon={<InfoCircleOutlined />}
//                         type="default"
//                         size="small"
//                         style={{
//                             backgroundColor: "#52c41a",
//                             color: "#fff",
//                             borderColor: "#52c41a",
//                         }}
//                     >
//                         Details
//                     </Button>
//                 </Link>
//             </Space>
//         ),
//     },
// ];

//     if (isLoading) {
//         return <Loading />;
//     }

//     const data = myEnrolledCourse?.data?.map((item: any) => ({
//         key: item._id,
//         courseTitle: item.course.title,
//         section: item.offeredCourse.section,
//         semester: `${item.academicSemester.name} ${item.academicSemester.year}`,
//         faculty: item.faculty.fullName,
//         enrollmentStatus: item.isEnrolled,
//         isCompleted: item.isCompleted,
//         gradePoints: `${item.grade} - ${item.gradePoints}`,
//     })) || [];

//     const enrolledCourseMetaData = myEnrolledCourse?.meta;

//     return (
//         <Row justify="center">
//             <Col xs={24}>
//                 <Table
//                     columns={columns}
//                     dataSource={data}
//                     pagination={false}
//                     bordered
//                     rowKey="key"
//                     scroll={{ x: true }}
//                     style={{ width: "100%" }}
//                 />
//                 <Divider />
//             </Col>

//             {/* Custom Pagination */}
//             <div style={{ display: "flex", justifyContent: "center" }}>
//                 <Pagination
//                     current={page}
//                     pageSize={enrolledCourseMetaData?.limit}
//                     total={enrolledCourseMetaData?.total}
//                     onChange={(value, pageSize) => {
//                         setPage(value);
//                         setParams((prevParams) =>
//                             prevParams.map((param) =>
//                                 param.name === "limit" ? { ...param, value: pageSize } : param
//                             )
//                         );
//                     }}
//                     style={{
//                         backgroundColor: "#ffffff",
//                         padding: "10px 20px",
//                         borderRadius: "8px",
//                         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                         border: "1px solid #d9d9d9",
//                     }}
//                     itemRender={(_current, type, originalElement) => {
//                         if (type === "prev") {
//                             return (
//                                 <Button
//                                     type="primary"
//                                     style={{
//                                         backgroundColor: "#FF4D4F",
//                                         color: "#fff",
//                                         borderRadius: "4px",
//                                         padding: "0 8px",
//                                     }}
//                                 >
//                                     <ArrowLeftOutlined /> Previous
//                                 </Button>
//                             );
//                         }
//                         if (type === "next") {
//                             return (
//                                 <Button
//                                     type="primary"
//                                     style={{
//                                         backgroundColor: "#1677ff",
//                                         color: "#fff",
//                                         borderRadius: "4px",
//                                         padding: "0 8px",
//                                     }}
//                                 >
//                                     Next <ArrowRightOutlined />
//                                 </Button>
//                             );
//                         }
//                         return originalElement;
//                     }}
//                 />
//             </div>
//         </Row>
//     );
// };

// export default MySchedule;


import { Table, Tag, Divider, Space, Button, Row, Col, Pagination } from "antd";
import { useGetMyEnrolledCourseQuery } from "../../../redux/features/student/studentCourseManagementApi";
import { ArrowLeftOutlined, ArrowRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Loading from "../../Loading";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { Link } from "react-router-dom";
import moment from "moment";

const MySchedule = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: myEnrolledCourse, isLoading } = useGetMyEnrolledCourseQuery([
        { name: "page", value: page },
        { name: "sort", value: "id" },
        { name: "limit", value: 6 },
        ...params,
    ]);

    const columns = [
        {
            title: "Course Name",
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
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (time: string) => <Tag color="blue">{time}</Tag>,
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            render: (time: string) => <Tag color="purple">{time}</Tag>,
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
            title: "Course Status",
            key: "isCompleted",
            dataIndex: "isCompleted",
            render: (text: boolean) => (
                text ? <Tag color="green">COMPLETED</Tag> : <Tag color="red">INCOMPLETED</Tag>
            ),
        },
        {
            title: "Grade Points",
            key: "gradePoints",
            dataIndex: "gradePoints",
            ellipsis: true,
            render: (text: any) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (item: any) => (
                <Space size="small" wrap>
                    <Link to={`/student/my-schedule-details-data/${item.key}`}>
                        <Button
                            icon={<InfoCircleOutlined />}
                            type="default"
                            size="small"
                            style={{
                                backgroundColor: "#52c41a",
                                color: "#fff",
                                borderColor: "#52c41a",
                            }}
                        >
                            Details
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];

    if (isLoading) {
        return <Loading />;
    }

    const data = myEnrolledCourse?.data?.map((item: any) => ({
        key: item._id,
        courseTitle: item.course.title,
        section: item.offeredCourse.section,
        semester: `${item.academicSemester.name} ${item.academicSemester.year}`,
        faculty: item.faculty.name.fullName,
        startTime: moment(item.offeredCourse.startTime, "HH:mm").format("h:mm A"),
        endTime: moment(item.offeredCourse.endTime, "HH:mm").format("h:mm A"),
        enrollmentStatus: item.isEnrolled,
        isCompleted: item.isCompleted,
        gradePoints: `${item.grade} - ${item.gradePoints}`,
    })) || [];

    const enrolledCourseMetaData = myEnrolledCourse?.meta;

    return (
        <Row justify="center">
            <Col xs={24}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    rowKey="key"
                    scroll={{ x: true }}
                    style={{ width: "100%" }}
                />
                <Divider />
            </Col>

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                    current={page}
                    pageSize={enrolledCourseMetaData?.limit}
                    total={enrolledCourseMetaData?.total}
                    onChange={(value, pageSize) => {
                        setPage(value);
                        setParams((prevParams) =>
                            prevParams.map((param) =>
                                param.name === "limit" ? { ...param, value: pageSize } : param
                            )
                        );
                    }}
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #d9d9d9",
                    }}
                    itemRender={(_current, type, originalElement) => {
                        if (type === "prev") {
                            return (
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "#FF4D4F",
                                        color: "#fff",
                                        borderRadius: "4px",
                                        padding: "0 8px",
                                    }}
                                >
                                    <ArrowLeftOutlined /> Previous
                                </Button>
                            );
                        }
                        if (type === "next") {
                            return (
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "#1677ff",
                                        color: "#fff",
                                        borderRadius: "4px",
                                        padding: "0 8px",
                                    }}
                                >
                                    Next <ArrowRightOutlined />
                                </Button>
                            );
                        }
                        return originalElement;
                    }}
                />
            </div>
        </Row>
    );
};

export default MySchedule;
